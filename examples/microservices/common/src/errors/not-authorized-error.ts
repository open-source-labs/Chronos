import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    // This message will be console logged in error handling middleware
    super(`Not Authorized`);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  // Formats the error message to send back to the client
  formatError() {
    return { message: `Not Authorized` };
  }
}
