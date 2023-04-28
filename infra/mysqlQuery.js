import mysql from "mysql2";
import { config } from "dotenv-safe";
config();

const configDb = {
  host: process.env.HOSTDATABASE,
  user: process.env.USERDATABASE,
  password: process.env.PASSWORDDATABASE,
  database: process.env.DATABASENAME,
};

export async function mysqlQueryFunction(query, params) {
  const conn = mysql.createConnection(configDb);

  if (params) {
    return conn
      .promise()
      .query(query, params)
      .then((res) => res[0])
      .catch((err) => {
        throw new Error(err);
      });
  }
  return conn
    .promise()
    .query(query)
    .then((res) => res[0])
    .catch((err) => {
      throw new Error(err);
    });
}
