import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

class DeleteAuthorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteAuthorUseCase = container.resolve(DeleteAuthorUseCase);
    await deleteAuthorUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteAuthorController };
