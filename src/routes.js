import { Router } from "express";
import { testeRouter } from "./teste/routes.js";

const router = Router();

router.use("/teste", testeRouter);

export { router };
