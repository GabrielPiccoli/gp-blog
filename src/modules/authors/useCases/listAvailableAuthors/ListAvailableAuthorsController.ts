import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableAuthorsUseCase } from "./ListAvailableAuthorsUseCase";

class ListAvailableAuthorsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAvailableAuthorsUseCase = container.resolve(
      ListAvailableAuthorsUseCase
    );
    const authors = await listAvailableAuthorsUseCase.execute();

    return res.json(authors);
  }
}

export { ListAvailableAuthorsController };
