import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

class UpdateArticleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { abstract, author_id, available, categories_ids, content, title } =
      req.body;
    const updateArticleUseCase = container.resolve(UpdateArticleUseCase);
    const article = await updateArticleUseCase.execute({
      id,
      abstract,
      author_id,
      available,
      categories_ids,
      content,
      title,
    });

    return res.json(article);
  }
}

export { UpdateArticleController };
