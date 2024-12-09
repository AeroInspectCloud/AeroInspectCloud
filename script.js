// Initialisiere die Karte
const map = L.map('map').setView([50, 10], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers = [];
let route = [];

// Fügt einen Marker hinzu, wenn die Karte angeklickt wird
map.on('click', (e) => {
  const { lat, lng } = e.latlng;
  const marker = L.marker([lat, lng]).addTo(map);
  markers.push({ lat, lng });
  marker.bindPopup(`Point ${markers.length}`).openPopup();
});

// Optimiert die Route (einfache naive Implementierung)
document.getElementById('optimize-route').addEventListener('click', () => {
  if (markers.length < 2) {
    alert('Add at least two points to optimize the route.');
    return;
  }

  // Dummy-Algorithmus (geradlinige Verbindung der Punkte)
  route = [...markers];
  drawRoute(route);
});

function drawRoute(route) {
  // Entferne bestehende Routen
  if (window.polyline) {
    map.removeLayer(window.polyline);
  }

  const latlngs = route.map((point) => [point.lat, point.lng]);
  window.polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);

  map.fitBounds(window.polyline.getBounds());
}
