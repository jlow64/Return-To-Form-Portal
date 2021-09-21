const Pool = require("pg").Pool;
require('dotenv').config();

// Azure postgreSQL Database
const pool = new Pool({
    host: process.env.AZURE_HOST,
    database: process.env.AZURE_DBNAME,
    user: process.env.AZURE_USER,
    password: process.env.AZURE_PASSWORD,
    port: process.env.AZURE_PORT
})


// local postgreSQL Database
// const pool = new Pool({
//     user: "postgres",
//     password: process.env.DB_CONN,
//     host: "localhost",
//     port: "5432",
//     database: "physiopern"
// });

module.exports = pool;