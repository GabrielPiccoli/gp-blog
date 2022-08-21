import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeAuthorImageUseCase } from "./ChangeAuthorImageUseCase";

class ChangeAuthorImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const image = req.file.filename;
    const changeAuthorImageUseCase = container.resolve(
      ChangeAuthorImageUseCase
    );
    const author = await changeAuthorImageUseCase.execute(id, image);

    return res.json(author);
  }
}

export { ChangeAuthorImageController };
