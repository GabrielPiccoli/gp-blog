import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateArticleUseCase } from "./CreateArticleUseCase";

class CreateArticleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { abstract, author_id, available, categories_ids, content, title } =
      req.body;
    const image = req.file.filename;
    const createArticleUseCase = container.resolve(CreateArticleUseCase);
    const categoriesArray = categories_ids.replace(/ /g, "").split(",");
    const article = await createArticleUseCase.execute({
      abstract,
      author_id,
      available: available === "true",
      categories_ids: categoriesArray,
      content,
      image,
      title,
    });

    return res.status(201).json(article);
  }
}

export { CreateArticleController };
