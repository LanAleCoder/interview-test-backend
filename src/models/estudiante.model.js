const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let estudianteSchema = new Schema({
  nombre: String,
  carnet: String,
  genero: String,
  telefono: String,
  fechaNacimiento: String,
  carrera: String,
  generoPoesia: String,
  direccion: String,
  fechaDeclamacion: String,
  fechaInscripcion: Date,
  edad: String,
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
