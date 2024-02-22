import User from "../Modals/user.js";
import {
  comparedPassword,
  hashPassword,
  resMessages,
} from "../Helpers/helpers.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config(); // to access .env file

sgMail.setApiKey(process.env.SENDGRID_KEY);

export const signUp = async (req, res) => {
  console.log("signUp api hit", req.body);
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name) {
      return res
        .status(401)
        .json({ message: "User name missing", status: 0, data: {} });
    }
    if (!email) {
      return res
        .status(401)
        .json({ message: "Email missing", status: 0, data: {} });
    }
    if (!password) {
      return res
        .status(401)
        .json({ message: "Password missing", status: 0, data: {} });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(401)
        .json({ message: "Email already exists", status: 0, data: {} });
    }

    // Password hashing
    const hashedPass = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPass,
      }).save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("signUp users JWT token :", token);

      const { password, ...rest } = user._doc;

      return res.status(200).json({
        message: resMessages.success,
        status: 1,
        data: { token, user: rest },
      });
    } catch (err) {
      console.log("error occurred in signUp :", err);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: resMessages.serverError, status: 0 });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = res.body;

    const user = await User.findOne({ email }); //is user in DB

    if (!user) {
      return res
        .status(200)
        .json({ data: {}, message: resMessages.userNotFound, status: 0 });
    }

    const isMatched = await comparedPassword(password, user.password); //check password

    if (!isMatched) {
      return res
        .status(401)
        .json({ data: {}, message: resMessages.missMatchedPass, status: 0 });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    const resWithTok = { ...user, token };

    res
      .status(200)
      .json({ data: resWithTok, message: resMessages.success, status: 1 });
  } catch (err) {
    console.log("error occurred in signIn :", err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = res.body;

    const user = await User.findOne({ email });
    console.log("password forgotten user :", user);

    if (!user) {
      return res
        .status(402)
        .json({ data: {}, message: resMessages.userNotFound, status: 0 });
    }

    const resetCode = nanoid(5).toUpperCase(); //generating reset code
    user.resetCode = resetCode;
    user.save();

    //prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password reset code",
      html: "<html>Your password reset code is : {resetCode}  </html>",
    };

    try {
      const sendMail = await sgMail.send(emailData);
      console.log("email send response :", sendMail);

      res.status(200).json({
        data: { emilSent: true },
        message: resMessages.success,
        status: 1,
      });
    } catch (err) {
      console.log(
        "error occurred while email sending in forgotPassword :",
        err
      );

      res.status(500).json({
        data: {},
        message: resMessages.serverError,
        status: 0,
      });
    }
  } catch (err) {
    console.log("error occurred in forgotPassword :", err);
    res.status(500).json({
      data: {},
      message: resMessages.serverError,
      status: 0,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, resetCode, password } = res.body;

    const user = await User.findOne({ email, resetCode });
    LOG("resetting password user :", user);

    if (!user) {
      return res.status(401).json({
        data: {},
        message: resMessages.userNotFound,
        status: 0,
      });
    }

    if (password.length < 5) {
      return res
        .status(401)
        .json({ data: {}, message: resMessages.strongPassword, status: 0 });
    }

    const hashedPass = await hashPassword(password);

    user.password = hashedPass;
    user.resetCode = "";
    user.save();

    res
      .status(200)
      .json({ data: user, message: resMessages.success, status: 1 });
  } catch (err) {
    console.log("error occurred in resetPassword");

    res.status(500).json({
      data: {},
      message: resMessages.serverError,
      status: 0,
    });
  }
};

//testing purpose
export const logIn = async (req, res) => {
  console.log("request in login :", req);
  res.status(200).json({ data: req.body });
};
