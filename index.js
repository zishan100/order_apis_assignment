require('dotenv').config();
const logger = require('./app/utils/logger.utils');
const PORT = process.env.PORT || 8000;

const app = require('./app/server');

module.exports = app.listen(PORT, () => {
    logger.info('server is running on port %s & NODE_ENV %s %s %s', PORT, process.env.NODE_ENV,process.env.DB_USER,process.env.DB_PASSWORD);
});