const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  estatus: {
    type: String,
    default: "Pendiente",
    enum: ["Pendiente", "Contactado", "Finalizado"],
  },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
