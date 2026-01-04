import { Router } from "express";
import { container } from "tsyringe";

import { ConverterController } from "../controllers/converter.controller";

const routes = Router();

const converterController = container.resolve(ConverterController);

routes.get("/", (req, res) => converterController.home(req, res));

routes.get("/converter", (req, res) => converterController.convert(req, res));

export { routes };