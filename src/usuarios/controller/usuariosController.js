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
}
