module.exports = (req, res, next) => {
    if (req.user.rows[0].credits <= 0) {
        return res.status(403).send({error: 'You need more credits!'});
    }
    next();
};