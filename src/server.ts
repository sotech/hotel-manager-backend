import express from "express";
import mongo from "./utils/mongoConnection";

const app = express();
import userRoutes from "./routes/user";
const port = process.env.PORT || 8000

app.use(express.json());
app.use("/user", userRoutes);

mongo();

app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
})