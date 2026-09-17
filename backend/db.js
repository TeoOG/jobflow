const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  // user: 'postgres',
  // password: 'postt',
  user: 'jobflow_user',
  password: '1234',
  database: 'jobflow'
})

module.exports = pool