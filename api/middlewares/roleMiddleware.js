function isArtist(req, res, next) {
    if (req.user.roleId === 3) {
        next();
    } else {
        res.status(403).json({message: 'Accès exclusivement réservé aux artistes.'});
    }
}

function isGallerist(req, res, next) {
    if (req.user.roleId === 2) {
        next();
    } else {
        res.status(403).json({message: 'Accès exclusivement réservé aux galeristes.'});
    }
}

module.exports = {isArtist, isGallerist};



