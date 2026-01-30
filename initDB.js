require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

// Definir usuarios en lista
const usuariosParaCrear = [
  {
    username: "admin@gmail.com",
    password: "123456",
  },
  {
    username: "juan@gmail.com", // correo de ejemplo
    password: "J1123971353d##", // contraseña de ejemplo
  },
  {
    username: "kevin@gmail.com", // compañero Kevin
    password: "123456789KE", // contraseña de ejemplo
  },
];

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("--- Conectado a MongoDB ---");

    // Recorremos la lista de usuarios uno por uno
    for (const usuario of usuariosParaCrear) {
      // Verificamos si YA existe para no duplicarlo
      const exist = await User.findOne({ username: usuario.username });

      if (exist) {
        console.log(`⚠️ El usuario ${usuario.username} ya existe. Saltando...`);
      } else {
        // Si no existe, ENCRIPTAMOS la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(usuario.password, salt);

        // Creamos el usuario
        const newUser = new User({
          username: usuario.username,
          password: hashedPassword,
        });

        await newUser.save();
        console.log(`✅ Usuario creado con éxito: ${usuario.username}`);
      }
    }

    console.log("--- Proceso finalizado ---");
    process.exit();
  } catch (err) {
    console.error("Error en el proceso:", err);
    process.exit(1);
  }
};

initDB();
