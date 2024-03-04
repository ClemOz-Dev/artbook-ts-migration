import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import userRepository from '../repositories/userRepository';
import sendEmail from '../../utils/sendEmail';
import { Request, Response, NextFunction } from 'express';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER as string, // generated mailtrap user
        pass: process.env.EMAIL_PASSWORD as string, // generated mailtrap password
    },
});

interface User {
    id: string;
    email: string;
    password: string;
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: User | null = await userRepository.findByEmail(email);

        if (!user) {
            setTimeout(() => {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }, 1000);
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            setTimeout(() => {
                return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }, 1000);
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, { expiresIn: '7d' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error({ error: error.toString() });
        return res.status(500).json({ error: error.message });
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const existingUser = await userRepository.findByEmail(req.body.email);

        if (existingUser) {
            return res.status(409).json({ error: 'Cet e-mail est déjà pris.' });
        }

        req.body.password = await bcrypt.hash(req.body.password, 12);
        const newUser = await userRepository.create(req.body);

        const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY as string, { expiresIn: '7d' });

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logout = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Déconnexion réussie' });
};

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findByEmail(req.body.email);

    if (!user) {
        res.status(404).json({ error: 'Aucun utilisateur avec cet email' });
    }

    const resetToken = user.getResetPasswordToken(user.id);
    await user.save();
    const resetUrl = `http://127.0.0.1:5173/reset-password/?token=${resetToken}`;
    const message = `<p>You are receiving this email because you has requested the reset of a password. Please make PUT request to : <a href="\n\n ${resetUrl}">Ce lien</a></p>`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
        });
        res.status(200).json({ resetToken });
    } catch (error) {
        console.log(error);
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        return next(new Error('Erreur !!!'));
    }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const resetPasswordToken = req.params.token;
    const user = await userRepository.findByPasswordToken(resetPasswordToken);

    if (!user) {
        return next(new Error('There is no user with that email, 404'));
    }

    user.password = await bcrypt.hash(req.body.password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, data: 'Validate new password' });
};

export {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
};
