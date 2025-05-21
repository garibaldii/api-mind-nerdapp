import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { AppDataSource } from "./database/data-source"
import routers from './routes/routes';
import { errorHandler } from './middleware/ErrorHandler';

dotenv.config()

const app = express();
const port = process.env.PORT || 3334

app.use(cors());
app.use(express.json());
app.use(routers);
app.use(errorHandler)

AppDataSource.initialize().then(async () => {

    console.log("Database OK ✅")

    app.listen(port, () => {
        console.log(`Server started on port ${port} 🚪`)
    })

}).catch(error => console.log(error))
