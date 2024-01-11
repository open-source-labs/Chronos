// Custom Error class to reinforce error class structure

import { BadRequestError } from "./bad-request-error";

// abstract - cannot instantiate CustomError, only inherit from it (extend it)
export abstract class CustomError extends Error {
  // Tells all errors extending CustomError they must have a statusCode property
  abstract statusCode: number;


  constructor(message: string) {
    // Serves as the message for the Error class that CustomError is extending
    super(message);

    // Make sure properties we are setting end up on CustomError's prototype?
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Tell all inhereting custom-made errors to have a method formatErrors
  // formatErrors returns an object with a message property
  abstract formatError(): { message: string };
}
