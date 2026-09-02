const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 30000;

const host = process.env.HOST || '0.0.0.0';

const url = process.env.HOST_URL || '';

module.exports = {
    port,
    host,
    url
};