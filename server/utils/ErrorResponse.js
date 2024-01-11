class ErrorResponse extends Error {
  constructor({ message, statusCode, errorType, errorCode }) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}

export default ErrorResponse;

/**
 * Custom Error Response Class.
 *
 * This class extends the native JavaScript `Error` class to provide a more structured
 * error handling mechanism. It is particularly useful in Express.js applications for
 * managing HTTP error responses.
 *
 * The class constructor takes an object with four properties: `message`, `statusCode`,
 * `errorType`, and `errorCode`. These properties help to provide more context about the
 * error that occurred, making it easier to debug and handle errors appropriately.
 *
 * Properties:
 *  - `message` (String): A human-readable description of the error. It is passed to the
 *     base Error class and appears when the error is logged.
 *  - `statusCode` (Number): The HTTP status code associated with this error. Typically,
 *     this will be a 4xx or 5xx HTTP status code.
 *  - `errorType` (String): A brief, general categorization of the error, e.g., 'ValidationError',
 *     'DatabaseError', etc. This can be useful for handling different types of errors
 *     in different ways.
 *  - `errorCode` (String | Number): An application-specific error code that can be used
 *     for more fine-grained error handling or for displaying error messages to end-users.
 *
 * Usage:
 *   throw new ErrorResponse({
 *     message: 'Resource not found',
 *     statusCode: 404,
 *     errorType: 'NotFoundError',
 *     errorCode: 'RESOURCE_NOT_FOUND'
 *   });
 *
 * This class can be extended to create more specific error types if needed.
 */
