const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();
//Conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.j0jig.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion con la base de datos correcta");

    app.listen(process.env.PORT || 3000, () => {});
  })
  .catch((error) => console.log(error));
