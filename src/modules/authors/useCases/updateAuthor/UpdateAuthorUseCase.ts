import { inject, injectable } from "tsyringe";

import { ICreateAuthorDTO } from "@modules/authors/dtos/ICreateAuthorDTO";
import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { AppError } from "@shared/errors/AppError";
import { validUUID } from "@utils/validUUID";

@injectable()
class UpdateAuthorUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute({
    id,
    available,
    mini_cv,
    name,
  }: ICreateAuthorDTO): Promise<IResponseAuthorDTO> {
    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Author does not exists");
    }

    const authorExists = await this.authorsRepository.findById(id);

    if (!authorExists) {
      throw new AppError("Author does not exists");
    }

    const author = await this.authorsRepository.create({
      id,
      available,
      mini_cv,
      name,
      image: authorExists.image,
    });
    const authorMapped = AuthorMap.toDTO(author);

    return authorMapped;
  }
}

export { UpdateAuthorUseCase };
