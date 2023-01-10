import { Router } from "express";

import clientsSchema from "../schemas/clients.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
    createClient,
    listAClientOrders,
} from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientsSchema), createClient);
clientsRouter.get("/clients/:id/orders", listAClientOrders);

export default clientsRouter;
