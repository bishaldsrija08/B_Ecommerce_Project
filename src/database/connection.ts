import { Sequelize } from "sequelize-typescript";

const DB_NAME = process.env.DB_NAME!;
const DB_USERNAME = process.env.DB_USERNAME!;
const DB_PASSWORD = process.env.DB_PASSWORD ?? "";
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = Number(process.env.DB_PORT!);

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "mysql",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  models: [__dirname + "/models"],
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

sequelize.sync({ alter: false })
  .then(() => {
    console.log("Database synced");
  });

export default sequelize;