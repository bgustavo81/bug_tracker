const express = require("express");
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const User = require('../models/users');
const keys = require('../config/keys');
const stripe = require("stripe")(process.env.stripeSecretKey);


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
    const userId = req.user.user_id;
    let user = await User.getUserById(userId);
    let credits = user.rows[0].credits;
    credits += 5;
    try {
        await User.addCreditsToUser(credits, userId);
        user = await User.getUserById(userId);
        res.status(200).send(user.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

module.exports = router;