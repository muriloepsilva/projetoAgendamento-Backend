import { describe, expect, test, vitest } from "vitest";
import UsuariosRepository from "../repository/usuariosRepository";
import * as mysqlFunction from "../../../infra/mysqlQuery.js";

const sut = ({ responseDb }) => {
  const repository = new UsuariosRepository();
  const mockDatabase = vitest
    .spyOn(mysqlFunction, "mysqlQueryFunction")
    .mockImplementation(responseDb);

  return { repository, mockDatabase };
};

describe("Testes da classe UsuariosRepository", () => {
  describe("selectUsuariosEmails", () => {
    test("Esse tem que retornar os emails dos usuários cadastrados no banco de dados", async () => {
      const { repository, mockDatabase } = sut({
        responseDb: () => [
          { email: "useremail@email.com" },
          { email: "useremail2@email.com" },
        ],
      });

      const response = await repository.selectUsuariosEmails();

      expect(response).toEqual([
        { email: "useremail@email.com" },
        { email: "useremail2@email.com" },
      ]);
      expect(mockDatabase).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertUsuario", () => {
    test("Esse tem que fazer o insert do usuário e não retornar nada", async () => {
      const { repository, mockDatabase } = sut({ responseDb: () => {} });

      const response = await repository.insertUsuario({
        data: {
          nome: "nome",
          email: "useremail@email.com",
          senha: "senha",
          dataNascimento: "2023-04-25",
        },
      });

      expect(response).toBeUndefined();
      expect(mockDatabase).toHaveBeenCalledTimes(1);
    });
  });

  describe("selectUserById", () => {
    test("Esse tem que retornar o usuário de acordo com o id recebido", async () => {
      const { repository, mockDatabase } = sut({
        responseDb: () => [
          {
            id: 1,
            nome: "User Name",
            email: "useremail@email.com",
            data_nascimento: "2004-09-13",
          },
        ],
      });

      const response = await repository.selectUserById(1);

      expect(response).toEqual({
        id: 1,
        nome: "User Name",
        email: "useremail@email.com",
        data_nascimento: "2004-09-13",
      });
      expect(mockDatabase).toHaveBeenCalledTimes(1);
    });
  });

  describe("listUsers", () => {
    test("Esse tem que retornar os usuários cadastrados no banco de dados", async () => {
      const { repository, mockDatabase } = sut({
        responseDb: () => [
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
        ],
      });

      const response = await repository.listUsers();

      expect(response).toEqual([
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
      ]);
      expect(mockDatabase).toHaveBeenCalledTimes(1);
    });
  });
});
