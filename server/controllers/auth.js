import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

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
