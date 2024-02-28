const logger = require('../pkg/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
