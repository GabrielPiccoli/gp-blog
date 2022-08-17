import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, description, available } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    const category = await createCategoryUseCase.execute({
      title,
      description,
      available,
    });

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
