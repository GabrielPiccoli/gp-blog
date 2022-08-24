import { Router } from "express";

import { articlesRoutes } from "./articles.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { authorRoutes } from "./authors.routes";
import { categoriesRoutes } from "./categories.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/authors", authorRoutes);
router.use("/articles", articlesRoutes);

export { router };
