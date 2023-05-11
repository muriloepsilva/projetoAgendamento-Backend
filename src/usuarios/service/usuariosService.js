import UsuariosRepository from "../repository/usuariosRepository.js";
import {
  dateFormats,
  fields,
  mandatoryFields,
  userAlreadyInDB,
} from "../../../utils/constants.js";
import { buildUpdate, encryptPassword } from "../../../utils/functions.js";
import DataFormatter from "../../../infra/dataformatter.js";

export default class UsuariosService {
  constructor(usuariosRepository = new UsuariosRepository()) {
    this.repository = usuariosRepository;
  }

  async insertUsuario({ nome, email, senha, dataNascimento }) {
    if (!nome) throw new Error(mandatoryFields(fields.nome));
    if (!email) throw new Error(mandatoryFields(fields.email));
    if (!senha) throw new Error(mandatoryFields(fields.senha));
    if (!dataNascimento) throw new Error(mandatoryFields(fields.dataNasc));

    const userEmailExists = await this.verifyUserByEmail(email);
    if (userEmailExists) throw new Error(userEmailExists.message);

    const senhaEncriptada = await encryptPassword(senha);

    const insertData = [nome, dataNascimento, email, senhaEncriptada];

    await this.repository.insertUsuario(insertData);
  }

  async listUserById({ id }) {
    if (!id) throw new Error(mandatoryFields(fields.id));

    const user = await this.repository.selectUserById(id);
    user.dataNascimento = DataFormatter.format(
      user.dataNascimento,
      dateFormats.formatoBrPadrao
    );

    return user;
  }

  async listUsers() {
    const users = await this.repository.listUsers();

    users.forEach((user) => {
      user.dataNascimento = DataFormatter.format(
        user.dataNascimento,
        dateFormats.formatoBrPadrao
      );
    });

    return users;
  }

  async updateUser({ body }) {
    let qtdError = 0;
    let qtdSuccess = 0;
    const error = [];

    const bodyArray = Array.isArray(body) ? body : [body];

    for (const user of bodyArray) {
      if (!user.id) throw new Error(mandatoryFields(fields.id));
      if (!user.email) throw new Error(mandatoryFields(fields.email));

      const emailExists = await this.verifyUserByEmail(user.email);
      if (emailExists) {
        qtdError += 1;
        error.push(user);
      } else {
        if (user.senha) user.senha = await encryptPassword(user.senha);
        const { setQuery, whereQuery } = buildUpdate(user);
        await this.repository.updateUser({
          setQuery,
          whereQuery,
        });
        qtdSuccess += 1;
      }
    }

    return { qtdError, qtdSuccess, error };
  }

  async deleteUser({ id }) {
    if (!id) throw new Error(mandatoryFields(fields.id));
    const idsArray = Array.isArray(id) ? id : [id];
    let qtdErro = 0;
    let qtdSucesso = 0;

    for (const id of idsArray) {
      const deletedUser = await this.repository.deleteUser(id);

      if (deletedUser.affectedRows > 0) {
        qtdSucesso += 1;
      } else {
        qtdErro += 1;
      }
    }

    return { qtdErro, qtdSucesso };
  }

  async verifyUserByEmail(email) {
    const allUsers = await this.repository.selectUsuariosEmails();

    const usuarioCadastrado = allUsers.filter(
      (userEmail) => userEmail.email === email
    );

    if (usuarioCadastrado.length > 0) {
      return { message: userAlreadyInDB };
    }

    return null;
  }
}
