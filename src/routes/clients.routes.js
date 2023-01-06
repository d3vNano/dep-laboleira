import { Router } from "express";

import clientsSchema from "../schemas/clients.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClient } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientsSchema), createClient);

export default clientsRouter;
