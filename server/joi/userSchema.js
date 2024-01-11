import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.min": "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
    "string.max": "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
    "string.empty": "Der Benutzername muss angegeben werden",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
    .required()
    .messages({
      "string.email": "Die E-Mail muss mit .com, .de oder .net enden",
      "string.empty": "Die E-Mail muss angegeben werden",
    }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
    "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
    "string.empty": "Das Passwort muss angegeben werden",
  }),
});
