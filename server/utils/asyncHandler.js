const asyncHandler = (fn) => {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;

/**
 * Async Middleware Handler.
 *
 * This function is a higher-order function that takes an asynchronous middleware function
 * and returns a new middleware function. It's designed to work with Node.js and Express.js.
 *
 * The purpose of this wrapper is to automatically catch any errors that occur in the
 * asynchronous middleware and pass them to the next error handling middleware in the Express.js
 * stack. This eliminates the need to explicitly write try-catch blocks in each asynchronous
 * middleware function.
 *
 * @param {Function} fn - An asynchronous middleware function that takes Express.js `req`, `res`,
 *                        and `next` parameters. `fn` can perform any asynchronous operations
 *                        and must be a function that returns a promise.
 *
 * @returns {Function} A wrapped middleware function that automatically catches errors and
 *                     passes them to the next error handler using `next()`.
 *
 * Usage:
 *   const asyncMiddleware = asyncHandler(async (req, res, next) => {
 *      // Asynchronous operation
 *   });
 */
