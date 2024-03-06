import ErrorResponse from "../utils/ErrorResponse.js";

const validateJoi = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(
      new ErrorResponse({
        message: "Keine Daten zum Validieren vorhanden.",
        statusCode: 400,
        errorType: "Validation Error",
        errorCode: "VALIDATE_JOI_001",
      }),
    );
  }

  const context = {
    $isSignUp: req.path === "/signup",
  };

  const { error } = schema.validate(req.body, { context });
  return error
    ? next(
        new ErrorResponse({
          message: error.details[0].message,
          statusCode: 400,
          errorType: "Validation Error",
          errorCode: "VALIDATE_JOI_002",
        }),
      )
    : next();
};

export default validateJoi;

/**
 * Joi Validation Middleware.
 *
 * This middleware function is used for validating request bodies in Express.js applications
 * using Joi, a schema description language and data validator for JavaScript.
 *
 * The `validateJoi` function is a higher-order function that takes a Joi schema as its parameter.
 * It returns a middleware function that validates the request body (`req.body`) against the
 * provided schema.
 *
 * Parameters:
 *  - `schema`: A Joi schema object that defines the rules and structure for validation.
 *
 * The middleware performs the following steps:
 *  - Checks if the request body is empty. If it is, it creates a new `ErrorResponse` object
 *    with a message indicating that no data is available for validation and passes it to `next()`.
 *  - If the request body is not empty, it validates the request body against the provided Joi schema.
 *  - If validation fails (i.e., `error` is returned), it creates a new `ErrorResponse` object
 *    with the details of the validation error and passes it to `next()`.
 *  - If validation succeeds, it simply calls `next()` to pass control to the next middleware.
 *
 * The `ErrorResponse` object contains properties such as `message`, `statusCode`, `errorType`,
 * and `errorCode`, which help in sending a structured and meaningful error response to the client.
 *
 * Usage:
 *   authRouter.post("/signup", validateJoi(userSchema), signUp);
 *
 * Place this middleware before your route handlers to validate incoming request bodies.
 */
