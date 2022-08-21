import { inject, injectable } from "tsyringe";

import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { AuthorMap } from "@modules/authors/mapper/AuthorMap";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";

@injectable()
class ListAvailableAuthorsUseCase {
  constructor(
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute(): Promise<IResponseAuthorDTO[]> {
    const authors = await this.authorsRepository.listAvailable();
    const authorsMapped = authors.map((author) => AuthorMap.toDTO(author));

    return authorsMapped;
  }
}

export { ListAvailableAuthorsUseCase };
