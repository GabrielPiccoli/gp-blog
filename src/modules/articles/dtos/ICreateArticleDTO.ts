interface ICreateArticleDTO {
  id?: string;
  title: string;
  image?: string;
  content: string;
  author_id: string;
  abstract: string;
  available: boolean;
  slug?: string;
  categories_ids: string[];
}

export { ICreateArticleDTO };
