import {
  badRequest,
  created,
  noContent,
  ok,
} from "../../../utils/responsesCodes.js";
import UsuariosService from "../service/usuariosService.js";

export default class UsuariosController {
  constructor(service = new UsuariosService()) {
    this.service = service;
  }

  async insertUsuario({ body }) {
    const { nome, email, senha, dataNascimento } = body;
    try {
      await this.service.insertUsuario({
        nome,
        email,
        senha,
        dataNascimento,
      });

      return created();
    } catch (err) {
      return badRequest(err.message);
    }
  }

  async listUserById({ params }) {
    const { id } = params;
    try {
      const data = await this.service.listUserById({ id });

      if (data.length === 0) return noContent();

      return ok(data);
    } catch (err) {
      return badRequest(err.message);
    }
  }

  async listUsers() {
    try {
      const data = await this.service.listUsers();

      if (data.length === 0) return noContent();

      return ok(data);
    } catch (err) {
      return badRequest(err.message);
    }
  }

  async updateUser({ body }) {
    try {
      const { qtdError, qtdSuccess, error } = await this.service.updateUser({
        body,
      });

      if (qtdError > 0 && qtdSuccess === 0)
        return badRequest({ qtdError, error });
      if (qtdError > 0 && qtdSuccess > 0)
        return ok({ qtdError, qtdSuccess, error });

      if (qtdSuccess > 0 && qtdError === 0) return ok({ qtdSuccess });

      return badRequest("Erro ao atualizar o(s) usuário(s)");
    } catch (err) {
      return badRequest(err.message);
    }
  }

  async deleteUser({ body }) {
    const { id } = body;
    try {
      const { qtdErro, qtdSucesso } = await this.service.deleteUser({ id });

      if (qtdErro > 0 && qtdSucesso === 0)
        return badRequest("Falha ao deletar o(s) usuário(s)");

      return ok({ qtdSucesso, qtdErro });
    } catch (err) {
      return badRequest(err.message);
    }
  }
}
