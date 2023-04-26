import { describe, expect, test, vitest } from "vitest";
import UsuariosController from "../controller/usuariosController";
import UsuariosService from "../service/usuariosService";
import {
  badRequest,
  created,
  noContent,
  ok,
} from "../../../utils/responsesCodes";
import { mandatoryFields } from "../../../utils/constants";
import { mockUsuario, mockUsuariosDatabase } from "../utils/mock";

const sut = ({ method, serviceFn }) => {
  const controller = new UsuariosController();
  const service = vitest
    .spyOn(UsuariosService.prototype, method)
    .mockImplementation(serviceFn);

  return { controller, service };
};

describe("Testes da classe UsuariosController", () => {
  describe("insertUsuario", () => {
    test("Esse tem que retornar status 201", async () => {
      const { controller, service } = sut({
        method: "insertUsuario",
        serviceFn: () => {},
      });

      const response = await controller.insertUsuario({
        body: {
          nome: "USER NAME",
          email: "useremail@email.com",
          senha: "123",
          dataNascimento: "2005-03-28",
        },
      });

      expect(response).toEqual(created());
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse tem que retornar status 400 porque a service lançou alguma exceção", async () => {
      const { controller, service } = sut({
        method: "insertUsuario",
        serviceFn: () => {
          throw new Error(mandatoryFields("nome"));
        },
      });

      const response = await controller.insertUsuario({
        body: {
          nome: null,
          email: "useremail@email.com",
          senha: "123",
          dataNascimento: "2005-03-28",
        },
      });

      expect(response).toEqual(badRequest(mandatoryFields("nome")));
      expect(service).toHaveBeenCalledTimes(1);
    });
  });

  describe("listUserById", () => {
    test("Esse tem que retornar status 204", async () => {
      const { controller, service } = sut({
        method: "listUserById",
        serviceFn: () => [],
      });

      const response = await controller.listUserById({
        params: { id: 1 },
      });

      expect(response).toEqual(noContent());
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse tem que retornar status 200", async () => {
      const { controller, service } = sut({
        method: "listUserById",
        serviceFn: () => mockUsuario,
      });

      const response = await controller.listUserById({
        params: { id: 1 },
      });

      expect(response).toEqual(ok(mockUsuario));
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse tem que retornar status 400 porque a service laçou uma exceção", async () => {
      const { controller, service } = sut({
        method: "listUserById",
        serviceFn: () => {
          throw new Error(mandatoryFields("id"));
        },
      });

      const response = await controller.listUserById({
        params: { id: undefined },
      });

      expect(response).toEqual(badRequest(mandatoryFields("id")));
      expect(service).toHaveBeenCalledTimes(1);
    });
  });

  describe("listUsers", () => {
    test("Esse tem que retornar status 204", async () => {
      const { controller, service } = sut({
        method: "listUsers",
        serviceFn: () => [],
      });

      const response = await controller.listUsers();

      expect(response).toEqual(noContent());
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse tem que retornar status 200 com os usuários cadastrados no banco", async () => {
      const { controller, service } = sut({
        method: "listUsers",
        serviceFn: () => mockUsuariosDatabase,
      });

      const response = await controller.listUsers();

      expect(response).toEqual(ok(mockUsuariosDatabase));
      expect(service).toHaveBeenCalledTimes(1);
    });

    test("Esse tem que retornar status 400 por algum erro durante a execução", async () => {
      const { controller, service } = sut({
        method: "listUsers",
        serviceFn: () => {
          throw new Error("Erro");
        },
      });

      const response = await controller.listUsers();

      expect(response).toEqual(badRequest("Erro"));
      expect(service).toHaveBeenCalledTimes(1);
    });
  });
});
