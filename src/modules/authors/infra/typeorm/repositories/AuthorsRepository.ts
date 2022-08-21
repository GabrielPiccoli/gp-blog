import { getRepository, Repository } from "typeorm";

import { ICreateAuthorDTO } from "@modules/authors/dtos/ICreateAuthorDTO";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";

import { Author } from "../entities/Author";

class AuthorsRepository implements IAuthorsRepository {
  private repository: Repository<Author>;

  constructor() {
    this.repository = getRepository(Author);
  }

  async create({
    id,
    available,
    image,
    mini_cv,
    name,
  }: ICreateAuthorDTO): Promise<Author> {
    const author = this.repository.create({
      id,
      available,
      image,
      mini_cv,
      name,
    });

    await this.repository.save(author);

    return author;
  }

  async findById(id: string): Promise<Author> {
    const author = await this.repository.findOne(id);
    return author;
  }

  async list(): Promise<Author[]> {
    const authors = await this.repository.find();
    return authors;
  }

  async listAvailable(): Promise<Author[]> {
    const authors = await this.repository.find({ available: true });
    return authors;
  }

  async changeImage(id: string, image: string): Promise<Author> {
    const author = await this.findById(id);

    author.image = image;
    await this.create(author);

    return author;
  }

  async changeAvailable(id: string): Promise<Author> {
    const author = await this.findById(id);

    author.available = !author.available;
    await this.create(author);

    return author;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { AuthorsRepository };
