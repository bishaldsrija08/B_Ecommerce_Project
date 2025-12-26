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

// Importing Routes
import userRoutes from './routes/userRoutes'
app.use("/api", userRoutes)

import adminSeeder from "./adminSeeder";
// admin Seeder
adminSeeder();

app.get("/", (req: Request, res: Response) => {
    res.send("Bye HII!");
});

const PORT:number = Number(process.env.PORT) || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})