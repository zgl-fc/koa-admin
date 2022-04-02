const mysql = require('mysql2')

// const config = require('./config')

// const connections = mysql.createPool({
//   host: config.MYSQL_HOST,
//   port: config.MYSQL_PORT,
//   database: config.MYSQL_DATABASE,
//   user: config.MYSQL_USER,
//   password: config.MYSQL_PASSWORD
// })

const connections = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'koa-admin',
  user: 'root',
  password: '123456'
})

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('连接失败:', err)
    } else {
      console.log('数据库连接成功~')
    }
  })
})

module.exports = connections.promise()
