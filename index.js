const mongoose = require("mongoose");
const app = require("./app");

//Conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/Interview", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion con la base de datos correcta");

    app.listen(3000, () => {});
  })
  .catch((error) => console.log(error));
