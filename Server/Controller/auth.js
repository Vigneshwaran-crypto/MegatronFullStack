import User from "../Modals/user.js";
import {
  comparedPassword,
  getUserFromToken,
  hashPassword,
  resMessages,
  showServerError,
} from "../Helpers/helpers.js";
import { nanoid } from "nanoid";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import multer from "multer";
import path from "path";
import fs from "fs";
import post from "../Modals/post.js";
import postLikedList from "../Modals/postLikedList.js";
import mongoose from "mongoose";
import postComments from "../Modals/postComments.js";
import { assert } from "console";

dotenv.config(); // to access .env file

sgMail.setApiKey(process.env.SENDGRID_KEY);

export const signUp = async (req, res) => {
  console.log("signUp api hit", req.body);
  try {
    const { userName, email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(200)
        .json({ message: "Email already exists", status: 0, data: {} });
    }

    // Password hashing
    const hashedPass = await hashPassword(password);

    // "_id" - Auto generated Key

    try {
      const user = await new User({
        userName: email.split("@")[0], //we splitted email and added first name as userName
        email,
        password: hashedPass,
      }).save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // console.log("signUp users JWT token :", token);

      const { password, ...rest } = user._doc;

      return res.status(200).json({
        message: resMessages.success,
        status: 1,
        data: { token, user: rest },
      });
    } catch (err) {
      console.log("error occurred in signUp :", err);
      res
        .status(500)
        .json({ error: err, message: resMessages.serverError, status: 0 });
    }
  } catch (err) {
    showServerError(res);
  }
};

export const signIn = async (req, res) => {
  console.log("signIn api hit", req.body);
  try {
    const { email, password, userToken } = req.body;
    const user = await User.findOne({ email }); //is user in DB

    console.log("user from db in signIn :", user);

    if (userToken) {
      const user = await getUserFromToken(userToken);

      console.log("user retried from getUserFromToken func :", user);

      return res.status(200).json({
        data: user,
        token: userToken,
        message: resMessages.success,
        status: 1,
      });
    }

    if (!user) {
      return res
        .status(200)
        .json({ data: {}, message: resMessages.userNotFound, status: 0 });
    }

    const isMatched = await comparedPassword(password, user.password); //check password

    if (!isMatched) {
      return res
        .status(200)
        .json({ data: {}, message: resMessages.missMatchedPass, status: 0 });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    res.status(200).json({
      data: user,
      token,
      message: resMessages.success,
      status: 1,
    });
  } catch (err) {
    console.log("error occurred in signIn :", err);
    showServerError(res);
  }
};

export const editUserNameOrBio = async (req, res) => {
  console.log("editUserNameOrBio hit :", req.body);
  console.log("editUserNameOrBio :", req.headers);
  try {
    const { userName, bio } = req.body;

    const authToken = req.headers.authorization;
    console.log("user token editUserNameOrBio :", authToken);

    const userFromToken = decode(authToken, { json: true });

    console.log("userFromToken :", userFromToken);

    const user = await User.findOne({ _id: userFromToken._id });

    // changing user name in our already posted posts
    if (user.userName !== userName) {
      const myPosts = await post.find({ userId: user._id });
      if (myPosts.length !== 0) {
        myPosts.forEach(async (item) => {
          item.userName = userName;
          await item.save();
        });
      }
    }

    user.bio = bio;
    user.userName = userName;
    user.save();

    res
      .status(200)
      .json({ data: user, message: resMessages.success, status: 1 });

    console.log("user from decoded token values :", user);
  } catch (err) {
    showServerError(res);
  }
};

export const userImagesUpload = async (req, res) => {
  console.log("userImagesUpload hit :", req.body);
  console.log("userImagesUpload file :", req.file);

  try {
    const authToken = req.headers.authorization;

    const userFromToken = decode(authToken, { json: true });
    const user = await User.findOne({ _id: userFromToken._id });

    // uploading file in local
    const storage = multer.diskStorage({
      destination: "/Users/admin/Desktop/Vignesh/imageBank",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
      },
    });

    try {
      const upload = multer({ storage: storage }).single("fileData");

      const coverUpload = multer({ storage: storage }).single("coverData");

      //for profile image upload
      upload(req, res, async (err) => {
        console.log("profile Image upload req :", req.file);
        //Removing previous image
        if (Object.keys(req.file ? req.file : {}).length !== 0) {
          const prevImage = user.profileImage;
          if (prevImage !== "sampleProfile.jpg") {
            fs.rmSync("/Users/admin/Desktop/Vignesh/imageBank/" + prevImage, {
              force: true,
            });
          }

          // changing profileImage in our already posted posts
          if (user.profileImage !== req.file.filename) {
            const myPosts = await post.find({ userId: user._id });
            if (myPosts.length !== 0) {
              myPosts.forEach(async (item) => {
                item.userImage = req.file.filename;
                await item.save();
              });
            }
          }

          user.profileImage = req.file.filename;
          user.save();

          res
            .status(200)
            .json({ data: user, message: resMessages.success, status: 1 });
        }
      });

      coverUpload(req, res, async (err) => {
        console.log("cover image upload req:", req.file);

        if (Object.keys(req.file ? req.file : {}).length !== 0) {
          const prevCoverImage = user.coverImage;
          if (prevCoverImage !== "sampleCover.jpg") {
            fs.rmSync(
              "/Users/admin/Desktop/Vignesh/imageBank/" + prevCoverImage,
              { force: true }
            );
          }

          user.coverImage = req.file.filename;
          user.save();

          res
            .status(200)
            .json({ data: user, message: resMessages.success, status: 1 });
        }
      });
    } catch (err) {
      console.log("multer error :", err);
      showServerError(res);
    }
  } catch (err) {
    console.log("error in userImagesUpload :", err);
    showServerError(res);
  }
};

