import { Router } from "express";

import { ChangeCategoryAvailableController } from "@modules/categories/useCases/changeCategoryAvailable/ChangeCategoryAvailableController";
import { CreateCategoryController } from "@modules/categories/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/categories/useCases/deleteCategory/DeleteCategoryController";
import { GetCategoryController } from "@modules/categories/useCases/getCategory/GetCategoryController";
import { ListAvailableCategoriesController } from "@modules/categories/useCases/listAvailableCategories/ListAvailableCategoriesController";
import { ListCategoriesController } from "@modules/categories/useCases/listCategories/ListCategoriesController";
import { UpdateCategoryController } from "@modules/categories/useCases/updateCategory/UpdateCategoryController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const listAvailableCategoriesController =
  new ListAvailableCategoriesController();
const getCategoryController = new GetCategoryController();
const changeCategoryAvailableController =
  new ChangeCategoryAvailableController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle
);
categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);
categoriesRoutes.get("/available", listAvailableCategoriesController.handle);
categoriesRoutes.get("/:id", ensureAuthenticated, getCategoryController.handle);
categoriesRoutes.patch(
  "/available/:id",
  ensureAuthenticated,
  changeCategoryAvailableController.handle
);
categoriesRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateCategoryController.handle
);
categoriesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteCategoryController.handle
);

export { categoriesRoutes };
