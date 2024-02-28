import bcrypt, { hash } from "bcrypt";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparedPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const showServerError = (res) => {
  return res.status(500).json({
    data: {},
    message: resMessages.serverError,
    status: 0,
  });
};

export const resMessages = {
  serverError: "Internal server error",
  unAuthorize: "unAuthorized user",
  reqError: "Request data error",
  success: "Success",
  userNotFound: "User not found",
  missMatchedPass: "Mismatched password",
  strongPassword: "Enter strong password",
};
