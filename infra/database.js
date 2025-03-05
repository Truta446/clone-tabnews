import { Client } from "pg";
import { ServiceError } from "infra/errors.js";

const query = async (queryObject) => {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      cause: error,
      message: "Erro na conexão com o banco ou na query.",
    });
    throw serviceErrorObject;
  } finally {
    await client?.end();
  }
};

const getNewClient = async () => {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });

  await client.connect();

  return client;
};

const database = {
  query,
  getNewClient,
};

export default database;
