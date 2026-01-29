require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Verificar si ya existe admin
    const exist = await User.findOne({ username: "admin" });
    if (exist) {
      console.log("El usuario admin ya existe");
      process.exit();
    }

    // Crear usuario admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt); // Contraseña: 123456

    const newUser = new User({
      username: "admin",
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Usuario Admin creado: user: admin, pass: 123456");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

initDB();
