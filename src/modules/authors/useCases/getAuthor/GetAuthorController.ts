import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAuthorUseCase } from "./GetAuthorUseCase";

class GetAuthorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getAuthorUseCase = container.resolve(GetAuthorUseCase);
    const author = await getAuthorUseCase.execute(id);

    return res.json(author);
  }
}

export { GetAuthorController };
