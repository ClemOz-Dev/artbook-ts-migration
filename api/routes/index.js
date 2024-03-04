const { Router } = require('express');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const galleriesRoutes = require('./galleries');
const artistsRoutes = require('./artists');
const artworksRoutes = require('./artworks');
const categoriesRoutes = require('./categories');
const exhibitionsRoutes = require('./exhibitions');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'));

router.use('/auth', authRoutes);

router.use('/api/users', usersRoutes);
router.use('/api/artists', artistsRoutes);
router.use('/api/galleries', galleriesRoutes);
router.use('/api/artworks', artworksRoutes);
router.use('/api/categories', categoriesRoutes);
router.use('/api/exhibitions', exhibitionsRoutes);

module.exports = router;
