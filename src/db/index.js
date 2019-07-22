const mysql = require("mysql")

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "koa",
  prot: 3306,
  multipleStatements: true
}

const pool = mysql.creatPool(config)
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, value, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.end()
        })
      }
    })
  })
}
module.exports = {
  query
}
