const User = require('../models/user');

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const result = await User.getUser(userId);
        let status = res.status(200).json({
            message: `user ${userId} was retrieved`,
            user: result.rows
        });
        console.log(status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const result = await User.getUsers();
        let status = res.status(200).json({
            message: 'Fetched users sucessfully.',
            users: result.rows
        });
        console.log(status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.createUser = async (req, res, next) => {
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
        const result = await user.createUser();
        res.status(201).json({
            message: "created user",
            user: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const username = req.body.username;
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
        const result = await User.updateUser(firstName, lastName, email, username, userId);
        res.status(200).json({
            message: "Updated User!",
            user: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const result = User.deleteUser(userId)
            .then(user => {
                if (!user) {
                    const error = new Error('Could not delete User');
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({
                    message: "Deleted!",
                    user: result.rows
                });
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}