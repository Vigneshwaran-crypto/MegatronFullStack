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
  console.log("signUp api hit");
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

//testing purpose
export const logIn = async (req, res) => {
  console.log("request in login :", req);
  res.status(200).json({ data: req.body });
};
