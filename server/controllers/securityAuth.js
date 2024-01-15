import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { decrypt } from "../utils/crypto.js";
import { isPasswordSecure } from "../utils/securityCheck.js";

export const analyzePasswords = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("accounts");

  let securePasswords = 0;
  let insecurePasswords = 0;
  let duplicatePasswords = 0;

  const passwords = new Map();

  user.accounts.forEach((account) => {
    try {
      if (
        account.password &&
        account.password.iv &&
        account.password.encryptedData
      ) {
        const decryptedPassword = decrypt(account.password);
        account.password = decryptedPassword;

        if (isPasswordSecure(decryptedPassword)) {
          securePasswords++;
        } else {
          insecurePasswords++;
        }

        const currentCount = passwords.get(decryptedPassword) || 0;
        passwords.set(decryptedPassword, currentCount + 1);
      } else {
        throw new ErrorResponse({
          message: `Passwort für Account ${account.name} ist nicht verschlüsselt.`,
          statusCode: 500,
          errorType: "Internal Server Error",
          errorCode: "AUTH_006",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  passwords.forEach((count, password) => {
    if (count > 1) {
      duplicatePasswords += count - 1; // Nur die zusätzlichen Instanzen zählen
    }
  });

  res.status(200).json({
    accountsTotal: user.accounts.length,
    securePasswords,
    insecurePasswords,
    duplicatePasswords,
  });
});
