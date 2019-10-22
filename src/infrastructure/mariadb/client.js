// using port 3307 to avoid conflict with local mysql installations

var knex = require('knex')({
  client: 'mysql',
  version: '5.6',
  acquireConnectionTimeout: 3000,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
  pool: {
    min: 1,
    max: 100,
    afterCreate: function (conn, cb) {
      conn.query("SET time_zone='America/Sao_Paulo';", function (err) {
        cb(err, conn)
      })
    }
  }
})

module.exports = knex
