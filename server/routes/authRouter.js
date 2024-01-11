import { Router } from "express";
import { getUser, signIn, signUp } from "../controllers/auth.js";
import { userSchema } from "../joi/userSchema.js";
import validateJoi from "../middlewares/validateJoi.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.get("/me", verifyToken, getUser);

authRouter.post("/signup", validateJoi(userSchema), signUp);
authRouter.post("/signin", signIn);

export default authRouter;

/**
 * Authentication Router.
 *
 * This router handles all authentication-related routes in an Express.js application.
 * It utilizes middleware for validation and token verification to secure routes and ensure
 * that the data received is valid.
 *
 * The `verifyToken` middleware is used to protect routes that require authentication, such as
 * retrieving or modifying user-specific data. The `validateJoi` middleware ensures that user
 * input for routes like signup adheres to predefined schema requirements.
 */
