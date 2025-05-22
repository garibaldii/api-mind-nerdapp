import { Request, Response, Router } from "express";
import {
  deleteArticleService,
  getArticleByIdService,
  getArticlesService,
  saveArticleService,
  updateArticleService,
} from "../service/ArticleService";

import { upload } from "../../middleware/upload";
import { authToken } from "../../middleware/Auth";

const articleRouter = Router();

//READ
articleRouter.get("/", async (req, res, next) => {
  try {
    const articles = await getArticlesService();
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
});

//CREATE
articleRouter.post("/", authToken, upload.single("image"), async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    const image = req.file?.buffer

    const article = await saveArticleService(title, content, Number(authorId), image);
    res.status(201).send(article);
  } catch (error) {
    next(error);
  }
});

//UPDATE
articleRouter.put("/:id", authToken, upload.single("image"), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, content, authorId } = req.body;
    const image = req.file?.buffer;

    const data = { title, content, authorId, image }

    const article = await updateArticleService(id, data);

    res.status(200).send(article);
  } catch (error) {
    next(error);
  }
});

//DELETE
articleRouter.delete("/:id", authToken, async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const response = await deleteArticleService(id)

    res.status(200).send({ message: `Artigo excluído com sucesso`, response })
  } catch (error) {
    next(error)
  }
})

//GET BY ID
articleRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const article = await getArticleByIdService(id)

    res.status(200).send(article)
  } catch (error) {
    next(error)
  }
})




//LIKES INTERAÇÃO

//LIKE
// articleRouter.post("/like/:id", async (req, res, next) => {
//   try {
//     const id = Number(req.params.id)

//     const response = await likeArticleService(id)
//     res.status(200).send(response)
//   } catch (error) {
//     next(error)
//   }
// })


// articleRouter.put("/unlike/:id", async (req, res, next) => {
//   try {
//     const id = Number(req.params.id)
//     const response = await unlikeArticleService(id)

//     res.status(200).send(response)
//   } catch (error) {
//     next(error)
//   }
// })
export default articleRouter;
