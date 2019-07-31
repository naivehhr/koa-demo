const Sequelize = require("sequelize")
const {sequelize} = require("../db/sequelize")

const Model = Sequelize.Model

class Project extends Model {}
Project.init(
  {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  },
  {sequelize, modelName: "project"}
)

// Project.sync({force: false}).then(() => {
//   // 表已创建
//   return Project.create({
//     title: "John",
//     description: "Hancock"
//   })
// })

module.exports = Project
