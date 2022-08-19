import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCategoriesUseCase } from "./ListAvailableCategoriesUseCase";

class ListAvailableCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAvailableCAtegoriesUseCase = container.resolve(
      ListAvailableCategoriesUseCase
    );
    const categories = await listAvailableCAtegoriesUseCase.execute();

    return res.json(categories);
  }
}

export { ListAvailableCategoriesController };
