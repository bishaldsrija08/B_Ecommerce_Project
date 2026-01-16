import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Cart from "./models/cartModel";
import Order from "./models/orderMode.";
import OrderDetails from "./models/orderDetailsModel";
import Payment from "./models/paymentModel";

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

sequelize.sync({ force: true })
  .then(() => {
    console.log("Database synced");
  });

// Relationships of Product and User
User.hasMany(Product, {foreignKey: "userId"})
Product.belongsTo(User, {foreignKey: "userId"})

// Relationships of Product and Category

Category.hasOne(Product, {foreignKey: "categoryId"})
Product.belongsTo(Category, {foreignKey: "categoryId"})

// Relationships of User and Cart
User.hasMany(Cart, {foreignKey: "userId"})
Cart.belongsTo(User, {foreignKey: "userId"})

// Relationships of Product and Cart
Product.hasMany(Cart, {foreignKey: "productId"})
Cart.belongsTo(Product, {foreignKey: "productId"})

// Relationship of order and order details
Order.hasMany(OrderDetails, {foreignKey: "orderId"})
OrderDetails.belongsTo(Order, {foreignKey: "orderId"})

// Relationship of order details and product
Product.hasMany(OrderDetails, {foreignKey: "productId"})
OrderDetails.belongsTo(Product, {foreignKey: "productId"})

// Order and payment relationship
Payment.hasOne(Order, {foreignKey: "paymentId"})
Order.belongsTo(Payment, {foreignKey: "paymentId"})


// Order and user relationship
User.hasMany(Order, {foreignKey: "userId"})
Order.belongsTo(User, {foreignKey: "userId"})


export default sequelize;