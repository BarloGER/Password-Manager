import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) {
    throw new ErrorResponse({
      message: "Bitte zuerst einloggen.",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "VERIFY_TOKEN_001",
    });
  }
  try {
    const { _id } = jwt.verify(authorization, process.env.SECRET_KEY);
    req.userId = _id;
    next();
  } catch (err) {
    throw new ErrorResponse({
      message: "Ungültiger Token",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "VERIFY_TOKEN_002",
    });
  }
});

export default verifyToken;

/**
 * JWT Token Verification Middleware.
 *
 * This middleware function is used to verify JSON Web Tokens (JWT) in Express.js applications.
 * It checks if the incoming request has a valid JWT in the `Authorization` header, and if so,
 * it decodes the token to extract the user's ID and attaches it to the `req` object.
 *
 * The middleware uses several packages:
 *  - `jsonwebtoken`: To verify and decode the JWT.
 *  - `asyncHandler`: A utility to handle asynchronous operations and errors in middleware.
 *  - `ErrorResponse`: A custom error response class to structure error messages.
 *
 * The `verifyToken` function performs the following steps:
 *  - Extracts the `authorization` token from the request headers.
 *  - If the `authorization` token is not present, it throws an `ErrorResponse` with a message
 *    indicating that the user needs to log in, along with a 401 Unauthorized status code.
 *  - Uses `jsonwebtoken` to verify the token against the secret key stored in `process.env.SECRET_KEY`.
 *  - If the token is valid, it extracts the user's ID (`_id`) from the token and attaches it to
 *    `req.userId` for use in subsequent middleware or route handlers.
 *  - If the token is invalid (e.g., expired, tampered with), it throws an `ErrorResponse` with a message
 *    indicating that the token is invalid, along with a 401 Unauthorized status code.
 *
 * This middleware is essential for protecting routes that require authentication and should be placed
 * before any route handlers that need to access authenticated user information.
 *
 * Usage:
 *   Routes protected by verifyToken middleware
 *
 *   authRouter.get("/me", verifyToken, getUser);
 */
