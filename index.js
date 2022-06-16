const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//el index.js tiene que estar conectado con el routing, el routing con el controlador.

//Crear el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar cors
const opcionesCors = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(opcionesCors));

console.log("Comenzando Node Send");

//Puerto de la app
const port = process.env.PORT || 4000;

//Habilitación para leer los valores de un body
app.use(express.json());

//Habilitar carpeta publica
app.use(express.static("uploads"));

//Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));
app.use("/api/archivos", require("./routes/archivos"));

//Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
