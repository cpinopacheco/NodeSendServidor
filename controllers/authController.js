const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res, next) => {
  //Revisar si ahy errores
  //Mostrar mensajes de error de express validator
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Buscar el usuario para ver si esta registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  console.log(usuario);

  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    return next();
  }

  //Verificar el password y autenticar el usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    //Crear un JWT : Json Web Token
    // 1- Creamos el jwt con el nombre del usuario
    // 2- El segundo parámetro es una llave privada o secreta, se recomienda que vaya en variables de entorno
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "24hrs",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ msg: "Password incorrecto" });
  }
};

exports.usuarioAutenticado = (req, res, next) => {
  res.json({ usuario: req.usuario });
};
