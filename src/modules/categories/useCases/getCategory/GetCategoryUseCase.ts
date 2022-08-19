import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { CategoriesRepository } from "@modules/categories/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class GetCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(id: string): Promise<Category> {
    const isUUID = validUUID(id);
    let categoryExists: Category;

    if (isUUID) {
      categoryExists = await this.categoriesRepository.findById(id);
    } else {
      categoryExists = await this.categoriesRepository.findBySlug(id);
    }

    if (!categoryExists) {
      throw new AppError("Category does not exists");
    }

    return categoryExists;
  }
}

export { GetCategoryUseCase };
