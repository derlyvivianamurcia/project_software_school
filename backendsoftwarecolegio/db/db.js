const { Pool } = require('pg')
require('dotenv').config();
const pool = new Pool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('remove', client => {
  console.log("===============")
  //console.log(client)
  //console.log("===============")
})
console.log("Succesfull conection with db "+pool.options.database);

module.exports = { pool };