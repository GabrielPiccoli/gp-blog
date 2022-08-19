import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getCategoryUseCase = container.resolve(GetCategoryUseCase);
    const category = await getCategoryUseCase.execute(id);

    return res.json(category);
  }
}

export { GetCategoryController };
