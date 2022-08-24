import { inject, injectable } from "tsyringe";

import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IResponseArticleDTO } from "@modules/articles/dtos/IResponseArticleDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { slugify } from "@utils/slugify";
import { validUUID } from "@utils/validUUID";

@injectable()
class UpdateArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository
  ) {}

  async execute({
    id,
    abstract,
    author_id,
    available,
    categories_ids,
    content,
    title,
  }: ICreateArticleDTO): Promise<IResponseArticleDTO> {
    if (!abstract || !author_id || !categories_ids || !content || !title) {
      throw new AppError("Required fields are empty");
    }

    const validAuthorID = validUUID(author_id);

    if (!validAuthorID) {
      throw new AppError("Author does not exists");
    }

    const validCategoriesIDS = categories_ids.map((id) => validUUID(id));

    if (validCategoriesIDS.some((id) => id === false)) {
      throw new AppError("One or more category does not exists");
    }

    const validID = validUUID(id);

    if (!validID) {
      throw new AppError("Article does not exists");
    }

    const articleExists = await this.articlesRepository.findById(id);

    if (!articleExists) {
      throw new AppError("Article does not exists");
    }

    const slug = slugify(title);
    const slugAlreadyExists = await this.articlesRepository.findBySlug(slug);

    if (slugAlreadyExists && slugAlreadyExists.id !== id) {
      throw new AppError("Title already used");
    }

    const authorExists = await this.authorsRepository.findById(author_id);

    if (!authorExists) {
      throw new AppError("Author does not exists");
    }

    const categoriesExists = await this.categoriesRepository.findByIds(
      categories_ids
    );

    if (categoriesExists.length !== categories_ids.length) {
      throw new AppError("One or more category does not exists");
    }

    const article = await this.articlesRepository.create({
      id,
      abstract,
      author_id,
      available,
      categories_ids,
      content,
      image: articleExists.image,
      title,
      slug,
    });
    const articleMapped = ArticleMap.toDTO(article);

    return articleMapped;
  }
}

export { UpdateArticleUseCase };
