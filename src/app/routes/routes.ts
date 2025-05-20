import { Router } from 'express';
import userRouter from '../controller/UserController';

const routers = Router();

routers.use('/user', userRouter);
routers.use('/article', articleRouter)

export default routers;