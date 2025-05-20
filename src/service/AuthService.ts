import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { HttpError } from '../utils/HttpError';
import User from '../app/entity/User';
import UserRepository from '../app/repositories/UserRepository';

export const login = async (email: string, password: string) => {

    const user = await UserRepository.getUserByEmail(email)

    if (!user) {
        throw new HttpError(
            `Dados incorretos`,
            404
        )
    }

    const matchesPassword = await bcrypt.compare(password, user.password)

    if (!matchesPassword) {
        throw new HttpError(
            `Senha incorreta`,
            401
        )
    }

    console.log(process.env.JWT_SECRET_KEY)

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "5h" }
    )

    console.log(token)

    return token

}

export const signUp = async (name: string, email: string, password: string) => {

    if (await UserRepository.getUserByEmail(email)) {
        throw new HttpError(
            `Usuário já cadastrado`,
            400
        )
    }

    if (!name || !email || !password) {
        throw new HttpError(
            `Todos os campos são obrigatórios`,
            400
        )
    }
    console.log(password)

    const hash = await bcrypt.hash(password, 10)

    console.log(hash)

    const user = new User(name, email, hash)
    return await UserRepository.postUser(user)
}

