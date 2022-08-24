import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListArticlesByCategoryUseCase } from "./ListArticlesByCategoryUseCase";

class ListArticlesByCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id } = req.params;
    const { page, per_page } = req.query;
    const listArticlesByCategoryUseCase = container.resolve(
      ListArticlesByCategoryUseCase
    );
    const articles = await listArticlesByCategoryUseCase.execute(
      category_id,
      parseInt(page as string, 10) || 1,
      parseInt(per_page as string, 10) || 10
    );

    return res.json(articles);
  }
}

export { ListArticlesByCategoryController };
