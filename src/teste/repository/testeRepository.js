import { mysqlQueryFunction } from "../../../infra/mysqlQuery.js";

export default class TesteRepository {
  async testeChamadaBanco(database, id) {
    return mysqlQueryFunction(
      `SELECT * FROM ${database}.usuarios WHERE id = ?`,
      id
    );
  }
}
