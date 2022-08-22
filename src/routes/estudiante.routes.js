const express = require("express");
const estudianteController = require("../controllers/estudiante.controller");
const api = express.Router();

api.post("/participar", estudianteController.agregarEstudiante);
api.get("/verSolicitudes", estudianteController.verSolicitudes);

module.exports = api;
