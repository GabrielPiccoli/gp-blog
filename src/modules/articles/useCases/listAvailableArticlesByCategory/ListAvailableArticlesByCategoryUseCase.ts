import { inject, injectable } from "tsyringe";

import { IResponseArticlesListDTO } from "@modules/articles/dtos/IResponseArticlesListDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class ListAvailableArticlesByCategoryUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(
    page: number,
    per_page: number,
    category_id: string
  ): Promise<IResponseArticlesListDTO> {
    const validID = validUUID(category_id);

    if (!validID) {
      throw new AppError("Category does not exists");
    }

    const categoryExists = await this.categoriesRepository.findById(
      category_id
    );

    if (!categoryExists) {
      throw new AppError("Category does not exists");
    }

    const articles = await this.articlesRepository.listAvailableByCategory(
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

export { ListAvailableArticlesByCategoryUseCase };
