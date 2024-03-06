import { Router } from "express";
import {
  getAccounts,
  addAccount,
  editAccount,
  deleteAccount,
} from "../controllers/accountController.js";
import {
  getUser,
  signIn,
  signUp,
  editUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  downloadBackup,
  downloadBackupDecrypted,
  uploadBackup,
} from "../controllers/backupController.js";
import { analyzePasswords } from "../controllers/securityController.js";
import { userSchema } from "../joi/userSchema.js";
import { addAccountSchema, editAccountSchema } from "../joi/accountSchema.js";
import validateJoi from "../middlewares/validateJoi.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.get("/me", verifyToken, getUser);
authRouter.put("/me", verifyToken, validateJoi(userSchema), editUser);
authRouter.delete("/me", verifyToken, deleteUser);

authRouter.post("/signup", validateJoi(userSchema), signUp);
authRouter.post("/signin", signIn);

authRouter.get("/me/accounts", verifyToken, getAccounts);
authRouter.post(
  "/me/accounts",
  verifyToken,
  validateJoi(addAccountSchema),
  addAccount,
);
authRouter.put(
  "/me/accounts/:accountId",
  verifyToken,
  validateJoi(editAccountSchema),
  editAccount,
);
authRouter.delete("/me/accounts/:accountId", verifyToken, deleteAccount);

authRouter.get("/me/backup", verifyToken, downloadBackup);
authRouter.get("/me/backup/decrypted", verifyToken, downloadBackupDecrypted);
authRouter.post("/me/backup", verifyToken, uploadBackup);

authRouter.get("/me/analyze-passwords", verifyToken, analyzePasswords);

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
