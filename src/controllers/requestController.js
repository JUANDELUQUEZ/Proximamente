const Request = require("../models/Request");

// Crear solicitud (Para el formulario de contacto)
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    res.status(500).send("Error al guardar solicitud");
  }
};

// Obtener todas (Solo admin)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ fecha: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).send("Error al obtener datos");
  }
};

// Actualizar estatus (Solo admin)
exports.updateStatus = async (req, res) => {
  try {
    const { estatus } = req.body;
    let request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ msg: "Solicitud no encontrada" });

    request.estatus = estatus;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send("Error al actualizar");
  }
};

// Eliminar solicitud (Solo admin)
exports.deleteRequest = async (req, res) => {
  try {
    let request = await Request.findById(req.params.id);
    if (!request)
      return res.status(404).json({ msg: "Solicitud no encontrada" });

    await Request.findByIdAndDelete(req.params.id);
    res.json({ msg: "Solicitud eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar");
  }
};
