const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Definimos la ruta POST para el login
// La URL final será: http://localhost:3000/api/auth/login
router.post("/login", authController.login);

module.exports = router;
