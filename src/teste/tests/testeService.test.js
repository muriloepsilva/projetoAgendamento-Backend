import { describe, expect, test } from "vitest";
import TesteService from "../service/testeService";
import { mandatoryFields } from "../../../utils/constants";

const sut = () => {
  const service = new TesteService();

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
});
