import { Router } from "express";

import ordersSchema from "../schemas/orders.schema.js";
import {
    validateSchema,
    orderRouteValidator,
} from "../middlewares/validator.middleware.js";
import { createOrder, listOrders } from "../controllers/orders.controller.js";

const ordersRouter = Router();

ordersRouter.post(
    "/order",
    validateSchema(ordersSchema),
    orderRouteValidator,
    createOrder
);

ordersRouter.get("/orders", listOrders);

export default ordersRouter;
