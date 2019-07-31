import faker from "faker"
const Koa = require("koa")
const app = new Koa()
const router = require("koa-router")()
const mysql = require("mysql")
const redis = require("redis")
const asyncRedis = require("async-redis")
const {promisify} = require("util")
const {sequelize, User} = require("./db/sequelize")
const Project = require("./model/Project")
const {producer, consumer, KeyedMessage} = require("./kafka")
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "koa",
  prot: 3306,
  multipleStatements: true
}

const client = redis.createClient()
const clientAsync = asyncRedis.createClient()
const getAsync = promisify(client.get).bind(client)
const getAsyncAll = promisify(client.hgetall).bind(client)
client.on("error", function(err) {
  console.log("redis Error 123" + err)
})
// const User = {
//   name: faker.name.findName(),
//   email: faker.internet.email()
// }

// const asyncBlock = async ctx_querystring => {
//   const value = await client.get(ctx_querystring)
//   console.log(value)
//   return value
// }

// // console.log('User', User)
// const pool = mysql.createPool(config)

// let query = (sql, values) => {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         reject(err)
//       } else {
//         connection.query(sql, values, (err, rows) => {
//           if (err) {
//             reject(err)
//           } else {
//             resolve(rows)
//           }
//           connection.end()
//         })
//       }
//     })
//   })
// }

// router.get("/", function(ctx, next) {
//   // client.set("foo_rand000000000000", "OK", redis.print)
//   ctx.body = "Hello koa"
// })

// router.get("/setredis", (ctx, next) => {
//   let ctx_query = ctx.query
//   let ctx_querystring = ctx.querystring
//   // console.log("ctx_querystring", ctx_query)
//   const {name, vaule} = ctx_query
//   client.set(name, vaule, redis.print)
//   // client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234")
//   const obj = {
//     what: "123",
//     age: 123,
//     qq: [1, 2, 3],
//     dd: {
//       lal: "lala"
//     }
//   }
//   // client.set("obj", JSON.stringify(obj))
//   client.hset("hash key", "hashtest 1", "some value", redis.print)
//   client.hset(["hash key", "hashtest 2", "some other value"], redis.print)
//   // clientAsync
//   // client.hkeys("hash key hashtest 2", function(err, replies) {
//   //   console.log(replies.length + " replies:")
//   //   replies.forEach(function(reply, i) {
//   //     console.log("    " + i + ": " + reply)
//   //   })
//   // })
// })

// router.get("/mysql", async (ctx, next) => {
//   // let ctx_querystring = ctx.querystring
//   // const res = await getAsync(ctx_querystring)
//   const res = await User.findAll()
//   const t = await Project.findAll()
//   ctx.body = t
// })

// router.get("/redis", async (ctx, next) => {
//   let ctx_querystring = ctx.querystring
//   const res = await getAsync(ctx_querystring)
//   ctx.body = res
// })

// router.get("/redisAll", async (ctx, next) => {
//   let ctx_querystring = ctx.querystring
//   const res = await getAsyncAll(ctx_querystring)
//   ctx.body = res
// })

// router.get("/asyncredis", async (ctx, next) => {
//   let ctx_querystring = ctx.querystring
//   const res = await getAsync(ctx_querystring)
//   ctx.body = res
// })

// router.get("/kafka", async (ctx, next) => {
//   const km = new KeyedMessage("key", "message")
//   producer.send(
//     [
//       // {topic: "test", messages: "hi", partition: 0},
//       {topic: "test", messages: ["hello", "world", km]}
//     ],
//     function(err, data) {
//       console.log("data", data)
//     }
//   )
//   ctx.body = 'res'
// })

// router.get("/news", (ctx, next) => {
//   pool.getConnection(async (err, connection) => {
//     let sql = `INSERT INTO koa.t_user(name,password) VALUES(?,?)`
//     let values = ["huhaoran1", "123"]
//     await query(sql, values)
//       .then(res => {
//         console.log(res)
//       })
//       .catch(e => {
//         console.log("eeeee", e)
//       })
//     // connection.query(sql, values, (error, rows) => {
//     //   console.log("error", error)
//     //   console.log("rows", rows)
//     //   connection.end()
//     // })
//     // connection.query("SELECT * FROM t_user", (error, results, fields) => {
//     //   console.log('error',error)
//     //   console.log('results',results)
//     //   console.log('fields',fields)
//     //   // 结束会话
//     //   connection.release()

//     //   // 如果有错误就抛出
//     //   if (error) throw error
//     // })
//   })
//   ctx.body = "新闻page"
// })

app.on("error", err => {
  console.error("server error", err)
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => {
  console.log("starting at port 3000")
})
