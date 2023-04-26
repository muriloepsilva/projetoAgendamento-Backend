import { describe, expect, test, vitest } from "vitest";
import TesteController from "../controller/testeController";
import TesteService from "../service/testeService";
import { badRequest, noContent, ok } from "../../../utils/responsesCodes";
import { mandatoryFields } from "../../../utils/constants";

const sut = ({ method, serviceFn }) => {
  const controller = new TesteController();
  const service = vitest
    .spyOn(TesteService.prototype, method)
    .mockImplementation(serviceFn);

  return { controller, service };
};

describe("Testes da TesteController", () => {
  describe("teste", () => {
    test("Esse retorna status 200 com os dados", async () => {
      const { controller, service } = sut({
        method: "teste",
        serviceFn: () => "Seu nome é: Murilo e você tem 18 anos",
      });

      const response = await controller.teste({
        headers: { nome: "Murilo" },
        body: { idade: 18 },
      });

      expect(response).toEqual(ok("Seu nome é: Murilo e você tem 18 anos"));
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse retorna status 204", async () => {
      const { controller, service } = sut({
        method: "teste",
        serviceFn: () => null,
      });

      const response = await controller.teste({
        headers: { nome: "Murilo" },
        body: { idade: 18 },
      });

      expect(response).toEqual(noContent("Retorno vazio"));
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse retorna status 400", async () => {
      const { controller, service } = sut({
        method: "teste",
        serviceFn: () => {
          throw new Error(mandatoryFields("nome"));
        },
      });

      const response = await controller.teste({
        headers: { nome: "Murilo" },
        body: { idade: 18 },
      });

      expect(response).toEqual(badRequest(mandatoryFields("nome")));
      expect(service).toHaveBeenCalledTimes(1);
    });
  });
});
