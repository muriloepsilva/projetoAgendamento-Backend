import { mysqlQueryFunction } from "../../../infra/mysqlQuery.js";
import { databaseName } from "../../../utils/constants.js";

export default class UsuariosRepositoryInMemory {
  constructor() {
    this.users = [
      {
        id: 1,
        nome: "User Name",
        email: "useremail@email.com",
        data_nascimento: "2004-09-13",
      },
      {
        id: 2,
        nome: "User Name2",
        email: "useremail2@email.com",
        data_nascimento: "2005-03-28",
      },
    ];
  }

  async selectUsuariosEmails() {
    return this.users.map((user) => {
      return { email: user.email };
    });
  }

  async insertUsuario() {}

  async selectUserById() {
    return this.users[0];
  }

  async listUsers() {
    return this.users;
  }
}
