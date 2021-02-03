const { Pool } = require('pg')

const pool = new Pool({
  host: '35.225.234.240',
  user: 'postgres',
  password : '1234567890', 
  database : 'geekacademy', 
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('remove', client => {
    console.log("===============")
    //console.log(client)
    //console.log("===============")
})


module.exports = {pool}