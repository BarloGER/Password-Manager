import { useState } from "react";
import { generatePassword } from "../utils/generatePassword";
import { PasswordGeneratorForm } from "./PasswordGeneratorForm";

export const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const handleGenerate = () => {
    const newPassword = generatePassword(passwordLength, {
      includeNumbers,
      includeLowercase,
      includeUppercase,
      includeSymbols,
    });
    setGeneratedPassword(newPassword);
  };

  return (
    <PasswordGeneratorForm
      handleGenerate={handleGenerate}
      generatedPassword={generatedPassword}
      passwordLength={passwordLength}
      setPasswordLength={setPasswordLength}
      includeNumbers={includeNumbers}
      setIncludeNumbers={setIncludeNumbers}
      includeLowercase={includeLowercase}
      setIncludeLowercase={setIncludeLowercase}
      includeUppercase={includeUppercase}
      setIncludeUppercase={setIncludeUppercase}
      includeSymbols={includeSymbols}
      setIncludeSymbols={setIncludeSymbols}
    />
  );
};
