import { describe, expect, test } from "vitest";
import { mysqlQueryFunction } from "../../../infra/mysqlQuery";
import TesteRepository from "../repository/testeRepository";
import { mockUsuario, mockUsuarioDatabase } from "../utils/mock";

const sut = () => {
  const repository = new TesteRepository();

  return { repository };
};

describe("Testes da classe TesteRepository", () => {
  describe("testeChamadaBanco", () => {
    test("Esse tem que retornar os dados do usuário pelo id", async () => {
      const { repository } = sut();

      const response = await repository.testeChamadaBanco(
        "projetoAgendamento",
        1
      );

      expect(response).toEqual(mockUsuarioDatabase);
    });
  });
});
