export const generatePassword = (length, options = {}) => {
  const settings = {
    includeNumbers: options.includeNumbers !== false,
    includeLowercase: options.includeLowercase !== false,
    includeUppercase: options.includeUppercase !== false,
    includeSymbols: options.includeSymbols !== false,
  };

  const numbers = "0123456789";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let allChars = "";
  let password = "";

  if (settings.includeNumbers) allChars += numbers;
  if (settings.includeLowercase) allChars += lowerCaseLetters;
  if (settings.includeUppercase) allChars += upperCaseLetters;
  if (settings.includeSymbols) allChars += symbols;

  if (settings.includeNumbers)
    password += numbers.charAt(cryptoRandom(numbers.length));
  if (settings.includeLowercase)
    password += lowerCaseLetters.charAt(cryptoRandom(lowerCaseLetters.length));
  if (settings.includeUppercase)
    password += upperCaseLetters.charAt(cryptoRandom(upperCaseLetters.length));
  if (settings.includeSymbols)
    password += symbols.charAt(cryptoRandom(symbols.length));

  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(cryptoRandom(allChars.length));
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

const cryptoRandom = (length) => {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % length;
  } else {
    console.warn("Falling back to less-secure Math.random");
    return Math.floor(Math.random() * length);
  }
};
