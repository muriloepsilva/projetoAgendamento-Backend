import { mysqlQueryFunction } from "../../../infra/mysqlQuery.js";

export default class TesteRepositoryInMemory {
  async testeChamadaBanco() {
    return [
      {
        id: 1,
        nome: "Murilo Eduardo Penha Silva",
        data_nascimento: "2005-03-28T03:00:00.000Z",
        email: "muriloepsilva@hotmail.com",
        senha: "123",
      },
    ];
  }
}
