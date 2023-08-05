const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const createPasswordToHash = (password) => {
  return CryptoJS.HmacSHA256(
    password,
    CryptoJS.HmacSHA1(process.env.APP_PASSWORD_HASH, password).toString()
  ).toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(user, process.env.APP_TOKEN_HASH, { expiresIn: 60 * 60 });
};

module.exports = {
  createPasswordToHash,
  generateAccessToken,
};
