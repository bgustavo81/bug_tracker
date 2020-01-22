const pool = require('../services/pool');

module.exports = class User {
    constructor(userId, firstName, lastName, email) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static getUser(userId) {
        return pool.query(
            'SELECT * FROM users where user_id = $1',
            [userId]
        )
    }

    static getUsers() {
        return pool.query(
            'SELECT * FROM users ORDER BY user_id DESC'
        )
    }

    createUser() {
        return pool.query(
            `INSERT INTO users (user_id, first_name, last_name, email)
                VALUES ($1, $2, $3, $4)`,
            [this.userId, this.firstName, this.lastName, this.email]
        )
    }

    static updateUser(firstName, lastName, email, userId) {
        return pool.query(
            `UPDATE users SET first_name = $1, last_name = $2, email = 3 WHERE user_id = $4`,
            [firstName, lastName, email, userId]
        )
    }

    static deleteUser(userId) {
        return pool.query(
            'DELETE FROM users WHERE user_id = $1',
            [userId]
        )
    }

    static addCreditsToUser(credits, userId) {
        return pool.query(
            `UPDATE users SET credits = $1 WHERE user_id = $2`, [credits, userId]
        )
    }
};