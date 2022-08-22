const express = require("express");
const cors = require("cors");
const app = express();

//Importacion de rutas
const estudiantesRoutes = require("./src/routes/estudiante.routes");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cabeceras
app.use(cors());

app.use("/api", estudiantesRoutes);

module.exports = app;
