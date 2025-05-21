import Article from "../entity/Article";
import ArticleRepository from "../repositories/ArticleRepository";
import UserRepository from "../repositories/UserRepository";
import { HttpError } from "../../utils/HttpError";

import sharp from "sharp";

export const getArticlesService = async () => {
  return await ArticleRepository.getArticles();
};

export const saveArticleService = async (
  //subindo sem a data de edicao, pois nao é possível criar um pedido que já foi editado.
  title: string,
  content: string,
  authorId: number,
  image?: Buffer
) => {
  const author = await UserRepository.getUserById(authorId);

  let compressedImage: Buffer | undefined = undefined


  if (!author) {
    throw new HttpError(`o autor referente a este artigo não existe`, 404);
  }

  if (image) {
    compressedImage = await compactImage(image);
  }

  const article = new Article(title, content, author, compressedImage);

  return ArticleRepository.postArticle(article);
};

export const updateArticleService = async (articleId: number, data: any) => {
  const article = await ArticleRepository.getArticleById(articleId);

  if (!article) {
    throw new HttpError(`Este Artigo não existe`, 404);
  }

  const { title, content, authorId, image } = data;
  const author = await UserRepository.getUserById(authorId);

  if (!author) {
    throw new HttpError(`O autor referente a este artigo não existe`, 404);
  }

  const updatedData: Partial<Article> = {
    title,
    content,
    author,
    image,
    editDate: new Date(), //pegando o momento em que o objeto foi atualizado e atribuindo a editDate
  };

  return ArticleRepository.updateArticle(article, updatedData);
};

export const deleteArticleService = async (articleId: number) => {
  const article = await ArticleRepository.getArticleById(articleId);

  if (!article) {
    throw new HttpError(`O artigo não existe`, 404);
  }

  return ArticleRepository.deleteArticle(articleId);
};

export const getArticleByIdService = async (id: number) => {
  return await ArticleRepository.getArticleById(id)
}


const compactImage = async (image: Buffer) => {
  return await sharp(image)
    .resize({ width: 500 }) // redimensiona largura para 800px, mantendo proporção
    .jpeg({ quality: 70 }) // converte pra jpeg com qualidade 70% (compactação)
    .toBuffer();
};
