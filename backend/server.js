const express = require('express');
const cors = require('cors');

const logger = require('./pkg/logger');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const systemInfoRouter = require('./routes/systemInfoRouter');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
// Middleware
app.use(express.json());
app.use(requestLogger); // Request logger middleware

// Routes
app.use('/api/system-info', systemInfoRouter);

// Error handling middleware
app.use(errorHandler);

// Server listening
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
