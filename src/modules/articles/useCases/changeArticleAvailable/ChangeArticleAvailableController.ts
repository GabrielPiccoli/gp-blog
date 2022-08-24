import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeArticleAvailableUseCase } from "./ChangeArticleAvailableUseCase";

class ChangeArticleAvailableController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const changeArticleAvailableUseCase = container.resolve(
      ChangeArticleAvailableUseCase
    );
    const article = await changeArticleAvailableUseCase.execute(id);

    return res.json(article);
  }
}

export { ChangeArticleAvailableController };
