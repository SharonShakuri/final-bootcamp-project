const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getMailTemplateWithLink, mail } = require("./mail");
const { getResetToken } = require("./encrypt");
const util = require("util");
const { promisePool } = require("../db/dbPool");

module.exports = {
  generateAccessToken: function (user) {
    return jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "10s",
      }
    );
  },
  generateRefreshToken: function (user) {
    return jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      console.log(email);
      console.log(password);


      const [rows] = await promisePool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      let user = rows[0];
      console.log(user)
      if (!user) {
        return res.status(401).json({ err: `email ${email} not found` });
      }

      let match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ err: "Invalid password" });
      }

      let accessToken = module.exports.generateAccessToken(user);
      let refreshToken = module.exports.generateRefreshToken(user);

      await promisePool.query(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [refreshToken, user.id]
      );

      res.status(200).json({
        userId: user.id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        auth: true,
        accessToken,
        refreshToken,
        msg: "Congratulations! You've logged in!",
      });
    } catch (err) {
      console.log(`Error: \n${err.message}`);
      res.status(500).json({ err: err.message });
    }
  },
  logout: async (req, res) => {
    const { refreshToken, id } = req.body;

    if (!refreshToken) {
      return res.json({ auth: false, message: `no token` });
    }

    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE refresh_token = ? AND id = ?",
      [refreshToken, id]
    );
    let user = rows[0];

    if (!user) {
      return res.json({ auth: false, message: `no token` });
    }

    await promisePool.query(
      "UPDATE users SET refresh_token = NULL WHERE id = ?",
      [id]
    );

    user = await promisePool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (!user[0][0]) {
      return res.status(404).json({ auth: false, message: "User not found" });
    }

    let newAccessToken = module.exports.generateAccessToken(user[0][0]);
    let newRefreshToken = module.exports.generateRefreshToken(user[0][0]);

    await promisePool.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      newRefreshToken,
      id,
    ]);

    res.status(200).json({
      auth: true,
      message: "Logged out and new tokens issued",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  },
  forgotPassword: async (req, res) => {
    let { email } = req.body;

    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    let user = rows[0];

    if (!user) {
      return res.status(400).json({ message: `Email ${email} does not exist` });
    }

    let resetToken = getResetToken();

    await promisePool.query(
      "UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?",
      [resetToken, new Date(Date.now() + 3600000), user.id]
    );

    let message = getMailTemplateWithLink(
      "We have received your request to reset your password. Please reset your password using the link below",
      `http://localhost:5173/login/reset-password?id=${user.id}&token=${resetToken}`,
      "Reset Password"
    );

    try {
      await mail(email, "Reset Password Link", message);
      res.json({
        message: "Reset password link email has been sent successfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  resetPassword: async (req, res) => {
    const { newpassword, resetToken, userId } = req.body;

    if (!resetToken || !userId || !newpassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const [rows] = await promisePool.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      let user = rows[0];

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.reset_token !== resetToken) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const currDateTime = new Date();
      if (currDateTime > user.reset_token_expires_at) {
        return res.status(401).json({ message: "The reset link has expired" });
      }

      const hashedPassword = await bcrypt.hash(newpassword, 10);

      await promisePool.query(
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires_at = NULL WHERE id = ?",
        [hashedPassword, userId]
      );

      res.json({ message: "The password was changed successfully" });
    } catch (err) {
      console.error(`Error: \n${err.message}`);
      res.status(500).json({ message: err.message });
    }
  },
  refresh: async (req, res) => {
    const { email, refreshToken } = req.body;

    if (!refreshToken) {
      console.log(`\n*** NO REFRESH TOKEN ***\n`);
      return res
        .status(401)
        .json({ auth: false, message: `You're not authenticated, no token` });
    }

    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE refresh_token = ? AND email = ?",
      [refreshToken, email]
    );
    let user = rows[0];

    if (!user) {
      console.log(`\n*** NO USER ***\n`);
      return res
        .status(401)
        .json({ auth: false, message: `Refresh token was not found` });
    }

    try {
      const jwtVerify = util.promisify(jwt.verify);
      const decodedUser = await jwtVerify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      let newAccessToken = module.exports.generateAccessToken(user);
      let newRefreshToken = module.exports.generateRefreshToken(user);

      await promisePool.query(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [newRefreshToken, user.id]
      );

      res.send({
        auth: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      console.error(err);
      console.log(`\n*** TOKEN NOT VERIFIED ***\n`);
      return res
        .status(403)
        .json({ auth: false, message: `Your session has been expired` });
    }
  },
  verify: (req, res, next) => {
    console.log(`REQUEST HEADER:\n`, req.headers);

    let authPart = req.headers.authorization || req.headers.Authorization;

    if (!authPart || !authPart.startsWith("Bearer "))
      return res
        .status(401)
        .json({ auth: false, msg: `You're not authorized` });

    let token = authPart.split(" ")[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({
          auth: false,
          msg: `The token has been expired`,
          err: err.message,
        });

      req.user = user;
      next();
    });
  },
};
