import express from "express";
import { config } from "dotenv-safe";
import { router } from "./src/routes.js";

config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta: ${PORT}`);
});
