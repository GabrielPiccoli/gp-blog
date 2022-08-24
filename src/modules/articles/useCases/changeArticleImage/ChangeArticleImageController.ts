import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeArticleImageUseCase } from "./ChangeArticleImageUseCase";

class ChangeArticleImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const image = req.file.filename;
    const changeArticleImageUseCase = container.resolve(
      ChangeArticleImageUseCase
    );
    const article = await changeArticleImageUseCase.execute(id, image);

    return res.json(article);
  }
}

export { ChangeArticleImageController };
