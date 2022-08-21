import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

class CreateAuthorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { available, name, mini_cv } = req.body;
    const image = req.file.filename;
    const createAuthorUseCase = container.resolve(CreateAuthorUseCase);
    const author = await createAuthorUseCase.execute({
      available: available === "true" || available === true,
      name,
      mini_cv,
      image,
    });

    return res.status(201).json(author);
  }
}

export { CreateAuthorController };
