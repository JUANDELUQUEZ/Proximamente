const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const data = { email, password };

  try {
    // Aquí usamos la URL exacta que te dio tu compañero
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // ¡Éxito! Guardamos el token en la memoria del navegador
      localStorage.setItem("token", result.token);

      document.getElementById("loginMessage").style.color = "#4cd137";
      document.getElementById("loginMessage").innerText =
        "Login correcto. Redirigiendo...";

      // Te mandamos al dashboard después de 1 segundo
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      // Error (contraseña mal, etc)
      document.getElementById("loginMessage").style.color = "red";
      document.getElementById("loginMessage").innerText =
        result.message || "Credenciales incorrectas";
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    document.getElementById("loginMessage").innerText =
      "Error al conectar con el servidor.";
  }
});
