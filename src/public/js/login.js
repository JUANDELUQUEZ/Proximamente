const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // OJO: El backend espera 'username', no 'email'.
  // Usamos el valor del campo email como username para que coincida con el backend.
  const username = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const data = { username, password };

  try {
    // CAMBIO IMPORTANTE: Usamos ruta relativa "/api/..." en lugar de "http://localhost..."
    // Esto asegura que funcione tanto en tu compu como cuando lo subas a internet.
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("token", result.token);

      document.getElementById("loginMessage").style.color = "#4cd137";
      document.getElementById("loginMessage").innerText =
        "Login correcto. Redirigiendo...";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      document.getElementById("loginMessage").style.color = "red";
      document.getElementById("loginMessage").innerText =
        result.msg || "Credenciales incorrectas";
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    document.getElementById("loginMessage").innerText =
      "Error al conectar con el servidor.";
  }
});
