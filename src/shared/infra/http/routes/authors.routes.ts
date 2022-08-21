import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ChangeAuthorAvailableController } from "@modules/authors/useCases/changeAuthorAvailable/ChangeAuthorAvailableController";
import { ChangeAuthorImageController } from "@modules/authors/useCases/changeAuthorImage/ChangeAuthorImageController";
import { CreateAuthorController } from "@modules/authors/useCases/createAuthor/CreateAuthorController";
import { DeleteAuthorController } from "@modules/authors/useCases/deleteAuthor/DeleteAuthorController";
import { GetAuthorController } from "@modules/authors/useCases/getAuthor/GetAuthorController";
import { ListAuthorsController } from "@modules/authors/useCases/listAuthors/ListAuthorsController";
import { ListAvailableAuthorsController } from "@modules/authors/useCases/listAvailableAuthors/ListAvailableAuthorsController";
import { UpdateAuthorController } from "@modules/authors/useCases/updateAuthor/UpdateAuthorController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();
const listAuthorsController = new ListAuthorsController();
const listAvailableAuthorsController = new ListAvailableAuthorsController();
const getAuthorController = new GetAuthorController();
const changeAuthorAvailableController = new ChangeAuthorAvailableController();
const changeAuthorImageController = new ChangeAuthorImageController();
const updateAuthorController = new UpdateAuthorController();
const deleteAuthorController = new DeleteAuthorController();

const upload = multer(uploadConfig);

authorRoutes.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  createAuthorController.handle
);
authorRoutes.get("/", ensureAuthenticated, listAuthorsController.handle);
authorRoutes.get("/available", listAvailableAuthorsController.handle);
authorRoutes.get("/:id", ensureAuthenticated, getAuthorController.handle);
authorRoutes.patch(
  "/available/:id",
  ensureAuthenticated,
  changeAuthorAvailableController.handle
);
authorRoutes.patch(
  "/image/:id",
  ensureAuthenticated,
  upload.single("image"),
  changeAuthorImageController.handle
);
authorRoutes.put("/:id", ensureAuthenticated, updateAuthorController.handle);
authorRoutes.delete("/:id", ensureAuthenticated, deleteAuthorController.handle);

export { authorRoutes };
