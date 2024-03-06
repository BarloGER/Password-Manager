import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password -accounts");

  if (!user) {
    throw new ErrorResponse({
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_AUTH_001",
    });
  }
  res.status(200).json(user);
});

export const signIn = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const found = await User.findOne({ email }).select("+password");

  if (!found)
    throw new ErrorResponse({
      message: "Es ist kein User mit dieser E-Mail registriert.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_AUTH_002",
    });

  const match = await bcrypt.compare(password, found.password);

  if (!match)
    throw new ErrorResponse({
      message: "Falsches Passwort.",
      statusCode: 401,
      errorType: "Unauthorized",
      errorCode: "USER_AUTH_003",
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
      message: "E-Mail existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_AUTH_004",
    });

  if (foundUserByUsername)
    throw new ErrorResponse({
      message: "Benutzername existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_AUTH_005",
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

export const editUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { email, username, password } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorResponse({
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_AUTH_006",
    });
  }

  const foundUserByEmail = await User.findOne({ email });
  const foundUserByUsername = await User.findOne({ username });

  if (foundUserByEmail && String(foundUserByEmail._id) !== String(userId)) {
    throw new ErrorResponse({
      message: "E-Mail existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_AUTH_007",
    });
  }

  if (
    foundUserByUsername &&
    String(foundUserByUsername._id) !== String(userId)
  ) {
    throw new ErrorResponse({
      message: "Benutzername existiert bereits.",
      statusCode: 403,
      errorType: "Validation Error",
      errorCode: "USER_AUTH_008",
    });
  }

  if (password) {
    const hash = await bcrypt.hash(password, 5);
    user.password = hash;
  }
  if (email) user.email = email;
  if (username) user.username = username;

  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res
    .status(200)
    .json({ token, message: "Benutzer erfolgreich aktualisiert." });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorResponse({
      message: "User nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "USER_AUTH_009",
    });
  }

  await user.deleteOne();

  res.status(200).json({ message: "User erfolgreich gelöscht." });
});
