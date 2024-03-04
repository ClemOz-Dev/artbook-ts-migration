const conn = require('../config/sequelizeConnect');
const {afterAll, beforeEach} = require('@jest/globals');

beforeEach(() => {
    require('./setupEnv')
});

afterAll(async () => {
    try {
        await conn.dbDisconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
