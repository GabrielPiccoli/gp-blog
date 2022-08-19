import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangeCategoryAvailableUseCase } from "./ChangeCategoryAvailableUseCase";

class ChangeCategoryAvailableController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const changeCategoryAvailableUseCase = container.resolve(
      ChangeCategoryAvailableUseCase
    );
    const category = await changeCategoryAvailableUseCase.execute(id);

    return res.json(category);
  }
}

export { ChangeCategoryAvailableController };
