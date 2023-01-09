import { Router } from "express";

import ordersSchema from "../schemas/orders.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createOrder } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateSchema(ordersSchema), createOrder);

export default ordersRouter;
