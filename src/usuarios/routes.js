import { Router } from "express";
import UsuariosController from "./controller/usuariosController.js";
import adaptRoute from "../../infra/adaptRoute.js";

const usuariosRouter = Router();
const usuariosController = new UsuariosController();

usuariosRouter.post(
  "/inserir",
  adaptRoute.expressRoute(usuariosController, "insertUsuario")
);

usuariosRouter.get(
  "/getById/:id",
  adaptRoute.expressRoute(usuariosController, "listUserById")
);

usuariosRouter.get(
  "/allUsers",
  adaptRoute.expressRoute(usuariosController, "listUsers")
);

usuariosRouter.put(
  "/updateUser",
  adaptRoute.expressRoute(usuariosController, "updateUser")
);

usuariosRouter.delete(
  "/deleteUser",
  adaptRoute.expressRoute(usuariosController, "deleteUser")
);

export { usuariosRouter };
