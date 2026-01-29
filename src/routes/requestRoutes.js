const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const auth = require("../middlewares/authMiddleware");

// Público: Cualquiera puede crear una solicitud
router.post("/", requestController.createRequest);

// Privado: Solo admin puede ver, editar estatus o borrar (llevan middleware 'auth')
router.get("/", auth, requestController.getAllRequests);
router.put("/:id", auth, requestController.updateStatus);
router.delete("/:id", auth, requestController.deleteRequest);

module.exports = router;
