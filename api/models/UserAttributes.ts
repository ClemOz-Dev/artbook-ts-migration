interface UserAttributes {
    id: string;
    email: string;
    password: string;
    roleId: number;
    firstName: string;
    lastName: string;
    birthdate: string;
    nationality: string;
    description?: string;
    image?: string;
    resetPasswordToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

export {UserAttributes};
