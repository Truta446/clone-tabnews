import { Client } from "pg";

const query = async (queryObject) => {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();
  const result = await client.query(queryObject);
  client.end();
  return result;
};

export default {
  query: query,
};
