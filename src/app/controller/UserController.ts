import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import { login, signUp } from '../service/AuthService';
import { getUserByIdService, putUser } from '../service/UserService';
import { authToken } from '../../middleware/Auth';
import { upload } from '../../middleware/upload';

const userRouter = Router();

userRouter.get("/", authToken, async (req: Request, res: Response) => {
    try {
        const users = await UserRepository.getUsers();
        res.status(200).json(users)
    } catch (error) {
        console.error(error)//
    }

})

userRouter.post("/signUp", async (req, res, next) => {

    try {
        const { email, password } = req.body
        const user = await signUp(email, password)
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

userRouter.put("/:id", upload.single("photo"),async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const { name } = req.body
        const photo = req.file?.buffer;

        const data = {name, photo}

        const user = await putUser(id, data)

        console.log(JSON.stringify(user.name))
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

userRouter.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id)

        const user = await getUserByIdService(id)

        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

export default userRouter;