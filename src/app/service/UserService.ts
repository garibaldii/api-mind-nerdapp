import { HttpError } from "../../utils/HttpError"
import User from "../entity/User"
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

    const updatedData: Partial<User> = {}

    if(data.name !== undefined) updatedData.name = data.name
    if(data.photo !== undefined) updatedData.photo = data.photo

    return await UserRepository.putUser(user, updatedData)
}

export const getUserByIdService = async (id: number) => {
    return await UserRepository.getUserById(id)
}