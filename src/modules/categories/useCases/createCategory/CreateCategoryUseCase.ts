import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { slugify } from "@utils/slugify";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    available,
    title,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const slug = slugify(title);
    const slugAlreadyExists = await this.categoriesRepository.findBySlug(slug);

    if (slugAlreadyExists) {
      throw new AppError("Title already used");
    }

    if (!title) {
      throw new AppError("Title is required");
    }

    const category = await this.categoriesRepository.create({
      available,
      title,
      description,
      slug,
    });

    return category;
  }
}

export { CreateCategoryUseCase };
