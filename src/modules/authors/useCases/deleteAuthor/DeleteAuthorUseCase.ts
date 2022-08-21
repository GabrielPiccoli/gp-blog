import { inject, injectable } from "tsyringe";

import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class DeleteAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Author does not exists");
    }

    const authorExists = await this.authorsRepository.findById(id);

    if (!authorExists) {
      throw new AppError("Author does not exists");
    }

    await this.storageProvider.delete(authorExists.image, "authors");
    await this.authorsRepository.deleteById(id);
  }
}

export { DeleteAuthorUseCase };
