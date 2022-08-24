import { IResponseAuthorDTO } from "@modules/authors/dtos/IResponseAuthorDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";

interface IResponseArticleDTO {
  id: string;
  image: string;
  title: string;
  content: string;
  author_id: string;
  author: IResponseAuthorDTO;
  abstract: string;
  available: boolean;
  categories: Category[];
  slug: string;
  image_url(): string;
}

export { IResponseArticleDTO };
