import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { slugify } from "@utils/slugify";

import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({
    id,
    available,
    title,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    let category: Category;
    const slug = slugify(title);

    if (id) {
      category = await this.findById(id);
    } else {
      category = new Category();
      Object.assign(category, {
        created_at: new Date(),
      });
    }

    Object.assign(category, {
      available,
      title,
      description,
      slug,
      updated_at: new Date(),
    });

    // eslint-disable-next-line no-unused-expressions
    id && this.categories.push(category);

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);
    return category;
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    const categories = this.categories.filter((c) =>
      ids.find((id) => id === c.id)
    );
    return categories;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = this.categories.find((category) => category.slug === slug);
    return category;
  }

  async deleteById(id: string): Promise<void> {
    const category = await this.findById(id);
    const indexOfCategory = this.categories.indexOf(category);
    this.categories.splice(indexOfCategory, 1);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async listAvailable(): Promise<Category[]> {
    const available = this.categories.filter((category) => category.available);
    return available;
  }

  async changeAvailable(id: string): Promise<Category> {
    const category = await this.findById(id);

    Object.assign(category, {
      available: !category.available,
    });

    return category;
  }
}

export { CategoriesRepositoryInMemory };
