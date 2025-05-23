import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../app/entity/User";
import Article from "../app/entity/Article";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host:process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Article],
  migrations: [],
  subscribers: [],
});
