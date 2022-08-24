import { getRepository, Repository } from "typeorm";

import { ICreateArticleDTO } from "@modules/articles/dtos/ICreateArticleDTO";
import { IResponseArticlesListDTO } from "@modules/articles/dtos/IResponseArticlesListDTO";
import { IArticlesRepository } from "@modules/articles/repositories/IArticlesRepository";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { Article } from "../entities/Article";

class ArticlesRepository implements IArticlesRepository {
  private repository: Repository<Article>;
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Article);
    this.categoriesRepository = getRepository(Category);
  }

  async create({
    id,
    abstract,
    author_id,
    available,
    categories_ids,
    content,
    image,
    title,
    slug,
  }: ICreateArticleDTO): Promise<Article> {
    const article = this.repository.create({
      id,
      abstract,
      author_id,
      available,
      content,
      image,
      title,
      slug,
    });
    const categories = await this.categoriesRepository.findByIds(
      categories_ids
    );

    article.categories = categories;
    await this.repository.save(article);

    return article;
  }

  async findById(id: string): Promise<Article> {
    const article = await this.repository.findOne({
      where: { id },
      relations: ["categories", "author"],
    });
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.repository.findOne({
      where: { slug },
      relations: ["categories", "author"],
    });
    return article;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async changeAvailable(id: string): Promise<Article> {
    const article = await this.repository.findOne(id);

    article.available = !article.available;
    this.repository.create(article);
    await this.repository.save(article);

    return article;
  }

  async changeImage(id: string, image: string): Promise<Article> {
    const article = await this.repository.findOne(id);

    article.image = image;
    this.repository.create(article);
    await this.repository.save(article);

    return article;
  }

  async list(
    page: number,
    per_page: number
  ): Promise<IResponseArticlesListDTO> {
    const skip = per_page * (page - 1);
    const total = await this.repository.count();
    const last_page = Math.ceil(total / per_page);
    const data = await this.repository.find({
      order: { created_at: "DESC" },
      skip,
      take: per_page,
      relations: ["categories", "author"],
    });

    return {
      data,
      page,
      total,
      last_page,
    };
  }

  async listByCategory(
    page: number,
    per_page: number,
    category_id: string
  ): Promise<IResponseArticlesListDTO> {
    const skip = per_page * (page - 1);
    const category = await this.categoriesRepository.findOne({
      where: { id: category_id },
      relations: ["articles"],
    });
    const total = category.articles.length;
    const last_page = Math.ceil(total / per_page);
    const data = category.articles
      .sort((a, b) => Number(b.created_at) - Number(a.created_at))
      .slice(skip, page * per_page);

    return {
      data,
      page,
      total,
      last_page,
    };
  }

  async listAvailable(
    page: number,
    per_page: number
  ): Promise<IResponseArticlesListDTO> {
    const skip = per_page * (page - 1);
    const total = await this.repository.count({ available: true });
    const last_page = Math.ceil(total / per_page);
    const data = await this.repository.find({
      order: { created_at: "DESC" },
      skip,
      take: per_page,
      relations: ["categories", "author"],
      where: { available: true },
    });

    return {
      data,
      page,
      total,
      last_page,
    };
  }

  async listAvailableByCategory(
    page: number,
    per_page: number,
    category_id: string
  ): Promise<IResponseArticlesListDTO> {
    const skip = per_page * (page - 1);
    const category = await this.categoriesRepository.findOne({
      where: { id: category_id },
      relations: ["articles"],
    });
    const availableArticles = category.articles.filter(
      (article) => article.available
    );
    const total = availableArticles.length;
    const last_page = Math.ceil(total / per_page);
    const data = availableArticles
      .sort((a, b) => Number(b.created_at) - Number(a.created_at))
      .slice(skip, page * per_page);

    return {
      data,
      page,
      total,
      last_page,
    };
  }
}

export { ArticlesRepository };
