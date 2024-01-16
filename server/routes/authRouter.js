import { Router } from "express";
import {
  getAccounts,
  addAccount,
  editAccount,
  deleteAccount,
} from "../controllers/accountAuth.js";
import {
  getUser,
  signIn,
  signUp,
  editUser,
  deleteUser,
} from "../controllers/userAuth.js";
import {
  downloadBackup,
  downloadBackupDecrypted,
  uploadBackup,
} from "../controllers/backupAuth.js";
import { analyzePasswords } from "../controllers/securityAuth.js";
import { userSchema } from "../joi/userSchema.js";
import validateJoi from "../middlewares/validateJoi.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.get("/me", verifyToken, getUser);
authRouter.put("/me", verifyToken, editUser);
authRouter.delete("/me", verifyToken, deleteUser);

authRouter.post("/signup", validateJoi(userSchema), signUp);
authRouter.post("/signin", signIn);

authRouter.get("/me/accounts", verifyToken, getAccounts);
authRouter.post("/me/accounts", verifyToken, addAccount);
authRouter.put("/me/accounts/:accountId", verifyToken, editAccount);
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
