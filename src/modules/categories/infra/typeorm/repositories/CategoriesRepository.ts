import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({
    id,
    available,
    title,
    description,
    slug,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      id,
      available,
      description,
      title,
      slug,
    });

    await this.repository.save(category);

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);
    return category;
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.repository.findByIds(ids);
    return categories;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.repository.findOne({ slug });
    return category;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async listAvailable(): Promise<Category[]> {
    const categoriesAvailable = await this.repository.find({ available: true });
    return categoriesAvailable;
  }

  async changeAvailable(id: string): Promise<Category> {
    const category = await this.findById(id);

    category.available = !category.available;
    await this.create(category);

    return category;
  }
}

export { CategoriesRepository };
