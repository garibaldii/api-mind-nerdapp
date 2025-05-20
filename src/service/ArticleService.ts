import Article from "../app/entity/Article"
import ArticleRepository from "../app/repositories/ArticleRepository"
import UserRepository from "../app/repositories/UserRepository"
import { HttpError } from '../utils/HttpError';


export const getArticles = async () => {
    return await ArticleRepository.getArticles()
}

export const saveArticle = async (
    //subindo sem a data de edicao, pois nao é possível criar um pedido que já foi editado. 
    title: string,
    content: string,
    authorId: number,
    image?: Buffer) => {

    const author = await UserRepository.getUserById(authorId)

    if (!author) {
        throw new HttpError(
            `o autor referente a este artigo não existe`,
            404
        )
    }

    const article = new Article(title, content, author, image)

    return ArticleRepository.postArticle(article)
}

export const updateArticle = async (articleId: number, data: any) => {

    const article = ArticleRepository.getArticleById(articleId)

    if (!article) {
        throw new HttpError(
            `Este Artigo não existe`,
            404
        )
    }

    
}