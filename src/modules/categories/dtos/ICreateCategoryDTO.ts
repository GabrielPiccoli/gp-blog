interface ICreateCategoryDTO {
  id?: string;
  title: string;
  description?: string;
  available: boolean;
  slug?: string;
}

export { ICreateCategoryDTO };
