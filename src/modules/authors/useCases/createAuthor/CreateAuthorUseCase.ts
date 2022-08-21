import { inject, injectable } from "tsyringe";

import { ICreateAuthorDTO } from "@modules/authors/dtos/ICreateAuthorDTO";
import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    available,
    image,
    mini_cv,
    name,
  }: ICreateAuthorDTO): Promise<IResponseAuthorDTO> {
    if (!image || !mini_cv || !name) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Required fields are empty");
    }

    await this.storageProvider.save(image, "authors");
    const author = await this.authorsRepository.create({
      available,
      image,
      mini_cv,
      name,
    });
    const authorMapped = AuthorMap.toDTO(author);

    return authorMapped;
  }
}

export { CreateAuthorUseCase };
