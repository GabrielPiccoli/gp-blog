import { inject, injectable } from "tsyringe";

import { IResponseArticlesListDTO } from "@modules/articles/dtos/IResponseArticlesListDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";

@injectable()
class ListArticlesUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(
    page: number,
    per_page: number
  ): Promise<IResponseArticlesListDTO> {
    const articles = await this.articlesRepository.list(page, per_page);
    const articlesMapped = articles.data.map((article) =>
      ArticleMap.toDTO(article)
    );

    return {
      ...articles,
      data: articlesMapped,
    };
  }
}

export { ListArticlesUseCase };
