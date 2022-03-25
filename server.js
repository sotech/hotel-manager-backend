const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log("Servidor iniciado en 8080");
});
