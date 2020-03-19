module.exports = (req, res, next) => {
    // param tells us whether a user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send({error: 'You must log in!'});
    }
    next();
};