import { HttpError } from "../../utils/HttpError"
import User from "../entity/User"
import ArticleRepository from "../repositories/ArticleRepository"
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

    if (data.name !== undefined) updatedData.name = data.name
    if (data.photo !== undefined) updatedData.photo = data.photo

    return await UserRepository.putUser(user, updatedData)
}

export const getUserByIdService = async (id: number) => {
    return await UserRepository.getUserById(id)
}

export const likeArticleService = async (userId: number, articleId: number) => {
    const user = await UserRepository.getUserById(userId)
    const article = await ArticleRepository.getArticleById(articleId)

    if (!user || !article) { throw new HttpError(`Usuário ou Artigo não existe`, 404) }

    if (!user.likedArticles) { user.likedArticles = [] }

    const alreadyLiked = user.likedArticles.some((article) => article.id === articleId)
    if (alreadyLiked) { throw new HttpError(`Usuário já curtiu este artigo`, 400) }

    //atualiza a contagem de like do artigo
    ArticleRepository.incrementLike(articleId)

    //joga o artigo para a lista de artigos curtidos por aquele usuário.
    user.likedArticles.push(article)

    //neste caso, o typeORM diferencia um objeto através da presenca ou nao de seu ID,
    //logo, iremos salvar a atualizacao de likedArticles deste objeto. 
    return UserRepository.postUser(user)

}