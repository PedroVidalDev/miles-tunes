import { Router } from "express";
import { container } from "tsyringe";

import { SearchController } from "../controllers/search.controller";

const routes = Router();

const searchController = container.resolve(SearchController);
routes.get("/", (req, res) => searchController.home(req, res));

routes.get("/converter", (req, res) => searchController.convert(req, res));

export { routes };