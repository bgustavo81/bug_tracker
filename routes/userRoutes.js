const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/requireLogin");
const User = require('../models/users')
const { check, validationResult } = require("express-validator");

//@route POST api/users
//@desc Create user
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // generate id
    const id = Math.floor(Math.random() * 100000000);

    try {
      let user = await User.getUserByEmail(email);
      //Does user exist?
      if (user.rows.length >= 1) {
        return res.status(400).send({ errors: [{ message: "User already exists" }] });
      }

      user = new User(
        id,
        email,
        password,
        name       
      );
        
      //salt password, default 10
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.createUser();

      //Create payload
      const payload = {
        user: {
          id: user.userId
        }
      };
      //Expiration date extreme for testing purposes
      jwt.sign(
        payload,
        process.env.jwtsecret,
        {
          expiresIn: 3600000000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
      //Check if user exits
      //Encrypt password
      //Return json webtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


// @route    GET api/users/:userId
// @desc     get the a user
// @access   Private
router.get('/:userId', auth, async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const result = await User.getUserById(userId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    GET api/users
// @desc     Get all the users
// @access   Private
router.get('/', auth, async (req, res, next) => {
    try {
        const result = await User.getUsers();
        res.status(200).json(result.rows);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    POST api/users
// @desc     Create new user
// @access   Private
router.post('/', auth, async (req, res, next) => {
    const userId = req.params.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = new User(userId, firstName, lastName, email);
    try {
        user.userId = userId;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.createUser();
        res.status(201).end();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    PATCH api/users/:userId
// @desc     Update user
// @access   Private
router.patch('/:userId', auth, async (req, res, next) => {
    const userId = req.params.userId;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    try {
        const user = await User.getUser(userId);
        if (!user) {
            const error = new Error('Could not find user');
            error.statusCode = 404;
            throw error;
        } 
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await User.updateUser(firstName, lastName, email, userId);
        const result = await User.getUserById(userId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    DELETE api/users/:userId
// @desc     Delete user
// @access   Private
router.delete('/users/:userId', auth, async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const result = User.deleteUser(userId)
            .then(user => {
                if (!user) {
                    const error = new Error('Could not delete User');
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json(userId);
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

module.exports = router;