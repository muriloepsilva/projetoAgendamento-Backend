import { mandatoryFields } from "../../../utils/constants.js";
import TesteRepository from "../repository/testeRepository.js";

export default class TesteService {
  constructor(repository = new TesteRepository()) {
    this.repository = repository;
  }
  async teste({ nome, idade }) {
    if (!nome) throw new Error(mandatoryFields("nome"));
    if (!idade) throw new Error(mandatoryFields("idade"));

    return `Seu nome é: ${nome} e você tem ${idade} anos`;
  }

  async testeChamadaBanco({ id }) {
    if (!id) throw new Error(mandatoryFields("id"));
    const arrayIds = Array.isArray(id) ? id : [id];

    return this.repository.testeChamadaBanco("projetoAgendamento", arrayIds);
  }
}
