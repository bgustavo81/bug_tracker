const express = require("express");
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const User = require('../models/users');
const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);


// @route    GET api/billing
// @desc     get credits
// @access   Private
router.post("/", auth, async (req, res, next) => {
    await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 bugs',
        source: req.body.id
    })
    const userId = req.user.rows[0].user_id;
    let credits = req.user.rows[0].credits;
    credits += 5;
    try {
        await User.addCreditsToUser(credits, userId);
        req.user.rows[0].credits += 5;
        user = req.user.rows
        res.status(200).send(user);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

module.exports = router;