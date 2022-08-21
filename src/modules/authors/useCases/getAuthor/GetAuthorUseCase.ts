import { inject, injectable } from "tsyringe";

import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class GetAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute(id: string): Promise<IResponseAuthorDTO> {
    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Author does not exists");
    }

    const authorExists = await this.authorsRepository.findById(id);

    if (!authorExists) {
      throw new AppError("Author does not exists");
    }

    const author = AuthorMap.toDTO(authorExists);

    return author;
  }
}

export { GetAuthorUseCase };
