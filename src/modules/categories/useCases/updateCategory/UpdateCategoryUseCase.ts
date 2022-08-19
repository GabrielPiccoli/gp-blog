import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { slugify } from "@utils/slugify";

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    id,
    available,
    title,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError("Category does not exists");
    }

    if (!title) {
      throw new AppError("Title is required");
    }

    const slug = slugify(title);
    const slugAlreadyExists = await this.categoriesRepository.findBySlug(slug);

    if (slugAlreadyExists && slugAlreadyExists.id !== id) {
      throw new AppError("Title already used");
    }

    const category = await this.categoriesRepository.create({
      id,
      available,
      title,
      description,
      slug,
    });

    return category;
  }
}

export { UpdateCategoryUseCase };
