import { inject, injectable } from "tsyringe";

import { IResponseArticlesListDTO } from "@modules/articles/dtos/IResponseArticlesListDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class ListArticlesByCategoryUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(
    category_id: string,
    page: number,
    per_page: number
  ): Promise<IResponseArticlesListDTO> {
    let categoryExists = await this.categoriesRepository.findBySlug(
      category_id
    );

    if (!categoryExists) {
      const validID = validUUID(category_id);

      if (!validID) {
        throw new AppError("Category does not exists");
      }

      categoryExists = await this.categoriesRepository.findById(category_id);

      if (!categoryExists) {
        throw new AppError("Category does not exists");
      }
    }

    const articles = await this.articlesRepository.listByCategory(
      page,
      per_page,
      category_id
    );
    const articlesMapped = articles.data.map((article) =>
      ArticleMap.toDTO(article)
    );

    return {
      ...articles,
      data: articlesMapped,
    };
  }
}

export { ListArticlesByCategoryUseCase };
