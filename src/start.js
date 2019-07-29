require("@babel/register")({
  // presets: ["env"],
  // plugins: ["transform-runtime"] // 在这配置 和在 .babelrc 中是一样的
})

module.exports = require("./app.js")
