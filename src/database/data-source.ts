import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entity/User"
import Article from "../app/entity/Article"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Article],
    migrations: [],
    subscribers: [],
})
