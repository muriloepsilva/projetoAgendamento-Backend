import bcrypt from "bcrypt";

export async function encryptPassword(senha) {
  return bcrypt.hash(senha, 10);
}

export function buildUpdate(data) {
  let setQuery = "";
  const whereQuery = `\nWHERE id = ${data.id};`;
  const setRegExp = new RegExp(/\bSET\b/);

  for (const key in data) {
    if (key === "id") continue;
    if (setRegExp.test(setQuery)) setQuery += `${key}="${data[key]}", `;
    else setQuery += `SET ${key}="${data[key]}", `;
  }
  setQuery = setQuery.slice(0, -2);

  return { setQuery, whereQuery };
}
