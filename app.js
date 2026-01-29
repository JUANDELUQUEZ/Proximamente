const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");

// Rutas importadas
const authRoutes = require("./src/routes/authRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

// Conectar DB
connectDB();

// Middlewares
app.use(cors()); // Permite que el frontend de tu amigo se conecte
app.use(express.json()); // Permite leer JSON en las peticiones
app.use(express.static("src/public")); // Servir archivos estáticos (frontend)

// Definir rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

module.exports = app;
