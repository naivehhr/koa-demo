const Sequelize = require("sequelize")

const sequelize = new Sequelize("koa", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
})

User.sync({force: false}).then(() => {
  // 表已创建
  return User.create({
    firstName: "John",
    lastName: "Hancock"
  })
})

module.exports = {
  sequelize,
  User
}
