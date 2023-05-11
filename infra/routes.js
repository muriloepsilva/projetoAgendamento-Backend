import { Router } from "express";
import { testeRouter } from "../src/teste/routes.js";
import { usuariosRouter } from "../src/usuarios/routes.js";

const router = Router();

router.use("/teste", testeRouter);
router.use("/usuarios", usuariosRouter);

export { router };
