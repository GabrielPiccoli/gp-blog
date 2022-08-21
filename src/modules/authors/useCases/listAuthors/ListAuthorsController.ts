import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAuthorsUseCase } from "./ListAuthorsUseCase";

class ListAuthorsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAuthorsUseCase = container.resolve(ListAuthorsUseCase);
    const authors = await listAuthorsUseCase.execute();

    return res.json(authors);
  }
}

export { ListAuthorsController };
