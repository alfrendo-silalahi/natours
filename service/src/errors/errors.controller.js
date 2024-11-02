import log from '../utils/logger.js';

export default function globalErrorHandler(err, req, res, next) {
  log.error(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
