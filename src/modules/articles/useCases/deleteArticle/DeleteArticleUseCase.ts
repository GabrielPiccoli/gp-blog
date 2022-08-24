import { inject, injectable } from "tsyringe";

import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class DeleteArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Article does not exists");
    }

    const articleExists = await this.articlesRepository.findById(id);

    if (!articleExists) {
      throw new AppError("Article does not exists");
    }

    await this.storageProvider.delete(articleExists.image, "articles");
    await this.articlesRepository.deleteById(id);
  }
}

export { DeleteArticleUseCase };
