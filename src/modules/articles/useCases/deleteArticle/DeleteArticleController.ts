import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteArticleUseCase } from "./DeleteArticleUseCase";

class DeleteArticleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteArticleUseCase = container.resolve(DeleteArticleUseCase);
    await deleteArticleUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteArticleController };
