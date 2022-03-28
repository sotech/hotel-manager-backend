import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongo from "./utils/mongoConnection";
import morgan from 'morgan';
import userRoutes from "./routes/user";

const app = express();
const port = process.env.PORT || 8000
app.use(morgan('dev'));
app.use(express.json());
app.use("/user", userRoutes);

mongo();

app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
})