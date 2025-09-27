export default class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResourceNotFoundError extends Error {
  constructor(resource, fieldName, fieldValue, statusCode = 404) {
    const message = `${resource} with ${fieldName} ${fieldValue} not found`;
    super(message);
    this.statusCode = statusCode;
    this.status = 'fail';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
