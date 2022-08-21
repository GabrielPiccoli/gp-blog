import { container } from "tsyringe";

import "@shared/container/providers";
import { AuthorsRepository } from "@modules/authors/infra/typeorm/repositories/AuthorsRepository";
import { IAuthorsRepository } from "@modules/authors/repositories/IAuthorsRepository";
import { CategoriesRepository } from "@modules/categories/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/users/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IAuthorsRepository>(
  "AuthorsRepository",
  AuthorsRepository
);
