import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "@modules/articles/dtos/IResponseArticleDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class ChangeArticleAvailableUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(id: string): Promise<IResponseArticleDTO> {
    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Article does not exists");
    }

    const articleExists = await this.articlesRepository.findById(id);

    if (!articleExists) {
      throw new AppError("Article does not exists");
    }

    const article = await this.articlesRepository.changeAvailable(id);
    const articleMapped = ArticleMap.toDTO(article);

    return articleMapped;
  }
}

export { ChangeArticleAvailableUseCase };
