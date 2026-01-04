import { Router } from "express";
import { container } from "tsyringe";

import { SearchController } from "../controllers/search.controller";
import { ConvertController } from "../controllers/convert.controller";

const routes = Router();

const searchController = container.resolve(SearchController);
const convertController = container.resolve(ConvertController);

routes.get("/", (req, res) => searchController.renderHome(req, res));
routes.get("/search", (req, res) => searchController.search(req, res));
routes.get("/result", (req, res) => searchController.renderResult(req, res));

routes.get("/convert", (req, res) => convertController.convert(req, res));

export { routes };