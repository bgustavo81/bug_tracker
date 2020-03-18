const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');


module.exports = app => {
    // Google Oauth Routes
    
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res, next) => {
            console.log(req.user)
            console.log(req.session)
            res.redirect("/projects");
    });

    // Facebook Oauth 
    
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook')
    );

    app.get(
        '/auth/facebook/callback', 
        passport.authenticate('facebook'),
        (req, res, next) => {
            console.log(req.user);
            console.log(req.session);
            res.redirect("/projects");
    });


    // Github Oauth Routes

    app.get(
        '/auth/github',
        passport.authenticate('github')
    );

    app.get(
        '/auth/github/callback', 
        passport.authenticate('github'),
        (req, res, next) => {
            res.redirect("/projects");
        });
    


    
    app.post('/auth/register', async (req, res, next) => {
            const password = await bcrypt.hash(req.body.password, 10);
            const userId = Math.floor(Math.random()*1000000000).toString();
            console.log({"user": userId});
            const firstName = req.body.first_name;
            const lastName = req.body.last_name;
            const email = req.body.email;
            const user = new User(userId, firstName, lastName, email, password);
            try {
                const result = await user.createLoginUser();
                res.status(201).json({
                    message: "created user",
                    user: result.rows
                })
            } catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
    });


    // app.post('/login',
    //     passport.authenticate('local'), 
    //     (req, res, next) => {
    //       console.log(req.session)
    //       res.redirect('/projects')
    //   });

    app.post('/login', async (req, res, next) => {
        passport.authenticate('local', await function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, function(err) {
            console.log(req.isAuthenticated());
            console.log(req.session)
            if (err) { return next(err); }
            return res.redirect('/login');
        });
        })(req, res, next);
    });

    app.get('/login', (req, res, next) => {
        console.log(req.session);
        res.send(req.user);
    })

    app.get('/api/logout', (req, res, next) => {
        console.log("logged out req.user")
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', async (req, res, next) => {
        // req.session.passport = {user:'410414277'};
        // console.log(req.sessionID);
        // console.log(req.user);
        res.send(req.user);
    });
};