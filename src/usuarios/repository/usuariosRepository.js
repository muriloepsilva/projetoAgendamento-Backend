import { mysqlQueryFunction } from "../../../infra/mysqlQuery.js";
import { databaseName } from "../../../utils/constants.js";

export default class UsuariosRepository {
  async selectUsuariosEmails() {
    return mysqlQueryFunction(`SELECT email FROM ${databaseName}.usuarios`);
  }

  async insertUsuario(data) {
    mysqlQueryFunction(
      `INSERT INTO ${databaseName}.usuarios
        (nome, data_nascimento, email, senha)
        VALUES(?,?, ?, ?);`,
      data
    );
  }

  async selectUserById(id) {
    const responseDb = await mysqlQueryFunction(
      `SELECT id, nome, data_nascimento, email FROM ${databaseName}.usuarios
    WHERE id = ?`,
      id
    );

    return responseDb[0];
  }

  async listUsers() {
    return mysqlQueryFunction(
      `SELECT id, nome, data_nascimento, email FROM ${databaseName}.usuarios`
    );
  }
}
