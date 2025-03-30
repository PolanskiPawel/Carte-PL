const map = L.map('map').setView([49.441, 20.712], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 18
}).addTo(map);

// Fonction pour charger un fichier GeoJSON
function loadGeoJSON(filePath, color = '#0077ff') {
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      const layer = L.geoJSON(data, {
        filter: f => f.geometry.type !== "Point",
        style: {
          color: color,
          weight: 2,
          fillOpacity: 0.3
        },
        onEachFeature: (feature, layer) => {
          const name = feature.properties?.name || 'Zone';
          layer.bindPopup(`Zone : ${name}`);
        }
      }).addTo(map);
      map.fitBounds(layer.getBounds());
    })
    .catch(err => console.error(`Erreur de chargement ${filePath} :`, err));
}

// Palette de couleurs si tu veux différencier chaque fichier
const colors = ['#0077ff', '#28a745', '#ff5733', '#6f42c1'];

// Charger tous les fichiers listés dans geojsonFiles
geojsonFiles.forEach((file, index) => {
  loadGeoJSON(file, colors[index % colors.length]);
});





