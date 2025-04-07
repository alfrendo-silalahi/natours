import winston, { Logger } from 'winston';

const log: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`, //TODO
    ),
  ),
  transports: [new winston.transports.Console()],
});

export default log;
