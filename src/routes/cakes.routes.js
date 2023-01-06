import { Router } from "express";

import cakesSchema from "../schemas/cakes.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

import { createCake } from "../controllers/cakes.controller.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateSchema(cakesSchema), createCake);

export default cakesRouter;
