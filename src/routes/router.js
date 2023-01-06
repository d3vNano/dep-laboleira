import { Router } from "express";

import cakesRouter from "./cakes.routes.js";
import clientsRouter from "./clients.routes.js";

const router = Router();

router.use(cakesRouter);
router.use(clientsRouter);

export default router;
