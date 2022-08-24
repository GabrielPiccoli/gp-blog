import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "@modules/articles/dtos/IResponseArticleDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class GetArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(id: string): Promise<IResponseArticleDTO> {
    let articleExists = await this.articlesRepository.findBySlug(id);

    if (!articleExists) {
      const validID = validUUID(id);

      if (!validID) {
        throw new AppError("Article does not exists");
      }

      articleExists = await this.articlesRepository.findById(id);

      if (!articleExists) {
        throw new AppError("Article does not exists");
      }
    }

    const articleMapped = ArticleMap.toDTO(articleExists);

    return {
      ...articleMapped,
      author: AuthorMap.toDTO(articleExists.author),
    };
  }
}

export { GetArticleUseCase };
