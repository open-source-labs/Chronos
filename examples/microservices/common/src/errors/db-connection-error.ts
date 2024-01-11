import { CustomError } from './custom-error';

export class DbConnectionError extends CustomError {
  statusCode = 502;

  constructor() {
    super('Database connection error');

    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  formatError() {
    return { message: 'Database connection error' };
  }
}
