const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso denegado" });
  }

  // Validar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no es válido" });
  }
};
