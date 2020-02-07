const passport = require('passport');


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
            res.redirect("/projects");
        });


    // Twitter Oauth Routes

    app.get(
        '/auth/twitter',
        passport.authenticate('twitter', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/twitter/callback', 
        passport.authenticate('twitter'),
        (req, res, next) => {
            res.redirect("/projects");
        });

    // Facebook Oauth Routes

    app.get(
        '/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/facebook/callback', 
        passport.authenticate('facebook'),
        (req, res, next) => {
            res.redirect("/projects");
        });


    // app.post('/login', 
    // passport.authenticate('local', { failureRedirect: '/login' }),
    // function(req, res) {
    //     res.redirect('/');
    // });


    app.get('/api/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', (req, res, next) => {
        res.send(req.user);
    });
};