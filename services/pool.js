const keys = require('../config/keys');
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.pgUser,
    host: process.env.pgHost,
    database: process.env.pgDatabase,
    password: process.env.pgPassword,
    port: 5432,
    ssl: true
});

pool.connect()
    .then(() => console.log("Connected Successfully!"))
    .catch((e) => console.log());

module.exports = pool;