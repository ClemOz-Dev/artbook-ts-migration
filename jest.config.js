const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    setupFilesAfterEnv: ['./tests/setupTests.js'],
    openHandlesTimeout: 10000
};