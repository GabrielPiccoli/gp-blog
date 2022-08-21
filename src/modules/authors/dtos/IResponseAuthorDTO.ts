interface IResponseAuthorDTO {
  id?: string;
  name: string;
  image: string;
  available: boolean;
  mini_cv: string;
  image_url(): string;
}

export { IResponseAuthorDTO };
