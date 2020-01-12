const { Pool } = require('pg');
const pool = new Pool({
    user: "wrbjpdharqyxhd",
    host: "ec2-174-129-230-117.compute-1.amazonaws.com",
    database: "d270l1rhb25h6j",
    password: "b01a204c7bde24017852a34abc07dea9373da48543012b2b1ed3f5ab6a3549a1",
    port: 5432,
    ssl: true
});

pool.connect()
    .then(() => console.log("Connected Successfully!"))
    .catch((e) => console.log());

module.exports = pool;