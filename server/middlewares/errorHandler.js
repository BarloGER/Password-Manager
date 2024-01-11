const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.message,
    errorType: err.errorType,
    errorCode: err.errorCode,
    // statusCode: err.statusCode,
  });
};

export default errorHandler;

/**
 * Global Error Handling Middleware.
 *
 * This middleware function is used for handling errors globally in an Express.js application.
 * It is designed to catch errors that occur in routes or other middleware functions and
 * send a structured HTTP response to the client.
 *
 * The `errorHandler` takes four parameters: `err`, `req`, `res`, and `next`. These are
 * standard parameters for middleware functions in Express.js:
 *  - `err`: The error object that was thrown or passed to `next()`.
 *  - `req`: The HTTP request object.
 *  - `res`: The HTTP response object.
 *  - `next`: A function to pass control to the next middleware.
 *
 * The middleware function checks the error object (`err`) and constructs a JSON response
 * with details about the error. It uses the following properties from the `err` object:
 *  - `message`: A descriptive message of the error.
 *  - `errorType`: The general type or category of the error.
 *  - `errorCode`: A specific code identifying the error.
 *  - `statusCode`: The HTTP status code associated with the error.
 *
 * If the `statusCode` is not provided in the error object, it defaults to `500`,
 * indicating an internal server error.
 *
 * The middleware then sends a JSON response with these error details and the appropriate
 * status code.
 *
 * Usage:
 *   app.use(errorHandler); // Place this after all other middleware and routes
 */
