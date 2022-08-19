import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ChangeCategoryAvailableUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError("Category does not exists");
    }

    const category = await this.categoriesRepository.changeAvailable(id);

    return category;
  }
}

export { ChangeCategoryAvailableUseCase };
