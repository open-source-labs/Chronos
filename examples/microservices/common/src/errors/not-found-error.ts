import { CustomError } from './custom-error';

// Custom error for NotFound
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    // This message will be console logged in error handling middleware
    super('Not found error');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  // Formats the error message to send back to the client
  formatError() {
    return { message: 'Not found error' };
  }
}
