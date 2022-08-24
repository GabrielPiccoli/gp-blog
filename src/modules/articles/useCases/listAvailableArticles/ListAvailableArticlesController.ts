import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableArticlesUseCase } from "./ListAvailableArticlesUseCase";

class ListAvailableArticlesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page, per_page } = req.query;
    const listAvailableArticlesUseCase = container.resolve(
      ListAvailableArticlesUseCase
    );
    const articles = await listAvailableArticlesUseCase.execute(
      parseInt(page as string, 10) || 1,
      parseInt(per_page as string, 10) || 10
    );

    return res.json(articles);
  }
}

export { ListAvailableArticlesController };
