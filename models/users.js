const pool = require('../services/pool');

module.exports = class User {
    constructor(userId, email, password, name) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    static getUserById(userId) {
        return pool.query(
            `SELECT * FROM bug_users WHERE user_id = $1 LIMIT 1`,
            [userId]
        );
    };

    static getUser(userId) {
        return pool.query(
            'SELECT * FROM bug_users where user_id = $1',
            [userId]
        )
    }

    static getUserByEmail(email) {
        return pool.query(
            'SELECT * FROM bug_users where email = $1',
            [email]
        )
    }

    static getUserById(user_id) {
        return pool.query(
            'SELECT * FROM bug_users where user_id = $1',
            [user_id]
        )
    }

    static getbug_Users() {
        return pool.query(
            'SELECT * FROM bug_users ORDER BY user_id DESC'
        )
    }

    createUser() {
        return pool.query(
            `INSERT INTO bug_users (user_id, email, password, name)
                VALUES ($1, $2, $3, $4)`,
            [this.userId, this.email, this.password, this.name]
        )
    }

    createLoginUser() {
        return pool.query(
            `INSERT INTO bug_users (user_id, first_name, last_name, email, password)
                VALUES ($1, $2, $3, $4, $5)`,
            [this.userId, this.email, this.password, this.name]
        )
    }

    static updateUser(name, email, userId) {
        return pool.query(
            `UPDATE bug_users SET name = $1 WHERE user_id = $2`,
            [name, userId]
        )
    }

    static deleteUser(userId) {
        return pool.query(
            'DELETE FROM bug_users WHERE user_id = $1',
            [userId]
        )
    }

    static addCreditsToUser(credits, userId) {
        return pool.query(
            `UPDATE bug_users SET credits = $1 WHERE user_id = $2`, [credits, userId]
        )
    }

    static removeCreditsFromUser(credits, userId) {
        return pool.query(
            `UPDATE bug_users SET credits = $1 WHERE user_id = $2`, [credits, userId]
        )
    }
};