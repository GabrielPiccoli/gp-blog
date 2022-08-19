import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, available } = req.body;
    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
    const category = await updateCategoryUseCase.execute({
      id,
      title,
      description,
      available,
    });

    return res.json(category);
  }
}

export { UpdateCategoryController };
