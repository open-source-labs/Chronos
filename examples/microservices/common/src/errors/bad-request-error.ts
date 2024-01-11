import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    // This message will be console logged in error handling middleware
    super(`Bad request error: ${message}`);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // Formats the error message to send back to the client
  formatError() {
    return { message: this.message };
  }
}

// const err = new BadRequestError('Please provide valid inputs')
// err.formatError() -> to the client
// throw new NotFoundError()