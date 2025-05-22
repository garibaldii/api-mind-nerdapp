import { HttpError } from "../../utils/HttpError";
import User from "../entity/User";
import ArticleRepository from "../repositories/ArticleRepository";
import UserRepository from "../repositories/UserRepository";

export const putUser = async (id: number, data: any) => {
  const user = await UserRepository.getUserById(id);

  if (!user) {
    throw new HttpError(`Usuário não existe`, 404);
  }

  if (!data) {
    throw new HttpError(`Não existem dados novos a serem atualizados`, 404);
  }

  const updatedData: Partial<User> = {};

  if (data.name !== undefined) updatedData.name = data.name;
  if (data.photo !== undefined) updatedData.photo = data.photo;

  return await UserRepository.putUser(user, updatedData);
};

export const getUserByIdService = async (id: number) => {
  return await UserRepository.getUserById(id);
};

export const likeArticleService = async (userId: number, articleId: number) => {
  const user = await UserRepository.getUserById(userId);
  const article = await ArticleRepository.getArticleById(articleId);

  if (!user || !article) {
    throw new HttpError(`Usuário ou Artigo não existe`, 404);
  }

  user.likedArticles = user.articles ?? [];

  const liked = user.likedArticles.some(
    (article) => Number(article.id) === Number(articleId)
  );

  console.log(liked);
  console.log(user.likedArticles);
  if (liked) {
    throw new HttpError(`Usuário já curtiu este artigo`, 400);
  }

  //atualiza a contagem de like do artigo
  ArticleRepository.incrementLike(articleId);

  //joga o artigo para a lista de artigos curtidos por aquele usuário.
  return await UserRepository.likeArticle(userId, articleId);

  
};

export const unlikeArticleService = async (userId: number, articleId: number) => {
    const user = await UserRepository.getUserById(userId);
  const article = await ArticleRepository.getArticleById(articleId);

  if (!user || !article) {
    throw new HttpError(`Usuário ou Artigo não existe`, 404);
  }

    const liked = user.likedArticles.some(
    (article) => Number(article.id) === Number(articleId)
  );

  if(!liked) {
    throw new HttpError(`Usuário não curtiu este artigo, nao é possível descurtir`, 400)
  }

  ArticleRepository.decrementLike(articleId)

  return await UserRepository.unlikeArticle(userId, articleId)
}
