import { instanceToInstance } from "class-transformer";

import { IResponseArticleDTO } from "../dtos/IResponseArticleDTO";
import { Article } from "../infra/typeorm/entities/Article";

class ArticleMap {
  static toDTO({
    id,
    abstract,
    author_id,
    author,
    available,
    categories,
    content,
    created_at,
    image,
    image_url,
    slug,
    title,
  }: Article): IResponseArticleDTO {
    const article = instanceToInstance({
      id,
      abstract,
      author_id,
      author,
      available,
      categories,
      content,
      created_at,
      image,
      image_url,
      slug,
      title,
    });

    return article;
  }
}

export { ArticleMap };
