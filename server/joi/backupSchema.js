import Joi from "joi";

const passwordSchema = Joi.object({
  iv: Joi.string().required().messages({
    "string.empty": "IV darf nicht leer sein.",
    "any.required": "IV ist erforderlich.",
  }),
  encryptedData: Joi.string().required().messages({
    "string.empty": "Verschlüsselte Daten dürfen nicht leer sein.",
    "any.required": "Verschlüsselte Daten sind erforderlich.",
  }),
});

const accountSchema = Joi.object({
  _id: Joi.string().required().messages({
    "string.empty": "Account-ID darf nicht leer sein.",
    "any.required": "Account-ID ist erforderlich.",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Account-Name darf nicht leer sein.",
    "any.required": "Account-Name ist erforderlich.",
  }),
  username: Joi.string().allow("").messages({
    "string.empty": "Benutzername darf leer sein.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Ungültiges E-Mail-Format.",
    "string.empty": "E-Mail darf nicht leer sein.",
    "any.required": "E-Mail ist erforderlich.",
  }),
  password: passwordSchema,
  created_at: Joi.date().iso().required().messages({
    "date.base": "Ungültiges Datum.",
    "any.required": "Aktualisierungsdatum ist erforderlich.",
  }),
  updated_at: Joi.date().iso().required().messages({
    "date.base": "Ungültiges Datum.",
    "any.required": "Aktualisierungsdatum ist erforderlich.",
  }),
});

export const backupSchema = Joi.object({
  _id: Joi.string().required().messages({
    "string.empty": "Backup-ID darf nicht leer sein.",
    "any.required": "Backup-ID ist erforderlich.",
  }),
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.min":
      "Der Benutzername muss mindestens {#limit} Zeichen lang sein.",
    "string.max": "Der Benutzername darf höchstens {#limit} Zeichen lang sein.",
    "string.empty": "Der Benutzername darf nicht leer sein.",
    "any.required": "Der Benutzername ist erforderlich.",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.email": "Ungültiges E-Mail-Format.",
    "string.empty": "E-Mail darf nicht leer sein.",
    "any.required": "E-Mail ist erforderlich.",
  }),
  accounts: Joi.array().items(accountSchema).min(1).required().messages({
    "array.min": "Mindestens ein Account muss vorhanden sein.",
    "array.includesRequiredUnknowns":
      "Accounts müssen den festgelegten Anforderungen entsprechen.",
    "any.required": "Accounts sind erforderlich.",
  }),
  __v: Joi.number().messages({
    "number.base": "Version muss eine Zahl sein.",
  }),
});
