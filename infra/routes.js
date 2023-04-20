import { Router } from "express";
import { testeRouter } from "../src/teste/routes.js";

const router = Router();

router.use("/teste", testeRouter);

export { router };
