import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";

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

  // Relationships of Product and User
  User.hasMany(Product, {foreignKey: "userId"})
  Product.belongsTo(User, {foreignKey: "userId"})

// Relationships of Product and Category

Category.hasOne(Product, {foreignKey: "categoryId"})
Product.belongsTo(Category, {foreignKey: "categoryId"})

export default sequelize;