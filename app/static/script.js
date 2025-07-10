// let trips = [];
// let quill;

// document.addEventListener("DOMContentLoaded", () => {
//   quill = new Quill('#editor', { theme: 'snow' });

//   fetch("/api/trips")
//     .then(res => res.json())
//     .then(data => {
//       trips = data;
//       renderTrips();
//     });
// });

// function addTrip() {
//   const trip = {
//     title: document.getElementById("title").value,
//     imageUrl: document.getElementById("imageUrl").value,
//     locationUrl: document.getElementById("locationUrl").value,
//     startDate: document.getElementById("startDate").value,
//     endDate: document.getElementById("endDate").value,
//     description: quill.root.innerHTML
//   };

//   trips.push(trip);
//   renderTrips();

//   fetch("/api/trips", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(trips)
//   });
// }

// function renderTrips() {
//   const container = document.getElementById("trips");
//   container.innerHTML = "";
//   trips.forEach(trip => {
//     const div = document.createElement("div");
//     div.className = "trip-card";
//     div.innerHTML = `
//       <h2>${trip.title}</h2>
//       <p>Du ${trip.startDate} au ${trip.endDate}</p>
//       <img src="${trip.imageUrl}" style="max-width: 100%">
//       <div>${trip.description}</div>
//       <a href="${trip.locationUrl}" target="_blank">Google Maps</a>
//     `;
//     container.appendChild(div);
//   });
// }
// function clearTrips() {
//   trips = [];
//   renderTrips();

//   fetch("/api/trips", {
//     method: "DELETE"
//   });
// }
// function downloadTrips() {
//   const blob = new Blob([JSON.stringify(trips, null, 2)], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "trips.json";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }
// function uploadTrips(event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = (e) => {
//     try {
//       trips = JSON.parse(e.target.result);
//       renderTrips();
//       fetch("/api/trips", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(trips)
//       });
//     } catch (error) {
//       alert("Invalid file format");
//     }
//   };
//   reader.readAsText(file);
// }

let trips = [];
let quill;
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  quill = new Quill('#editor', { theme: 'snow' });

  fetch("/api/trips")
    .then(res => res.json())
    .then(data => {
      trips = data;
      renderTrips();
    });

  document.getElementById("updateBtn").addEventListener("click", updateTrip);
});

function addTrip() {
  const trip = {
    title: document.getElementById("title").value,
    imageUrl: document.getElementById("imageUrl").value,
    locationUrl: document.getElementById("locationUrl").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    description: quill.root.innerHTML
  };

  if (editIndex !== null) {
    trips[editIndex] = trip;
    editIndex = null;
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
  } else {
    trips.push(trip);
  }

  saveTrips();
  clearForm();
  renderTrips();
}

function editTrip(index) {
  const trip = trips[index];
  document.getElementById("title").value = trip.title;
  document.getElementById("imageUrl").value = trip.imageUrl;
  document.getElementById("locationUrl").value = trip.locationUrl;
  document.getElementById("startDate").value = trip.startDate;
  document.getElementById("endDate").value = trip.endDate;
  quill.root.innerHTML = trip.description;

  editIndex = index;
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline-block";
}

function updateTrip() {
  addTrip(); // logiquement même traitement que "ajouter" mais remplace l'entrée existante
}

function deleteTrip(index) {
  if (confirm("Supprimer cette destination ?")) {
    trips.splice(index, 1);
    saveTrips();
    renderTrips();
  }
}

function renderTrips() {
  const container = document.getElementById("trips");
  container.innerHTML = "";
  trips.forEach((trip, index) => {
    const div = document.createElement("div");
    div.className = "trip-card";
    div.innerHTML = `
      <h2>${trip.title}</h2>
      <p>Du ${trip.startDate} au ${trip.endDate}</p>
      <img src="${trip.imageUrl}" style="max-width: 100%">
      <div>${trip.description}</div>
      <a href="${trip.locationUrl}" target="_blank">Google Maps</a>
      <div class="action-buttons">
        <button onclick="editTrip(${index})">Modifier</button>
        <button onclick="deleteTrip(${index})">Supprimer</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function saveTrips() {
  fetch("/api/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trips)
  });
}

function clearTrips() {
  trips = [];
  fetch("/api/trips", { method: "DELETE" });
  renderTrips();
}

function downloadTrips() {
  const blob = new Blob([JSON.stringify(trips, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "trips.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function uploadTrips(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      trips = JSON.parse(e.target.result);
      saveTrips();
      renderTrips();
    } catch (error) {
      alert("Fichier invalide.");
    }
  };
  reader.readAsText(file);
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("locationUrl").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  quill.root.innerHTML = "";
}
