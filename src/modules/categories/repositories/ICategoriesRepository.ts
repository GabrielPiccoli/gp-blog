import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findById(id: string): Promise<Category>;
  findByIds(ids: string[]): Promise<Category[]>;
  findBySlug(slug: string): Promise<Category>;
  deleteById(id: string): Promise<void>;
  list(): Promise<Category[]>;
  listAvailable(): Promise<Category[]>;
  changeAvailable(id: string): Promise<Category>;
}

export { ICategoriesRepository };
