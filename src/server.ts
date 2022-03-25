import express from "express";
const app = express();
import userRoutes from "./routes/user";
const port = process.env.PORT || 8000
app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
})