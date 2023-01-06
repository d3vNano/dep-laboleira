import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const configDB = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
    configDB.ssl = {
        rejectUnauthorized: false,
    };
}

const connection = new Pool(configDB);

// console.log(
//     chalk.bold.green(
//         dayjs().format("YYYY-MM-DD HH:mm:ss"),
//         "[Postgres_DB] Connected!"
//     )
// );

export default connection;
