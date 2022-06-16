const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    //Obtener el token
    //split separa el contenido donde encuentra espacios y lo convierte en arreglo, le decimos que tome lo que hay en la posición 1
    const token = authHeader.split(" ")[1];

    //Comprobar el JWT
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);

      req.usuario = usuario;
    } catch (error) {
      console.log(error);
      console.log("JWT no valido");
    }
  }

  //el return next() es decirle que una vez que termine la ejecución vaya al siguiente middleware
  return next();
};
