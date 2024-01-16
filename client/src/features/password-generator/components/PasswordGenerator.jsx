import { useState } from "react";
import { PasswordGeneratorForm } from "./PasswordGeneratorForm";

export const generatePassword = (length = 10) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const handleGenerate = () => {
  const newPassword = generatePassword(passwordLength);
  setGeneratedPassword(newPassword);
};

export const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(10);
  const [generatedPassword, setGeneratedPassword] = useState("");

  return (
    <PasswordGeneratorForm
      handleGenerate={handleGenerate}
      generatedPassword={generatedPassword}
      passwordLength={passwordLength}
      setPasswordLength={setGeneratedPassword}
    />
  );
};
