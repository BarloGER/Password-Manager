import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_KEY;

if (Buffer.from(secret).length !== 32) {
  throw new Error("Encryption key must be 32 bytes long");
}

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
  let encrypted = cipher.update(Buffer.from(text, "utf-8"));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decrypt = (text) => {
  const iv = Buffer.from(text.iv, "hex");
  const encryptedText = Buffer.from(text.encryptedData, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
};
