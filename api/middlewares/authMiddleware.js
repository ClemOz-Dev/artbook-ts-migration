const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const galleryRepository = require("../repositories/galleryRepository");
const artworkRepository = require("../repositories/artworkRepository");
const exhibitionRepository = require("../repositories/exhibitionRepository");

async function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Token non fourni. Authentification requise." });
  }

  const token = req.headers.authorization.split(" ")[1];
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token non fourni. Authentification requise." });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token JWT invalide." });
    }
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Token JWT invalide." });
    }

    const userId = decoded.userId;
    req.user = await userRepository.findById(userId);
    next();
  });
}

async function isOwner(req, res, next) {
  const originalUrl = req.originalUrl;
  let repository = null;

  switch (true) {
    case originalUrl.includes("/galleries/"):
      repository = galleryRepository;
      break;
    case originalUrl.includes("/exhibitions/"):
      repository = exhibitionRepository;
      break;
    case originalUrl.includes("/artworks/"):
      repository = artworkRepository;
      break;
    case originalUrl.includes("/users/"):
      repository = userRepository;
      break;
  }

  if (!repository) {
    return res.status(403).json({ message: "Instance non trouvée." });
  }

  try {
    const instance = await repository.findById(req.params.id);

    if (instance && instance.id === req.user.id ||  instance.userId === req.user.id ) {
      next();
    } else {
      return res.status(403).json({ message: "Accès non autorisé." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Une erreur est survenue : ${error.message}` });
  }
}

module.exports = { authMiddleware, isOwner };
