import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListArticlesUseCase } from "./ListArticlesUseCase";

class ListArticlesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page, per_page } = req.query;
    const listArticlesUseCase = container.resolve(ListArticlesUseCase);
    const articles = await listArticlesUseCase.execute(
      parseInt(page as string, 10) || 1,
      parseInt(per_page as string, 10) || 10
    );

    return res.json(articles);
  }
}

export { ListArticlesController };
