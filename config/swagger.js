const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ArtbooK',
    version: '1.0.0',
    description:
      'Les requêtes disponibles',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
};

const options = {
  swaggerDefinition,
   apis: ['../api/routes/index.js', './api/routes/auth.js', './api/routes/galleries.js', './api/routes/users.js', './api/routes/artists.js', './api/routes/roles.js', './api/routes/exhibitions.js', './api/routes/artworks.js', './api/routes/categories.js'],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;