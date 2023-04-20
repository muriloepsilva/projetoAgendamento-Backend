import { badRequest, noContent, ok } from "../../../utils/responsesCodes.js";
import TesteService from "../service/testeService.js";

export default class TesteController {
  constructor() {
    this.service = new TesteService();
  }
  async teste({ headers, body }) {
    const { nome } = headers;
    const { idade } = body;

    try {
      const data = await this.service.teste({ nome, idade });

      if (!data) return noContent("Retorno vazio");
      return ok(data);
    } catch (err) {
      return badRequest(err.message);
    }
  }

  async testeChamadaBanco({ params }) {
    const { id } = params;
    try {
      const data = await this.service.testeChamadaBanco({ id });

      if (data.length === 0) return noContent("Sem dados no banco");

      return ok(data);
    } catch (err) {
      return badRequest(err.message);
    }
  }
}
