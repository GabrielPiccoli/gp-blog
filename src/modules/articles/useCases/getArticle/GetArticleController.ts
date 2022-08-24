import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetArticleUseCase } from "./GetArticleUseCase";

class GetArticleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getArticleUseCase = container.resolve(GetArticleUseCase);
    const article = await getArticleUseCase.execute(id);

    return res.json(article);
  }
}

export { GetArticleController };
