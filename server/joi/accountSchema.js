import Joi from "joi";

export const addAccountSchema = Joi.object({
  account: Joi.object({
    _id: Joi.string().required().messages({
      "string.empty": "Account-ID darf nicht leer sein.",
      "any.required": "Account-ID ist erforderlich.",
    }),
    name: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Account-Name muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Account-Name darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Account-Name muss angegeben werden",
    }),
    username: Joi.string().allow("").alphanum().min(3).max(20).messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
    }),
    email: Joi.string()
      .allow("")
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
      .messages({
        "string.email": "Die E-Mail muss mit .com, .de oder .net enden",
      }),
    password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
      "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Das Passwort muss angegeben werden",
    }),
    created_at: Joi.date().iso().required().messages({
      "date.base": "Ungültiges Datum.",
      "any.required": "Aktualisierungsdatum ist erforderlich.",
    }),
    updated_at: Joi.date().iso().required().messages({
      "date.base": "Ungültiges Datum.",
      "any.required": "Aktualisierungsdatum ist erforderlich.",
    }),
  }).required(),
});

export const editAccountSchema = Joi.object({
  updatedAccount: Joi.object({
    _id: Joi.string().required().messages({
      "string.empty": "Account-ID darf nicht leer sein.",
      "any.required": "Account-ID ist erforderlich.",
    }),
    name: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.min":
        "Der Account-Name muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Account-Name darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Der Account-Name muss angegeben werden",
    }),
    username: Joi.string().alphanum().min(3).max(20).allow("").messages({
      "string.min":
        "Der Benutzername muss mindestens {#limit} Zeichen lang sein",
      "string.max":
        "Der Benutzername darf höchstens {#limit} Zeichen lang sein",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de", "net"] } })
      .allow("")
      .messages({
        "string.email": "Die E-Mail muss mit .com, .de oder .net enden",
      }),
    password: Joi.string().min(8).max(20).required().messages({
      "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
      "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
      "string.empty": "Das Passwort muss angegeben werden",
    }),
    created_at: Joi.date().iso().required().messages({
      "date.base": "Ungültiges Datum.",
      "any.required": "Erstellungsdatum ist erforderlich.",
    }),
    updated_at: Joi.date().iso().required().messages({
      "date.base": "Ungültiges Datum.",
      "any.required": "Aktualisierungsdatum ist erforderlich.",
    }),
  }).required(),
});
