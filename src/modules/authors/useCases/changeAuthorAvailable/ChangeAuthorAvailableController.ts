import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeAuthorAvailableUseCase } from "./ChangeAuthorAvailableUseCase";

class ChangeAuthorAvailableController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const changeAuthorAvailableUseCase = container.resolve(
      ChangeAuthorAvailableUseCase
    );
    const author = await changeAuthorAvailableUseCase.execute(id);

    return res.json(author);
  }
}

export { ChangeAuthorAvailableController };
