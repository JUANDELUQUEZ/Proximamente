const requestForm = document.getElementById("requestForm");

requestForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    mensaje: document.getElementById("mensaje").value,
  };

  try {
    const response = await fetch("/api/requests", {
    
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      document.getElementById("formResponse").innerText =
        "¡Solicitud enviada con éxito!";
      requestForm.reset();
    } else {
      document.getElementById("formResponse").innerText = "Error al enviar.";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
