const { DataSource } = require("typeorm")
const { User } = require("./entity/user")
const { Software } = require("./entity/software");
const { Request } = require("./entity/Request");
require("dotenv").config()

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Software, Request],
})

module.exports = { AppDataSource };