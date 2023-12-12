import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found error');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  formatError() {
    return { message: 'Not found error' };
  }
}
