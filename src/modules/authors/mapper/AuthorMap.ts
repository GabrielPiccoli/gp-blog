import { instanceToInstance } from "class-transformer";

import { IResponseAuthorDTO } from "../dtos/IResponseAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

class AuthorMap {
  static toDTO({
    available,
    id,
    image_url,
    image,
    mini_cv,
    name,
  }: Author): IResponseAuthorDTO {
    const authorMapped = instanceToInstance({
      available,
      id,
      image_url,
      image,
      mini_cv,
      name,
    });
    return authorMapped;
  }
}

export { AuthorMap };
