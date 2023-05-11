import { mandatoryFields } from "../../../utils/constants.js";

export default class TesteService {
  async teste({ nome, idade }) {
    if (!nome) throw new Error(mandatoryFields("nome"));
    if (!idade) throw new Error(mandatoryFields("idade"));

    return `Seu nome é: ${nome} e você tem ${idade} anos`;
  }
}
