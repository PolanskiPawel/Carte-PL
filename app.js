const map = L.map('map').setView([49.441, 20.712], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
  maxZoom: 18
}).addTo(map);

const allLayers = [];
const displayedNames = new Set();

// Fonction pour charger un fichier GeoJSON
function loadGeoJSON(filePath, color = '#0077ff') {
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      const isMalopolskie = filePath.includes('Małopolskie.geojson');
      const isPolska = filePath.includes('Polska.geojson');

      const layer = L.geoJSON(data, {
        filter: f => f.geometry.type !== "Point",
        style: {
          color: isPolska ? '#000000' : color,
          weight: 2,
          fillOpacity: (isMalopolskie || isPolska) ? 0 : 0.3,
          opacity: 1
        },
        onEachFeature: (feature, layer) => {
          const name = feature.properties?.name || 'Zone';
          layer.bindPopup(`Zone : ${name}`);
          layer.featureName = name;
          allLayers.push(layer);
        }
      }).addTo(map);

      map.fitBounds(layer.getBounds());
    })
    .catch(err => console.error(`Erreur de chargement ${filePath} :`, err));
}

// 🎨 Palette de couleurs pour différencier les fichiers
const colors = ['#0077ff', '#28a745', '#ff5733', '#6f42c1'];

// 🔄 Charger tous les fichiers listés dans geojsonFiles
geojsonFiles.forEach((file, index) => {
  loadGeoJSON(file, colors[index % colors.length]);
});

// ➕ Bouton pour supprimer les doublons
document.getElementById("remove-duplicates").addEventListener("click", () => {
  const seenNames = new Set();

  allLayers.forEach(layer => {
    const name = layer.featureName;
    if (seenNames.has(name)) {
      map.removeLayer(layer); // doublon ➜ supprimer
    } else {
      seenNames.add(name);
    }
  });

  alert("✅ Doublons supprimés !");
});
