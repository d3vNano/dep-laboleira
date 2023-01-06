import { Router } from "express";

import cakesRouter from "./cakes.routes.js";

const router = Router();

router.use(cakesRouter);

export default router;
