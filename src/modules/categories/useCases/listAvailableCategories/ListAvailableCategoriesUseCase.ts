import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";

@injectable()
class ListAvailableCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAvailable();
    return categories;
  }
}

export { ListAvailableCategoriesUseCase };
