module.exports = (req, res, next) => {
    if (!req.user.rows[0].user_id) {
        return res.status(401).send({error: 'You must log in!'});
    }
    next();
};