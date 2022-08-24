import { ICreateArticleDTO } from "../dtos/ICreateArticleDTO";
import { IResponseArticlesListDTO } from "../dtos/IResponseArticlesListDTO";
import { Article } from "../infra/typeorm/entities/Article";

interface IArticlesRepository {
  create(data: ICreateArticleDTO): Promise<Article>;
  findById(id: string): Promise<Article>;
  findBySlug(slug: string): Promise<Article>;
  deleteById(id: string): Promise<void>;
  changeAvailable(id: string): Promise<Article>;
  changeImage(id: string, image: string): Promise<Article>;
  list(page: number, per_page: number): Promise<IResponseArticlesListDTO>;
  listByCategory(
    page: number,
    per_page: number,
    category_id: string
  ): Promise<IResponseArticlesListDTO>;
  listAvailable(
    page: number,
    per_page: number
  ): Promise<IResponseArticlesListDTO>;
  listAvailableByCategory(
    page: number,
    per_page: number,
    category_id: string
  ): Promise<IResponseArticlesListDTO>;
}

export { IArticlesRepository };
