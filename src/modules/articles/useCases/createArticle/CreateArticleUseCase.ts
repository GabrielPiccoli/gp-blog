import { inject, injectable } from "tsyringe";

import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IResponseArticleDTO } from "@modules/articles/dtos/IResponseArticleDTO";
import { ArticleMap } from "@modules/articles/mapper/ArticleMap";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { slugify } from "@utils/slugify";
import { validUUID } from "@utils/validUUID";

@injectable()
class CreateArticleUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("AuthorsRepository")
    private authorsRepository: IAuthorsRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    abstract,
    author_id,
    available,
    categories_ids,
    content,
    image,
    title,
  }: ICreateArticleDTO): Promise<IResponseArticleDTO> {
    if (
      !abstract ||
      !author_id ||
      !categories_ids ||
      !content ||
      !image ||
      !title
    ) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Required fields are empty");
    }

    const validID = validUUID(author_id);

    if (!validID) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Author does not exists");
    }

    const validIDS = categories_ids.map((id) => validUUID(id));

    if (validIDS.some((id) => id === false)) {
      await this.storageProvider.delete(image, "");
      throw new AppError("One or more category does not exists");
    }

    const slug = slugify(title);
    const slugAlreadyExists = await this.articlesRepository.findBySlug(slug);

    if (slugAlreadyExists) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Title already used");
    }

    const authorExists = await this.authorsRepository.findById(author_id);

    if (!authorExists) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Author does not exists");
    }

    const categoriesExists = await this.categoriesRepository.findByIds(
      categories_ids
    );

    if (categoriesExists.length !== categories_ids.length) {
      await this.storageProvider.delete(image, "");
      throw new AppError("One or more category does not exists");
    }

    const article = await this.articlesRepository.create({
      abstract,
      author_id,
      available,
      categories_ids,
      content,
      image,
      title,
      slug,
    });
    const articleMapped = ArticleMap.toDTO(article);

    return articleMapped;
  }
}

export { CreateArticleUseCase };
