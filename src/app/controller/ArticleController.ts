import { Request, Response, Router } from 'express';
import { getArticles, saveArticle } from '../../service/ArticleService';

const articleRouter = Router();

//READ
articleRouter.get("/", async (req, res, next) => {
    try {
        const articles = await getArticles()
        res.status(200).send({ articles })
    } catch (error) {
        next(error)
    }
})

//CREATE
articleRouter.post("/", async (req, res, next) => {
    try {
        const {
            title,
            content,
            authorId,
            image
        } = req.body;

        const article = await saveArticle(title, content, authorId, image)
        res.status(201).send({ article })
    } catch (error) {
        next(error)
    }
})

//UPDATE
articleRouter.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        const { title, content, image } = req.body
    } catch (error) {
        next(error)
    }
})

export default articleRouter;
