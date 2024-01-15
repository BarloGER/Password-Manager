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

        if (passwords.has(decryptedPassword)) {
          passwords.set(
            decryptedPassword,
            passwords.get(decryptedPassword) + 1
          );
        } else {
          passwords.set(decryptedPassword, 1);
        }
        passwords.forEach((count) => {
          if (count > 1) {
            duplicatePasswords += count;
          }
        });
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

  res.status(200).json({
    accountsTotal: user.accounts.length,
    securePasswords,
    insecurePasswords,
    duplicatePasswords,
  });
});
