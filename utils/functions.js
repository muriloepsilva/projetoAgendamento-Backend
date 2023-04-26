import bcrypt from "bcrypt";

export async function encryptPassword(senha) {
  return bcrypt.hash(senha, 10);
}
