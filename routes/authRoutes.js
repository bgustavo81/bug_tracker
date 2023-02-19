const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/requireLogin");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { check, validationResult } = require("express-validator");

const User = require("../models/users");

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    let user;
    if (req.user.id) {
      user = await User.getUserById(req.user.id);
    } else {
      user = await User.getUserById(req.user.user_id);
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/auth
//@desc Authenticate user, retrieves token as well
//@access Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.getUserByEmail(email);
      //Does user exist?
      if (user.rows.length === 0) {
        return res.status(400).json({ errors: [{ message: "Invalid credentials" }] });
      }
      //Check plain text against encrypted password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid credentials" }] });
      }
      //Create payload
      const payload = {
        user: {
          id: user.rows[0].user_id
        }
      };
      //Expiration date extreme for testing purposes
      jwt.sign(
        payload,
        process.env.jwtsecret,
        {
          expiresIn: 36000000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            payload,
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
