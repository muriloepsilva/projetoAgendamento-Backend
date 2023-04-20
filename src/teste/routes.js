import { Router } from "express";
import adaptRoute from "../../infra/adaptRoute.js";
import TesteController from "./controller/testeController.js";

const testeRouter = Router();
const testeController = new TesteController();

testeRouter.get("/", adaptRoute.expressRoute(testeController, "teste"));
testeRouter.get(
  "/testeBd/:id",
  adaptRoute.expressRoute(testeController, "testeChamadaBanco")
);

export { testeRouter };
