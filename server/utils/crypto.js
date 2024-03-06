import crypto from "crypto";
import ErrorResponse from "./ErrorResponse.js";

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_KEY;

if (Buffer.from(secret, "utf-8").length !== 32) {
  throw new Error(
    "Encryption key must be 32 bytes long. Please check the 'ENCRYPTION_KEY' environment variable.",
  );
}

export const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
    let encrypted = cipher.update(Buffer.from(text, "utf-8"));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
  } catch (error) {
    throw new ErrorResponse({
      message: "Fehler bei der Verschlüsselung der Daten.",
      statusCode: 500,
      errorType: "Internal Server Error",
      errorCode: "ENCRYPT_001",
    });
  }
};

export const decrypt = (text) => {
  try {
    const iv = Buffer.from(text.iv, "hex");
    const encryptedText = Buffer.from(text.encryptedData, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secret),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf-8");
  } catch (error) {
    throw new ErrorResponse({
      message: "Fehler bei der Entschlüsselung der Daten.",
      statusCode: 500,
      errorType: "Internal Server Error",
      errorCode: "DECRYPT_001",
    });
  }
};
