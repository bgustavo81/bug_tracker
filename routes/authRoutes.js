const express = require("express");
const router = express.Router();

const passport = require('passport');
// const User = require('../models/users');
// const bcrypt = require('bcrypt');


// Google Oauth Routes

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/google/callback', 
    passport.authenticate('google'),
    (req, res, next) => {
        res.redirect("/projects");
});

// Facebook Oauth 

router.get(
    '/facebook',
    passport.authenticate('facebook')
);

router.get(
    '/facebook/callback', 
    passport.authenticate('facebook'),
    (req, res, next) => {
        res.redirect("/projects");
});


// Github Oauth Routes

router.get(
    '/github',
    passport.authenticate('github')
);

router.get(
    '/github/callback', 
    passport.authenticate('github'),
    (req, res, next) => {
        res.redirect("/projects");
    });


// desctroy our session

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

// send our req.user

router.get('/current_user', async (req, res, next) => {
    res.send(req.user);
});

module.exports = router;

// local auth router 
// not in use at the moment

// router.post('/auth/register', async (req, res, next) => {
//         const password = await bcrypt.hash(req.body.password, 10);
//         const userId = Math.floor(Math.random()*1000000000).toString();
//         console.log({"user": userId});
//         const firstName = req.body.first_name;
//         const lastName = req.body.last_name;
//         const email = req.body.email;
//         const user = new User(userId, firstName, lastName, email, password);
//         try {
//             const result = await user.createLoginUser();
//             res.status(201).json({
//                 message: "created user",
//                 user: result.rows
//             })
//         } catch (err) {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         }
// });


// router.post('/login',
//     passport.authenticate('local'), 
//     (req, res, next) => {
//       console.log(req.session)
//       res.redirect('/projects')
//   });

// router.post('/login', async (req, res, next) => {
//     passport.authenticate('local', await function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.login(user, function(err) {
//         console.log(req.isAuthenticated());
//         console.log(req.session)
//         if (err) { return next(err); }
//         return res.redirect('/login');
//     });
//     })(req, res, next);
// });

// destroys session

