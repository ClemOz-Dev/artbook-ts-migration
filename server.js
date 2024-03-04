const dotenv = require('dotenv');
const app = require('./api/app');
dotenv.config();

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'test') {
	app.listen( PORT, () => console.log(`Listening on port: ${PORT}`))
}

