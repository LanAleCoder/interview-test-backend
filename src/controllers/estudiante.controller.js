const Estudiante = require("../models/estudiante.model");

function agregarEstudiante(req, res) {
  let parametros = req.body;
  let estudianteModel = new Estudiante();
  let fecha = new Date();
  let fechaNacimientoToDate = new Date(parametros.fechaNacimiento);
  let diasParaSumar = new Date();
  let ultimoDia = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).toLocaleDateString();
  let diaParaModificar = new Date();
  let años = fecha.getFullYear() - fechaNacimientoToDate.getFullYear();
  //Paso la fecha a formato mas entendible
  if (
    parametros.nombre &&
    parametros.carnet &&
    parametros.genero &&
    parametros.telefono &&
    parametros.fechaNacimiento &&
    parametros.carrera &&
    parametros.generoPoesia &&
    parametros.direccion
  ) {
    Estudiante.find({ nombre: parametros.nombre }, (err, usuarioEncontrado) => {
      //Busca el nombre que el usuario provee y busca en toda la base de datos si existe uno igual
      if (usuarioEncontrado.length > 0) {
        return res
          .status(400)
          .send({ mensaje: "Este nombre ya ha sido utilizado" });
      } else {
        Estudiante.find(
          { carnet: parametros.carnet },
          (err, carnetEncontrado) => {
            //Busca el carnet que el usuario provee y busca en toda la base de datos si ya se ha usado ese carnet
            if (carnetEncontrado.length > 0)
              return res
                .status(400)
                .send({ mensaje: "Este carnet ya ha sido usado" });
            estudianteModel.nombre = parametros.nombre;
            estudianteModel.carnet = parametros.carnet;
            estudianteModel.genero = parametros.genero;
            estudianteModel.telefono = parametros.telefono;
            if (
              fecha.getFullYear() - fechaNacimientoToDate.getFullYear() >
              17
            ) {
              estudianteModel.fechaNacimiento = parametros.fechaNacimiento;
            } else {
              return res
                .status(400)
                .send({ mensaje: "Debes tener mas de 17 años" });
            }
            if (
              parametros.carnet.charAt(parametros.carnet.length - 1) == "1" &&
              parametros.generoPoesia === "Dramatico"
            ) {
              estudianteModel.fechaDeclamacion = new Date(
                calcularDiasSinFinDeSemana(diasParaSumar, 5)
              ).toLocaleDateString();
            } else if (
              parametros.carnet.charAt(parametros.carnet.length - 1) == "3" &&
              parametros.generoPoesia === "Epico"
            ) {
              estudianteModel.fechaDeclamacion = ultimoDia;
            } else {
              for (let i = diaParaModificar.getDay(); i < 6; i++) {
                diaParaModificar.setDate(diaParaModificar.getDate() + 1);
                estudianteModel.fechaDeclamacion =
                  diaParaModificar.toLocaleDateString();
              }
            }
            estudianteModel.carrera = parametros.carrera;
            estudianteModel.generoPoesia = parametros.generoPoesia;
            estudianteModel.direccion = parametros.direccion;
            //A la fecha de inscripcion le asigno el valor de la variable que contiene la fecha entendible
            estudianteModel.fechaInscripcion = fecha;
            //Valido que el carnet no sea mas de 6
            if (parametros.carnet.length > 6) {
              return res.status(400).send({
                mensaje: "La longitud maxima del carnet es de 6 caracteres",
              });
            } // Valido que el carnet empiece con A mayuscula
            else if (parametros.carnet.charAt(0) !== "A") {
              return res
                .status(400)
                .send({ mensaje: "El carnet debe empezar por A mayuscula" });
            } //Valido que el tercer digito del carnet sea 5
            else if (parametros.carnet.charAt(2) !== "5") {
              return res.status(400).send({
                mensaje: "El tercer numero del carnet debe empezar por 5",
              });
            } /* Valido que el ultimo digito del carnet sea 1, 3 o 9, tomando 
            en cuenta que no me toma el operador or "||" utilice el operador y &&
            que tiene mas logica ya que si uso or seria lo siguiente:
            si la ultima letra del string no es 1 y no es 3 y no es 9 me tiene que 
            dar un error ya que tiene que tenerminar en esos 3 posibles numeros
            y si fuera o seria asi, si el ultimo numero del carnet no es 1 o no es 3 o no es 9
            me tiene que mostrar el mensaje cosa que para mi no suena con tanta logica aunque 
            aun no lo entiendo bien
            */ else if (
              parametros.carnet.charAt(parametros.carnet.length - 1) !== "1" &&
              parametros.carnet.charAt(parametros.carnet.length - 1) !== "3" &&
              parametros.carnet.charAt(parametros.carnet.length - 1) !== "9"
            ) {
              return res
                .status(400)
                .send({ mensaje: "El carnet debe terminar con 1, 3 o 9" });
            } else if (parametros.carnet.search("0") !== -1) {
              return res
                .status(400)
                .send({ mensaje: "El carnet no puede contener el numero 0" });
            }
            if (años > 17) {
              estudianteModel.edad = años;
            } else {
              return res
                .status(400)
                .send({ mensaje: "Debe ser mayor de 17 años" });
            }
            estudianteModel.save((err, participacionGuardada) => {
              return res.send({ participacion: participacionGuardada });
            });
          }
        );
      }
    });
  } else {
    return res
      .status(400)
      .send({ mensaje: "Debe enviar los parametros obligatorios" });
  }
}

function sumarDias(fecha, dias) {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

function calcularDiasSinFinDeSemana(fecha, diasAdd) {
  for (var i = 0; i < diasAdd; i++) {
    var diaInvalido = false;
    fecha.setDate(fecha.getDate() + 1); // Sumamos de dia en dia
    if (fecha.getDay() === 0 || fecha.getDay() === 6) {
      // Verificamos si es sábado o domingo
      console.log(fecha.getDate() + " es sábado o domingo (Sumamos un dia)");
      diaInvalido = true;
    }
    if (diaInvalido) diasAdd++; // Si es fin de semana o festivo le sumamos un dia
  }
  return (
    fecha.getFullYear() +
    "/" +
    (fecha.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    fecha.getDate().toString().padStart(2, "0")
  );
}

function verSolicitudes(req, res) {
  Estudiante.find({}, (err, estudiantesEncontrados) => {
    return res.status(200).send({ Solicitudes: estudiantesEncontrados });
  });
}

module.exports = { agregarEstudiante, verSolicitudes };
