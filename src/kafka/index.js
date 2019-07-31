const kafka = require("kafka-node")
const Client = kafka.KafkaClient
const Offset = kafka.Offset
const Consumer = kafka.Consumer
const Producer = kafka.Producer
const KeyedMessage = kafka.KeyedMessage

const client = new Client({kafkaHost: "9092"})
const offset = new Offset(client)
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
const producer = new Producer(client)

producer.on("error", function(err) {
  console.log("producer err", err)
})

producer.on("ready", function() {
  console.log("producer ready")
})

consumer.on("message", function(message) {
  console.log("message", message)
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

module.exports = {
  consumer,
  producer,
  KeyedMessage
}

// function toKafka() {
//   const client = new Client({kafkaHost: "9092"})
//   const offset = new Offset(client)
//   console.log("连接kafka中")

//   const topics = [
//     {
//       topic: "test",
//       partition: 0,
//       offset: 0
//     }
//   ]

//   const options = {
//     //  自动提交配置   (false 不会提交偏移量，每次都从头开始读取)
//     autoCommit: true,
//     autoCommitIntervalMs: 5000,
//     //  如果设置为true，则consumer将从有效负载中的给定偏移量中获取消息
//     fromOffset: false
//   }

//   const consumer = new Consumer(client, topics, options)

//   consumer.on("message", function(message) {
//     console.log('message', message)
//   })

//   consumer.on("error", function(message) {
//     console.log("kafka错误", message)
//   })
//   consumer.on("offsetOutOfRange", function(topic) {
//     topic.maxNum = 2
//     offset.fetch([topic], function(err, offsets) {
//       const min = Math.min.apply(null, offsets[topic.topic][topic.partition])
//       consumer.setOffset(topic.topic, topic.partition, min)
//     })
//   })
//   console.log("连接kafka后")
// }

// toKafka()
