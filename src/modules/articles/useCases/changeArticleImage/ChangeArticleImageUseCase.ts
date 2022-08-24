import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "@modules/articles/dtos/IResponseArticleDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class ChangeArticleImageUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string, image: string): Promise<IResponseArticleDTO> {
    const validID = validUUID(id);

    if (!validID) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Article does not exists");
    }

    const articleExists = await this.articlesRepository.findById(id);

    if (!articleExists) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Article does not exists");
    }

    await this.storageProvider.save(image, "articles");
    await this.storageProvider.delete(articleExists.image, "articles");
    const article = await this.articlesRepository.changeImage(id, image);
    const articleMapped = ArticleMap.toDTO(article);

    return articleMapped;
  }
}

export { ChangeArticleImageUseCase };
