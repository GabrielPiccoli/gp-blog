import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAuthorUseCase } from "./UpdateAuthorUseCase";

class UpdateAuthorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, mini_cv, available } = req.body;
    const updateAuthorUseCase = container.resolve(UpdateAuthorUseCase);
    const author = await updateAuthorUseCase.execute({
      id,
      name,
      mini_cv,
      available,
      image: "",
    });

    return res.json(author);
  }
}

export { UpdateAuthorController };
