import mysql from "mysql2";
import { config } from "dotenv-safe";
config();

const configDb = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
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
