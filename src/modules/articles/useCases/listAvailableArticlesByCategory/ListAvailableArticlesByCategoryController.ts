import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableArticlesByCategoryUseCase } from "./ListAvailableArticlesByCategoryUseCase";

class ListAvailableArticlesByCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id } = req.params;
    const { page, per_page } = req.query;
    const listAvailableArticlesByCategoryUseCase = container.resolve(
      ListAvailableArticlesByCategoryUseCase
    );
    const articles = await listAvailableArticlesByCategoryUseCase.execute(
      parseInt(page as string, 10) || 1,
      parseInt(per_page as string, 10) || 10,
      category_id
    );

    return res.json(articles);
  }
}

export { ListAvailableArticlesByCategoryController };
