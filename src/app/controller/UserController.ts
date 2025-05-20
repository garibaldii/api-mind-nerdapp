import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import { login, signUp } from '../../service/AuthService';

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await UserRepository.getUsers();
        res.status(200).json(users)
    } catch (error) {
        console.error(error)//
    }

})

userRouter.post("/signUp", async (req, res, next) => {

    try {
        const { name, email, password } = req.body
        const user = await signUp(name, email, password)
        res.status(201).json({ message: "Usuário cadastrado com sucesso", user })
    } catch (error: any) {
        next(error)
    }

})

userRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await login(email, password)
        res.status(201).send({ token })

    } catch (error) {
        next(error)
    }
})

export default userRouter;