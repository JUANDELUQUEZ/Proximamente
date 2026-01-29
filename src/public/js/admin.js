// Al cargar la página, verificamos si hay token
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // Redirigir si no hay login
  }
  loadRequests();
});

async function loadRequests() {
  const response = await fetch("/api/requests", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const requests = await response.json();

  const tableBody = document.getElementById("requestsTable");
  tableBody.innerHTML = "";

  requests.forEach((req) => {
    tableBody.innerHTML += `
            <tr>
                <td>${req.nombre}</td>
                <td>${req.email}</td>
                <td>${req.status}</td>
                <td>
                    <button onclick="updateStatus('${req._id}')">Marcar Contactado</button>
                    <button onclick="deleteRequest('${req._id}')">Eliminar</button>
                </td>
            </tr>
        `;
  });
}

async function deleteRequest(id) {
  if (confirm("¿Seguro que quieres eliminarlo?")) {
    await fetch(`/api/requests/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadRequests(); // Recargar tabla
  }
}
