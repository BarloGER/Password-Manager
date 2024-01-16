import { useState } from "react";
import { generatePassword } from "../utils/generatePassword";
import { PasswordGeneratorForm } from "./PasswordGeneratorForm";

export const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleGenerate = () => {
    const newPassword = generatePassword(passwordLength);
    setGeneratedPassword(newPassword);
  };

  return (
    <PasswordGeneratorForm
      handleGenerate={handleGenerate}
      generatedPassword={generatedPassword}
      passwordLength={passwordLength}
      setPasswordLength={setPasswordLength}
    />
  );
};
