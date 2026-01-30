document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  } else {
    loadRequests();
  }
});

async function loadRequests() {
  try {
    const response = await fetch("/api/requests", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });

    if (response.status === 401) {
      logout();
      return;
    }

    const requests = await response.json();
    const tableBody = document.getElementById("requestsTable");
    tableBody.innerHTML = "";

    requests.forEach((req) => {
      let statusColor = req.estatus === "Contactado" ? "green" : "orange";

      tableBody.innerHTML += `
            <tr>
                <td>${req.nombre}</td>
                <td>${req.email}</td>
                <td style="color:${statusColor}; font-weight:bold;">${req.estatus}</td>
                <td>
                    <button onclick="updateStatus('${req._id}')">Marcar Contactado</button>
                    <button onclick="deleteRequest('${req._id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

async function updateStatus(id) {
  try {
    await fetch(`/api/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ estatus: "Contactado" }),
    });
    loadRequests();
  } catch (error) {
    console.error(error);
  }
}

async function deleteRequest(id) {
  if (confirm("¿Seguro que quieres eliminarlo?")) {
    await fetch(`/api/requests/${id}`, {
      method: "DELETE",
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    loadRequests();
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
