import { describe, expect, test } from "vitest";
import TesteService from "../service/testeService";
import { mandatoryFields } from "../../../utils/constants";
import TesteRepositoryInMemory from "../repository/testeRepositoryInMemory";
import { mockUsuario } from "../utils/mock";

const sut = () => {
  const repository = new TesteRepositoryInMemory();
  const service = new TesteService(repository);

  return { service };
};

describe("Testes da classe TesteService", () => {
  describe("teste", () => {
    test("Esse tem que lançar uma exceção por não receber o nome", async () => {
      const { service } = sut();

      await expect(
        service.teste({ nome: undefined, idade: 18 })
      ).rejects.toThrow(mandatoryFields("nome"));
    });

    test("Esse tem que lançar uma exceção por não receber a idade", async () => {
      const { service } = sut();

      await expect(
        service.teste({ nome: "Murilo", idade: null })
      ).rejects.toThrow(mandatoryFields("idade"));
    });

    test("Esse tem que retornar a frase", async () => {
      const { service } = sut();

      const response = await service.teste({ nome: "Murilo", idade: 18 });

      expect(response).toEqual("Seu nome é: Murilo e você tem 18 anos");
    });
  });

  describe("testeChamadaBanco", () => {
    test("Esse tem que lançar uma exceção por não ter recebido o id", async () => {
      const { service } = sut();

      await expect(service.testeChamadaBanco({ id: null })).rejects.toThrow(
        new Error(mandatoryFields("id"))
      );
    });

    test("Esse tem que retornar os dados do usuário", async () => {
      const { service } = sut();

      const response = await service.testeChamadaBanco({ id: 1 });
      expect(response).toEqual(mockUsuario);

      const responseArray = await service.testeChamadaBanco({ id: [1] });
      expect(responseArray).toEqual(mockUsuario);
    });
  });
});
