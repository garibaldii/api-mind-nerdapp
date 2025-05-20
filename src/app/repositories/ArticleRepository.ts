import { AppDataSource } from "../../database/data-source";
import Article from "../entity/Article";
import { IArticle } from "../interfaces/IArticle";

const ArticleRepository = AppDataSource.getRepository(Article)

const getArticles = (): Promise<Article[]> => {
    return ArticleRepository.find()
}

const postArticle = (article: Article): Promise<Article> => {
    return ArticleRepository.save(article)
}

const updateArticle = async (article: Article, newData: Partial<Article>): Promise<Article | null> => {

    // Mescla os novos dados no artigo
    let updatedArticle = ArticleRepository.merge(article, newData);

    // Salva o artigo atualizado
     updatedArticle = await ArticleRepository.save(article);

    return updatedArticle;
}

const deleteArticle = (id: number) => { return ArticleRepository.delete(id) }

const getArticleById = (id: number) => {
    return ArticleRepository.findOne({
        where: { id }
    })
}

export default { getArticles, postArticle, updateArticle, deleteArticle, getArticleById }