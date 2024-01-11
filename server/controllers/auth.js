import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password");
  res.status(200).json(user);
});

export const signIn = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;
  const found = await User.findOne({ email }).select("+password");
  if (!found)
    throw new ErrorResponse({
      message: `Es ist kein User mit dieser E-Mail registriert.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "AUTH_001",
    });
  const match = await bcrypt.compare(password, found.password);
  if (!match)
    throw new ErrorResponse({
      message: `Falsches Passwort`,
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "AUTH_002",
    });
  const token = jwt.sign({ _id: found._id }, process.env.SECRET_KEY);
  res.status(201).json({ token });
});

export const signUp = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password, username, ...rest },
  } = req;

  const foundUserByEmail = await User.findOne({ email });
  const foundUserByUsername = await User.findOne({ username });

  if (foundUserByEmail)
    throw new ErrorResponse({
      message: "E-Mail existiert bereits",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "AUTH_003",
    });

  if (foundUserByUsername)
    throw new ErrorResponse({
      message: "Benutzername existiert bereits",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "AUTH_004",
    });

  const hashPassword = await bcrypt.hash(password, 5);
  const { _id } = await User.create({
    ...rest,
    email,
    username,
    password: hashPassword,
  });
  const token = jwt.sign({ _id }, process.env.SECRET_KEY);
  res.status(201).json({ token });
});

export const getAccounts = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("accounts");
  user.accounts.forEach((account) => {
    try {
      if (
        account.password &&
        account.password.iv &&
        account.password.encryptedData
      ) {
        const decryptedPassword = decrypt(account.password);
        account.password = decryptedPassword;
      } else {
        throw new ErrorResponse({
          message: `Passwort für Account ${account.name} ist nicht verschlüsselt.`,
          statusCode: 500,
          errorType: "Internal Server Error",
          errorCode: "AUTH_006",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
  res.status(200).json(user);
});

export const addAccount = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { account } = req.body;

  const encryptedPassword = encrypt(account.password);
  account.password = encryptedPassword;

  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse({
      message: `User nicht gefunden.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "AUTH_007",
    });
  }

  user.accounts.push(account);
  await user.save();
  res.status(200).json({ message: "Account erfolgreich hinzugefügt.", user });
});

export const editAccount = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { accountId } = req.params;
  const { updatedAccount } = req.body;

  const encryptedPassword = encrypt(updatedAccount.password);
  updatedAccount.password = encryptedPassword;

  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse({
      message: `User nicht gefunden.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "AUTH_008",
    });
  }

  const accountIndex = user.accounts.findIndex(
    (acc) => acc._id.toString() === accountId
  );
  if (accountIndex === -1) {
    throw new ErrorResponse({
      message: `Account nicht gefunden.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "AUTH_009",
    });
  }

  user.accounts[accountIndex] = updatedAccount;
  await user.save();

  res.status(200).json({ message: "Account erfolgreich bearbeitet.", user });
});

export const deleteAccount = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { accountId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse({
      message: `User nicht gefunden.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "AUTH_010",
    });
  }

  user.accounts = user.accounts.filter(
    (acc) => acc._id.toString() !== accountId
  );
  await user.save();

  res.status(200).json({ message: "Account erfolgreich gelöscht.", user });
});
