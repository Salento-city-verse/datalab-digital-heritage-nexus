// Define map
const map = L.map('map').setView([40.3527, 18.1726], 15);

// Use satellite tiles
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  maxZoom: 20,
  attribution: '© Google Maps'
}).addTo(map);

// All places (your full dataset)
const places = [/* paste your full array of 40+ places here */];

// Icon sizes
const categoryIcons = {
  'Monuments': 'orange',
  'Parks': 'green',
  'Food': 'purple',
  'Churches': 'red',
  'Museums': 'brown',
  'Medical': 'blue'
};

function createIcon(color) {
  return L.circleMarker([0, 0], {
    radius: 10,
    color: color,
    fillColor: color,
    fillOpacity: 0.9,
    weight: 2
  });
}

// Layers and filters
const markers = [];
const categoryLayers = {};
const activeFilters = new Set(Object.keys(categoryIcons));

// Create layer groups
for (const cat in categoryIcons) {
  categoryLayers[cat] = L.layerGroup().addTo(map);
}

// Add markers
places.forEach(place => {
  const marker = L.circleMarker([place.lat, place.lng], {
    radius: 10,
    color: place.color,
    fillColor: place.color,
    fillOpacity: 0.9,
    weight: 2
  }).bindPopup(`<strong>${place.name}</strong><br>Category: ${place.category}`)
    .on('click', () => {
      map.flyTo([place.lat, place.lng], 17);
    });
  marker.category = place.category;
  markers.push(marker);
  categoryLayers[place.category].addLayer(marker);
});

// Add filter buttons
const filterContainer = document.getElementById('filters');
Object.keys(categoryIcons).forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.style.backgroundColor = categoryIcons[cat];
  btn.classList.add('filter-button');
  btn.classList.add('selected');

  btn.addEventListener('click', () => {
    if (activeFilters.has(cat)) {
      activeFilters.delete(cat);
      map.removeLayer(categoryLayers[cat]);
      btn.classList.remove('selected');
    } else {
      activeFilters.add(cat);
      map.addLayer(categoryLayers[cat]);
      btn.classList.add('selected');
    }
  });

  filterContainer.appendChild(btn);
});

// Show all button
const showAllBtn = document.createElement('button');
showAllBtn.textContent = "Show All";
showAllBtn.classList.add('filter-button');
showAllBtn.addEventListener('click', () => {
  Object.keys(categoryIcons).forEach(cat => {
    if (!activeFilters.has(cat)) {
      activeFilters.add(cat);
      map.addLayer(categoryLayers[cat]);
      const btn = [...filterContainer.children].find(b => b.textContent === cat);
      btn?.classList.add('selected');
    }
  });
});
filterContainer.appendChild(showAllBtn);

// Itineraries
const itineraries = [
  {
    name: "Classic Culture Tour",
    stops: ["Anfiteatro Romano", "Villa Comunale", "Palazzo dei Celestini", "400 Gradi", "Piazza Sant'Oronzo"]
  },
  {
    name: "Baroque Pathway",
    stops: ["Cattedrale di Lecce", "Piazza Duomo", "Chiesa di Santa Croce", "MUST", "Alvino Bar"]
  },
  {
    name: "Museums & Gardens",
    stops: ["Museo Sigismondo Castromediano", "Museo Diocesano di Lecce", "Orto Botanico dell'Università del Salento", "Parco di Belloluogo", "Natale Gelateria"]
  },
  {
    name: "Religious Heritage Walk",
    stops: ["Chiesa di San Matteo", "Chiesa di Santa Chiara", "Basilica di Santa Caterina d'Alessandria", "Chiesa del Carmine", "Palazzo Adorno"]
  },
  {
    name: "Local Delights & Markets",
    stops: ["Pasticceria Andrea", "Osteria degli Spiriti", "Convitto Palmieri", "Museo Faggiano", "Teatro Politeama Greco"]
  },
];

// Add itinerary buttons
const itineraryContainer = document.getElementById('itineraries');
let activeItineraryLine = null;
let itineraryMarkers = [];

itineraries.forEach(itinerary => {
  const btn = document.createElement('button');
  btn.textContent = itinerary.name;
  btn.classList.add('itinerary-button');

  btn.addEventListener('click', () => {
    if (btn.classList.contains('selected')) {
      // Unselect
      if (activeItineraryLine) {
        map.removeLayer(activeItineraryLine);
        activeItineraryLine = null;
      }
      itineraryMarkers.forEach(m => map.removeLayer(m));
      itineraryMarkers = [];
      btn.classList.remove('selected');
      return;
    }

    // Clear previous
    document.querySelectorAll('.itinerary-button.selected').forEach(b => b.classList.remove('selected'));
    if (activeItineraryLine) map.removeLayer(activeItineraryLine);
    itineraryMarkers.forEach(m => map.removeLayer(m));
    itineraryMarkers = [];

    // Add new
    btn.classList.add('selected');
    const coords = [];
    itinerary.stops.forEach(name => {
      const place = places.find(p => p.name === name);
      if (place) {
        coords.push([place.lat, place.lng]);
        const marker = L.marker([place.lat, place.lng]).bindPopup(`<strong>${place.name}</strong>`);
        marker.addTo(map);
        itineraryMarkers.push(marker);
      }
    });

    activeItineraryLine = L.polyline(coords, { color: 'black', weight: 4 }).addTo(map);

    // Info
    const distance = coords.reduce((sum, cur, idx, arr) => {
      if (idx === 0) return 0;
      const prev = arr[idx - 1];
      const dist = map.distance(prev, cur);
      return sum + dist;
    }, 0);

    const timeMin = Math.round((distance / 80)); // avg walk = 80 m/min
    const catCount = { Parks: 0, Churches: 0, Food: 0, Monuments: 0, Museums: 0, Medical: 0 };
    itinerary.stops.forEach(name => {
      const cat = places.find(p => p.name === name)?.category;
      if (cat) catCount[cat]++;
    });

    const total = itinerary.stops.length;
    const summary = Object.entries(catCount).map(([cat, count]) => `${cat}: ${Math.round((count / total) * 100)}%`).join(', ');

    alert(`Itinerary: ${itinerary.name}\nStops: ${total}\nWalking Distance: ${(distance / 1000).toFixed(2)} km\nTime: ~${timeMin} min\nCategories: ${summary}`);
  });

  itineraryContainer.appendChild(btn);
});
