import { describe, expect, test } from "vitest";
import UsuariosRepositoryInMemory from "../repository/usuariosRepositoryInMemory";
import UsuariosService from "../service/usuariosService";
import {
  fields,
  mandatoryFields,
  userAlreadyInDB,
} from "../../../utils/constants";

const sut = () => {
  const repository = new UsuariosRepositoryInMemory();
  const service = new UsuariosService(repository);

  return { service };
};

describe("Testes da classe UsuariosService", () => {
  describe("insertUsuario", () => {
    test("Esse tem que lançar um erro por não ter recebido os dados para inserir no banco de dados", async () => {
      const { service } = sut();

      await expect(
        service.insertUsuario({
          nome: "",
          email: "useremail@email.com",
          senha: "senha",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.nome)));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "",
          senha: "senha",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.email)));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "useremail@email.com",
          senha: "",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.senha)));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "useremail@email.com",
          senha: "senha",
          dataNascimento: "",
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.dataNasc)));
    });

    test("Esse tem que lançar uma exceção por ter recebido um email que já está cadastrado no banco", async () => {
      const { service } = sut();

      await expect(
        service.insertUsuario({
          nome: "nome",
          email: "useremail2@email.com",
          senha: "senha",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(userAlreadyInDB));
    });

    test("Esse tem que fazer o insert do usuário e não retornar nada", async () => {
      const { service } = sut();

      const response = await service.insertUsuario({
        nome: "nome",
        email: "useremail3@email.com",
        senha: "senha",
        dataNascimento: "2023-04-25",
      });

      expect(response).toBeUndefined();
    });
  });

  describe("listUserById", () => {
    test("Esse tem que lançar uma exceção por não ter recebido o id", async () => {
      const { service } = sut();
      await expect(
        service.listUserById({
          id: "",
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.id)));
    });

    test("Esse tem que retornar o usuário encontrado no banco de dados de acordo com o id recebido", async () => {
      const { service } = sut();

      const response = await service.listUserById({ id: 1 });

      expect(response).toEqual({
        id: 1,
        nome: "User Name",
        email: "useremail@email.com",
        dataNascimento: "13/09/2004",
      });
    });
  });

  describe("listUsers", () => {
    test("Esse tem que retornar todos os usuários cadastrados no banco de dados", async () => {
      const { service } = sut();

      const response = await service.listUsers();

      expect(response).toEqual([
        {
          id: 1,
          nome: "User Name",
          email: "useremail@email.com",
          dataNascimento: "13/09/2004",
        },
        {
          id: 2,
          nome: "User Name2",
          email: "useremail2@email.com",
          dataNascimento: "28/03/2005",
        },
      ]);
    });
  });

  describe("updateUser", () => {
    test("Esse tem que lançar uma exceção por não ter recebido o email e o id", async () => {
      const { service } = sut();

      await expect(
        service.updateUser({
          body: {
            id: 1,
            nome: "Jane Doe",
          },
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.email)));

      await expect(
        service.updateUser({
          body: [
            {
              nome: "Jane Doe",
              email: "useremail@email.com",
            },
          ],
        })
      ).rejects.toThrow(new Error(mandatoryFields(fields.id)));
    });

    test("Esse tem que retornar a quantidade de erros, os erros e a quantidade de sucessos", async () => {
      const { service } = sut();

      const serviceResponse = await service.updateUser({
        body: [
          {
            id: 1,
            email: "useremail@email.com",
            senha: "senha",
          },
          {
            id: 2,
            email: "useremail3@email.com",
            senha: "senha",
          },
        ],
      });
      expect(serviceResponse).toEqual({
        error: [
          {
            id: 1,
            email: "useremail@email.com",
            senha: "senha",
          },
        ],
        qtdError: 1,
        qtdSuccess: 1,
      });
    });
  });

  describe("deleteUser", () => {
    test("Esse tem que lançar uma esceção por não ter recebido o id", async () => {
      const { service } = sut();

      await expect(service.deleteUser({})).rejects.toThrow(
        new Error(mandatoryFields(fields.id))
      );
    });

    test("Esse tem que retornar a quantidade de erros e a quantidade de sucessos", async () => {
      const { service } = sut();

      const requestIds = [1, 3];

      const response = await service.deleteUser({ id: requestIds });
      expect(response).toEqual({ qtdErro: 1, qtdSucesso: 1 });

      const response2 = await service.deleteUser({ id: requestIds[1] });
      expect(response2).toEqual({ qtdErro: 1, qtdSucesso: 0 });
    });
  });
});
