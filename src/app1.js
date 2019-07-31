const Koa = require("koa")
const app = new Koa()
const router = require("koa-router")()
const kafka = require("kafka-node")
const Client = kafka.KafkaClient
const Offset = kafka.Offset
const Consumer = kafka.Consumer

const client = new Client({kafkaHost: "9092"})
const offset = new Offset(client)
client.on("error", function(err) {
  console.log("redis Error 123" + err)
})
console.log("连接kafka中")
const topics = [
  {
    topic: "test",
    partition: 0,
    offset: 0
  }
]

const options = {
  //  自动提交配置   (false 不会提交偏移量，每次都从头开始读取)
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  //  如果设置为true，则consumer将从有效负载中的给定偏移量中获取消息
  fromOffset: false
}

const consumer = new Consumer(client, topics, options)
const consumer1 = new Consumer(client, topics, options)

consumer1.on("message", function(message) {
  console.log("server 2--------1 message", message)
})

consumer.on("message", function(message) {
  console.log("server 2 message", message)
})



consumer.on("error", function(message) {
  console.log("kafka错误", message)
})

consumer.on("offsetOutOfRange", function(topic) {
  topic.maxNum = 2
  offset.fetch([topic], function(err, offsets) {
    const min = Math.min.apply(null, offsets[topic.topic][topic.partition])
    consumer.setOffset(topic.topic, topic.partition, min)
  })
})
console.log("server 2 连接kafka后")
app.on("error", err => {
  console.error("server error", err)
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(5009, () => {
  console.log("starting at port 5009")
})
