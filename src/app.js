import faker from "faker"
const Koa = require("koa")
const app = new Koa()
const router = require("koa-router")()
const mysql = require("mysql")
const redis = require("redis")
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "koa",
  prot: 3306,
  multipleStatements: true
}

const client = redis.createClient(6379, 'redis')
client.on("error", function(err) {
  console.log("redis Error " + err)
})
const User = {
  name: faker.name.findName(),
  email: faker.internet.email()
}

// console.log('User', User)
const pool = mysql.createPool(config)

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
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

router.get("/", function(ctx, next) {
  // client.set("foo_rand000000000000", "OK", redis.print)
  ctx.body = "Hello koa"
})

router.get("/setredis", (ctx, next) => {
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  // console.log("ctx_querystring", ctx_query)
  const {name, vaule} = ctx_query
  client.set(name, vaule, redis.print)
})

router.get("/redis", (ctx, next) => {
  let ctx_querystring = ctx.querystring
  // console.log("ctx_querystring", ctx_query)
  client.get(ctx_querystring, function(err, reply) {
    console.log("我取出来啦", reply.toString()) // Will print `OK`
  })
})

router.get("/news", (ctx, next) => {
  pool.getConnection(async (err, connection) => {
    let sql = `INSERT INTO koa.t_user(name,password) VALUES(?,?)`
    let values = ["huhaoran1", "123"]
    await query(sql, values)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log("eeeee", e)
      })
    // connection.query(sql, values, (error, rows) => {
    //   console.log("error", error)
    //   console.log("rows", rows)
    //   connection.end()
    // })
    // connection.query("SELECT * FROM t_user", (error, results, fields) => {
    //   console.log('error',error)
    //   console.log('results',results)
    //   console.log('fields',fields)
    //   // 结束会话
    //   connection.release()

    //   // 如果有错误就抛出
    //   if (error) throw error
    // })
  })
  ctx.body = "新闻page"
})

app.on("error", err => {
  log.error("server error", err)
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => {
  console.log("starting at port 3000")
})
