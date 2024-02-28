const logger = require('../pkg/logger');

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
