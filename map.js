let map, marker, infoWindow, panorama;

const lecceCenter = { lat: 40.3520, lng: 18.1740 };
const categoryLabels = {
    red: "Church or Basilica",
    green: "Park",
    brown: "Museum",
    orange: "Monument",
    purple: "Food & Events",
    blue: "Medical Assistance"
  };

const pointsOfInterest = [
        // Churches & Basilicas - red
        { name: "Basilica di Santa Croce", position: { lat: 40.3530, lng: 18.1726 }, color: "red" },
        { name: "Chiesa di San Matteo", position: { lat: 40.3506, lng: 18.1718 }, color: "red" },
        { name: "Duomo di Lecce", position: { lat: 40.3516, lng: 18.1744 }, color: "red" },
        { name: "Chiesa di Santa Chiara", position: { lat: 40.3527, lng: 18.1723 }, color: "red" },
      
        // Parks - green
        { name: "Villa Comunale Giuseppe Garibaldi", position: { lat: 40.3478, lng: 18.1754 }, color: "green" },
        { name: "Giardini Pubblici di Lecce", position: { lat: 40.3481, lng: 18.1760 }, color: "green" },
        { name: "Parco di Belloluogo", position: { lat: 40.3587, lng: 18.1682 }, color: "green" },
        { name: "Bosco di Rauccio (peripheral)", position: { lat: 40.4376, lng: 18.1248 }, color: "green" },
      
        // Museums - brown
        { name: "Museo Sigismondo Castromediano", position: { lat: 40.3447, lng: 18.1742 }, color: "brown" },
        { name: "Museo Faggiano", position: { lat: 40.3512, lng: 18.1727 }, color: "brown" },
        { name: "Museo della Cartapesta", position: { lat: 40.3510, lng: 18.1771 }, color: "brown" },
        { name: "Museo Diocesano di Lecce", position: { lat: 40.3514, lng: 18.1745 }, color: "brown" },
      
        // Monuments - orange
        { name: "Porta Napoli", position: { lat: 40.3564109, lng: 18.1683263 }, color: "orange" },
        { name: "Roman Amphitheatre", position: { lat: 40.3522, lng: 18.1709 }, color: "orange" },
        { name: "Obelisco di Lecce", position: { lat: 40.3563, lng: 18.1712 }, color: "orange" },
        { name: "Porta Rudiae", position: { lat: 40.3548, lng: 18.1657 }, color: "orange" },
      
        // Food - purple
        { name: "Castello Carlo V", position: { lat: 40.3511, lng: 18.1768 }, color: "purple" },
        { name: "Mercato Coperto Sant'Oronzo", position: { lat: 40.3515, lng: 18.1717 }, color: "purple" },
        { name: "Osteria degli Spiriti", position: { lat: 40.3519, lng: 18.1755 }, color: "purple" },
        { name: "La Cucina di Mamma Elvira", position: { lat: 40.3523, lng: 18.1722 }, color: "purple" },
      
        // Medical Assistance - blue
        { name: "Ospedale Vito Fazzi", position: { lat: 40.3345, lng: 18.1437 }, color: "blue" },
        { name: "Croce Rossa Italiana - Comitato di Lecce", position: { lat: 40.3476, lng: 18.1675 }, color: "blue" },
        { name: "Centro Medico Santa Lucia", position: { lat: 40.3555, lng: 18.1764 }, color: "blue" },
        { name: "Farmacia Calò", position: { lat: 40.3509, lng: 18.1746 }, color: "blue" }
   
];

async function initMap() {
    const [{ Map }, { AdvancedMarkerElement, PinElement }] = await Promise.all([
      google.maps.importLibrary("maps"),
      google.maps.importLibrary("marker"),
    ]);
  
    map = new Map(document.getElementById("map"), {
      center: lecceCenter,
      zoom: 15,
      mapId: '4504f8b37365c3d0',
      mapTypeControl: true,
      streetViewControl: true,
    });
  
    panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
      position: lecceCenter,
      pov: { heading: 34, pitch: 10 },
      visible: true,
    });
  
    map.setStreetView(panorama);
  
    // Shared tooltip instance
    const hoverInfoWindow = new google.maps.InfoWindow({ disableAutoPan: true });
  
    pointsOfInterest.forEach(poi => {
      const pin = new PinElement({
        background: poi.color,
        borderColor: "#000",
        glyphColor: "#fff",
      });
  
      const marker = new AdvancedMarkerElement({
        map,
        position: poi.position,
        title: poi.name,
        content: pin.element,
      });
  
      const infoContent = `
        <div style="font-size:16px; padding: 4px 8px; max-width: 250px;">
          <strong>${poi.name}</strong><br>
          <span style="font-size:14px;">Lat: ${poi.position.lat.toFixed(4)}, Lng: ${poi.position.lng.toFixed(4)}</span>
        </div>
      `;
  
      marker.addListener("mouseover", () => {
        hoverInfoWindow.setContent(infoContent);
        hoverInfoWindow.setPosition(poi.position);
        hoverInfoWindow.open(map);
      });
  
      marker.addListener("mouseout", () => {
        hoverInfoWindow.close();
      });
  
      marker.addListener("click", () => {
        panorama.setPosition(poi.position);
      });
    });
  }
  
  window.initMap = initMap;