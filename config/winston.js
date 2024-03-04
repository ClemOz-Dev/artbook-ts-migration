const winston = require('winston');
require('winston-mongodb');
const {MongoClient} = require("mongodb");

const username = 'artbook';
const password = 'artbook';
const dbName = 'artbook';
const host = 'localhost';
const port = 27017;

const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // new winston.transports.Console({ format: winston.format.simple(), level: 'error' })
    ],
});
const client = new MongoClient(url);
client.connect()
    .then(() => {
        const transportOptions = {
            db: client,
            collection: 'log'
        };
        logger.add(new winston.transports.MongoDB(transportOptions));
    })
    .catch(error => {
        logger.error('Erreur de connexion à la base de données MongoDB :', error);
    });

module.exports = logger;
