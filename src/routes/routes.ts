import { Router } from 'express';
import userRouter from '../app/controller/UserController';
import articleRouter from '../app/controller/ArticleController';

const routers = Router();

routers.use('/user', userRouter);
routers.use('/article', articleRouter)

export default routers;