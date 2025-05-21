import { HttpError } from "../../utils/HttpError"
import UserRepository from "../repositories/UserRepository"

export const putUser = async (id: number, data: any) => {

    const user = await UserRepository.getUserById(id)

    if (!user) {
        throw new HttpError(
            `Usuário não existe`,
            404
        )
    }

    if (!data) {
        throw new HttpError(
            `Não existem dados novos a serem atualizados`,
            404
        )
    }

    return await UserRepository.putUser(user, data)
}

export const getUserByIdService = async (id: number) => {
    return await UserRepository.getUserById(id)
}