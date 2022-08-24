import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ChangeArticleAvailableController } from "@modules/articles/useCases/changeArticleAvailable/ChangeArticleAvailableController";
import { ChangeArticleImageController } from "@modules/articles/useCases/changeArticleImage/ChangeArticleImageController";
import { CreateArticleController } from "@modules/articles/useCases/createArticle/CreateArticleController";
import { DeleteArticleController } from "@modules/articles/useCases/deleteArticle/DeleteArticleController";
import { GetArticleController } from "@modules/articles/useCases/getArticle/GetArticleController";
import { ListArticlesController } from "@modules/articles/useCases/listArticles/ListArticlesController";
import { ListArticlesByCategoryController } from "@modules/articles/useCases/listArticlesByCategory/ListArticlesByCategoryController";
import { ListAvailableArticlesController } from "@modules/articles/useCases/listAvailableArticles/ListAvailableArticlesController";
import { ListAvailableArticlesByCategoryController } from "@modules/articles/useCases/listAvailableArticlesByCategory/ListAvailableArticlesByCategoryController";
import { UpdateArticleController } from "@modules/articles/useCases/updateArticle/UpdateArticleController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const articlesRoutes = Router();

const createArticleController = new CreateArticleController();
const listArticlesController = new ListArticlesController();
const listAvailableArticlesController = new ListAvailableArticlesController();
const listArticlesByCategoryController = new ListArticlesByCategoryController();
const listAvailableArticlesByCategoryController =
  new ListAvailableArticlesByCategoryController();
const getArticleController = new GetArticleController();
const changeArticleAvailableController = new ChangeArticleAvailableController();
const changeArticleImageController = new ChangeArticleImageController();
const updateArticleController = new UpdateArticleController();
const deleteArticleController = new DeleteArticleController();

const upload = multer(uploadConfig);

articlesRoutes.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  createArticleController.handle
);
articlesRoutes.get("/", ensureAuthenticated, listArticlesController.handle);
articlesRoutes.get("/available", listAvailableArticlesController.handle);
articlesRoutes.get(
  "/category/:category_id",
  ensureAuthenticated,
  listArticlesByCategoryController.handle
);
articlesRoutes.get(
  "/available/category/:category_id",
  listAvailableArticlesByCategoryController.handle
);
articlesRoutes.get("/:id", getArticleController.handle);
articlesRoutes.patch(
  "/available/:id",
  ensureAuthenticated,
  changeArticleAvailableController.handle
);
articlesRoutes.patch(
  "/image/:id",
  ensureAuthenticated,
  upload.single("image"),
  changeArticleImageController.handle
);
articlesRoutes.put("/:id", ensureAuthenticated, updateArticleController.handle);
articlesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteArticleController.handle
);

export { articlesRoutes };
