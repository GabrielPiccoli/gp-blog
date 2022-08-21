import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

interface IAuthorsRepository {
  create(data: ICreateAuthorDTO): Promise<Author>;
  findById(id: string): Promise<Author>;
  list(): Promise<Author[]>;
  listAvailable(): Promise<Author[]>;
  changeImage(id: string, image: string): Promise<Author>;
  changeAvailable(id: string): Promise<Author>;
  deleteById(id: string): Promise<void>;
}

export { IAuthorsRepository };
