import { describe, expect, test } from "vitest";
import UsuariosRepositoryInMemory from "../repository/usuariosRepositoryInMemory";
import UsuariosService from "../service/usuariosService";
import { mandatoryFields } from "../../../utils/constants";

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
      ).rejects.toThrow(new Error(mandatoryFields("nome")));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "",
          senha: "senha",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(mandatoryFields("email")));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "useremail@email.com",
          senha: "",
          dataNascimento: "2023-04-25",
        })
      ).rejects.toThrow(new Error(mandatoryFields("senha")));

      await expect(
        service.insertUsuario({
          nome: "User Name",
          email: "useremail@email.com",
          senha: "senha",
          dataNascimento: "",
        })
      ).rejects.toThrow(new Error(mandatoryFields("dataNascimento")));
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
      ).rejects.toThrow(new Error("Usuário já cadastrado!"));
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
      ).rejects.toThrow(new Error(mandatoryFields("id")));
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
});
