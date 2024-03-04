const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');
const cors = require('cors');

const routes = require('./routes');
const corsOptions = require("../config/corsOptions");

const app = express();

app.use(cors(corsOptions))
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	.use(express.json())
	.use(routes)


module.exports = app;
