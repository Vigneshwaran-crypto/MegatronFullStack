import bcrypt from "bcrypt";

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

export const resMessages = {
  serverError: "Internal server error",
  unAuthorize: "unAuthorized user",
  reqError: "Request data error",
  success: "Success",
  userNotFound: "User not found",
  missMatchedPass: "Miss matched password",
  strongPassword: "Enter strong password",
};
