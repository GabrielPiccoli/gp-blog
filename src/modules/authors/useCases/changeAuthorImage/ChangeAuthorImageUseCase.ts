import { inject, injectable } from "tsyringe";

import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class ChangeAuthorImageUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string, image: string): Promise<IResponseAuthorDTO> {
    const validID = validUUID(id);

    if (!validID) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Author does not exists");
    }

    const authorExists = await this.authorsRepository.findById(id);

    if (!authorExists) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Author does not exists");
    }

    const author = await this.authorsRepository.changeImage(id, image);

    await this.storageProvider.delete(authorExists.image, "authors");
    await this.storageProvider.save(image, "authors");

    const authorMapped = AuthorMap.toDTO(author);

    return authorMapped;
  }
}

export { ChangeAuthorImageUseCase };
