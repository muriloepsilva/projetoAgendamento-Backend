import { mysqlQueryFunction } from "../../../infra/mysqlQuery.js";

export default class UsuariosRepository {
  async selectUsuariosEmails() {
    return mysqlQueryFunction(`SELECT email FROM usuarios`);
  }

  async insertUsuario(data) {
    mysqlQueryFunction(
      `INSERT INTO usuarios
        (nome, dataNascimento, email, senha)
        VALUES(?,?, ?, ?);`,
      data
    );
  }

  async selectUserById(id) {
    const responseDb = await mysqlQueryFunction(
      `SELECT id, nome, dataNascimento, email FROM usuarios
    WHERE id = ?`,
      id
    );

    return responseDb[0];
  }

  async listUsers() {
    return mysqlQueryFunction(
      `SELECT id, nome, dataNascimento, email FROM usuarios`
    );
  }

  async updateUser({ setQuery, whereQuery }) {
    return mysqlQueryFunction(`UPDATE usuarios ${setQuery} ${whereQuery}`);
  }
}
