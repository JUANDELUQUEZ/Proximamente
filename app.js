const express = require("express");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./src/config/database");

// Rutas importadas
const authRoutes = require("./src/routes/authRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

// Conectar DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());


// Usamos path.join para que funcione en la nube local
app.use(express.static(path.join(__dirname, "src/public")));

// Definir rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);


// Si alguien entra a la raíz '/', le enviamos el index.html a la fuerza
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public", "index.html"));
});

module.exports = app;
/*  */
