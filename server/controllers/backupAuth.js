import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const downloadBackup = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return next(
      new ErrorResponse({
        message: "User nicht gefunden.",
        statusCode: 404,
        errorType: "Not Found",
        errorCode: "USER_001",
      })
    );
  }
  const backup = JSON.stringify(user);
  res.status(200).send(backup);
});

export const downloadBackupDecrypted = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return next(
      new ErrorResponse({
        message: "User nicht gefunden.",
        statusCode: 404,
        errorType: "Not Found",
        errorCode: "USER_002",
      })
    );
  }

  user.accounts = user.accounts.map((account) => {
    if (
      account.password &&
      account.password.iv &&
      account.password.encryptedData
    ) {
      try {
        account.password = decrypt(account.password);
      } catch (error) {
        return next(
          new ErrorResponse({
            message: `Fehler beim Entschlüsseln des Passworts für Account ${account.name}.`,
            statusCode: 500,
            errorType: "Internal Server Error",
            errorCode: "ENCRYPT_001",
          })
        );
      }
    }
    return account;
  });

  const backup = JSON.stringify(user);
  res.status(200).send(backup);
});

export const uploadBackup = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const parsedBody = JSON.parse(req.body.backup);
  const backupData = parsedBody.data;

  console.log(backupData);

  if (!backupData || typeof backupData !== "object" || !backupData.accounts) {
    return next(
      new ErrorResponse({
        message: "Backup-Daten haben ein ungültiges Format oder fehlen.",
        statusCode: 400,
        errorType: "Bad Request",
        errorCode: "BACKUP_005",
      })
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(
      new ErrorResponse({
        message: "User nicht gefunden.",
        statusCode: 404,
        errorType: "Not Found",
        errorCode: "USER_003",
      })
    );
  }

  user.username = backupData.username;
  user.email = backupData.email;
  user.accounts = backupData.accounts;

  try {
    await user.save();
    res.status(200).json({ message: "Backup erfolgreich hochgeladen." });
  } catch (error) {
    return next(
      new ErrorResponse({
        message: "Fehler beim Speichern des Backups.",
        statusCode: 500,
        errorType: "Internal Server Error",
        errorCode: "BACKUP_006",
      })
    );
  }
});
