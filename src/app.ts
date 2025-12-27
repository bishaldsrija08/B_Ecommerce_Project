import express, {Application, Request, Response} from "express"
const app: Application = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dotenv Config
import dotenv from "dotenv";
dotenv.config();

// Database Connection
import './database/connection'

// admin Seeder
import adminSeeder from "./adminSeeder";
adminSeeder();

// Category Seeder
import categoryController from "./controllers/categoryController";
categoryController.seedCategories();

// Importing Routes
import userRoutes from './routes/userRoutes'
app.use("/", userRoutes)
import productRoutes from './routes/productRoutes'
app.use("/admin", productRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Bye HII!");
});

const PORT:number = Number(process.env.PORT) || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})