export const createPost = async (req, res) => {
  console.log("createPost api hit :", req.body);

  try {
    const authToken = req.headers.authorization;

    const userFromToken = decode(authToken, { json: true });
    const user = await User.findOne({ _id: userFromToken._id });

    console.log("createPost user :", user);

    // Upload file local using multer
    const storage = multer.diskStorage({
      destination: "/Users/admin/Desktop/Vignesh/imageBank",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
      },
    });

    try {
      const postHandler = multer({ storage: storage }).single("postData");

      postHandler(req, res, async () => {
        console.log("postHandler :", req.file);
        console.log("postHandler request :", req.body.bio);

        const newPost = await new post({
          caption: req.body.bio,
          userName: user.userName,
          userId: user._id,
          userImage: user.profileImage,
          image: req.file.filename,
        }).save();

        return res
          .status(200)
          .json({ data: newPost, message: resMessages.success, status: 1 });
      });
    } catch (err) {
      console.log("createPost multer catch :", err);
      showServerError(res);
    }
  } catch (err) {
    console.log("error in createPost :", err);
    showServerError(res);
  }
};

export const getAllUsers = async (req, res) => {
  console.log("getAllUsers hit :", req.body);

  try {
    const users = await User.find({});

    res
      .status(200)
      .json({ data: users, message: resMessages.success, status: 1 });
  } catch (err) {
    showServerError(res);
  }
};

export const getAllPosts = async (req, res) => {
  console.log("getAllPosts api hit :", req.body);
  try {
    const authToken = req.headers.authorization;

    const user = await getUserFromToken(authToken);

    // pos._id.toString()

    const posts = await post.find({});
    const likedList = await postLikedList.find({ userId: user._id.toString() });

    console.log("postLikedList your liked list getAllPosts :", likedList);

    const changedPosts = posts.map((pos) => {
      const isHas = likedList.find((lik) => lik.postId === pos._id.toString());
      if (isHas) {
        pos.youLiked = true;
      }
      return pos;
    });

    res.status(200).json({
      data: changedPosts.reverse(),
      message: resMessages.success,
      status: 1,
    });
  } catch (err) {
    console.log("getAllPosts api error :", err);
    showServerError(res);
  }
};

export const getUserPosts = async (req, res) => {
  console.log("getUserPosts api hit :", req.body);
  try {
    const authToken = req.headers.authorization;
    const user = await getUserFromToken(authToken);

    const usersPost = await post.find({ userId: user._id });

    console.log("getUserPosts usersPost :", usersPost);

    res.status(200).json({
      data: usersPost,
      message: resMessages.success,
      status: 1,
    });
  } catch (err) {
    showServerError(res);
  }
};

export const likePost = async (req, res) => {
  console.log("likePost api hit :", req.body);

  try {
    const authToken = req.headers.authorization;
    const user = await getUserFromToken(authToken);

    const { postId, reactionType } = req.body;

    const reactedPost = await post.find({ _id: postId });
    console.log("reacted post in likePost :", reactedPost);

    const isExistPost = await postLikedList.find(
      {
        postId: postId,
      },
      { userId: user._id }
    );

    // await postLikedList.

    console.log("isExistPost from db :", isExistPost);

    if (isExistPost.length !== 0) {
      await postLikedList
        .deleteOne({ _id: isExistPost[0]._id })
        .then((res) => {
          console.log("already liked deleted successfully");
        })
        .catch((err) => {
          console.log("already liked delete failed");
        });

      return res.status(200).json({
        data: { postId, reactionType: "0" },
        message: resMessages.success,
        status: 1,
      });
    }

    const likePost = await new postLikedList({
      postId: postId,
      userId: user._id,
      reactionType: reactionType,
      userImage: user.profileImage,
      userName: user.userName,
    }).save();

    console.log("user liked data after save:", likePost);

    res
      .status(200)
      .json({ data: req.body, message: resMessages.success, status: 1 });
  } catch (err) {
    console.log("likePost api error :", err);
    showServerError(res);
  }
};

export const commentPost = async (req, res) => {
  console.log("commentPost api hit :", req.body);
  try {
    const authToken = req.headers.authorization;
    const user = await getUserFromToken(authToken);

    const postCmt = await new postComments({
      userId: user._id,
      comment: req.body.comment,
      postId: req.body.postId,
      userImage: user.profileImage,
      userName: user.userName,
    }).save();

    res.status(200).json({
      data: postCmt,
      message: resMessages.success,
      status: 1,
    });
  } catch (err) {
    showServerError(res);
  }
};

export const getPostComments = async (req, res) => {
  console.log("getPostComments api hit :", req.body);
  try {
    const postComment = await postComments.find({ postId: req.body.postId });

    console.log("comment for this post :", postComment);

    res.status(200).json({
      data: postComment,
      message: resMessages.success,
      status: 1,
    });
  } catch (err) {
    showServerError(res);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = res.body;

    const user = await User.findOne({ email });
    console.log("password forgotten user :", user);

    if (!user) {
      return res
        .status(200)
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
        .status(200)
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
