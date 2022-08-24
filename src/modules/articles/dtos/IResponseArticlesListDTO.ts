import { Article } from "../infra/typeorm/entities/Article";
import { IResponseArticleDTO } from "./IResponseArticleDTO";

interface IResponseArticlesListDTO {
  data: IResponseArticleDTO[] | Article[];
  page: number;
  total: number;
  last_page: number;
}

export { IResponseArticlesListDTO };
