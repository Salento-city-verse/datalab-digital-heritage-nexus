const pointsOfInterest = [
    { name: "Piazza del Duomo", type: "church", position: { lat: 40.3515, lng: 18.1743 } },
    { name: "Basilica di Santa Croce", type: "church", position: { lat: 40.3530, lng: 18.1726 } },
    { name: "Roman Amphitheatre", type: "monument", position: { lat: 40.3522, lng: 18.1709 } },
    { name: "Porta Napoli", type: "gate", position: { lat: 40.3550, lng: 18.1716 } },
    { name: "Castello Carlo V", type: "monument", position: { lat: 40.3511, lng: 18.1768 } },
    { name: "Porta Rudiae", type: "gate", position: { lat: 40.3548, lng: 18.1657 } },
    { name: "Museo Sigismondo Castromediano", type: "museum", position: { lat: 40.3447, lng: 18.1742 } },
    { name: "Obelisco di Lecce", type: "monument", position: { lat: 40.3563, lng: 18.1712 } },
    { name: "Chiesa di San Matteo", type: "church", position: { lat: 40.3513, lng: 18.1689 } },
    { name: "Chiesa di Sant'Irene", type: "church", position: { lat: 40.3534, lng: 18.1697 } },
    { name: "Palazzo dei Celestini", type: "monument", position: { lat: 40.3528, lng: 18.1737 } },
    { name: "Teatro Romano", type: "monument", position: { lat: 40.3515, lng: 18.1715 } },
    { name: "Teatro Politeama Greco", type: "monument", position: { lat: 40.3513, lng: 18.1753 } },
    { name: "Chiesa di Santa Chiara", type: "church", position: { lat: 40.3518, lng: 18.1702 } },
    { name: "Museo della Cartapesta", type: "museum", position: { lat: 40.3510, lng: 18.1745 } },
    { name: "Palazzo Adorno", type: "monument", position: { lat: 40.3524, lng: 18.1723 } }
  ];
  
  let map, panorama, markerCluster;
  let markers = [];
  let streetViewActive = false;
  
  function getMarkerColor(type) {
    switch (type) {
      case "church": return "https://th.bing.com/th/id/R.e05a6da306bb3444090139437b04f7fc?rik=JSkHtxDHuqGn1Q&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fc%2fa%2fg%2f2%2fO%2fd%2fsmall-brown-dot-hi.png&ehk=p7XYBkDFj2c60IYaibBJ7dIIj9sslPiscg9YWcWWEnU%3d&risl=&pid=ImgRaw&r=0";
      case "gate": return "https://th.bing.com/th/id/R.70d15c3a535ac2073159897fb80fdb0b?rik=jgzzDrWESeh9Qw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fN%2fm%2fG%2fq%2fD%2f0%2fgreen-dot-hi.png&ehk=rAqAKm3f%2bft%2f2yCHtHH9MuuyI%2bO7qmXkVt4IprQHxBc%3d&risl=&pid=ImgRaw&r=0";
      case "museum": return "https://www.bedarf.cc/wp-content/uploads/2020/05/blue_dot.png";
      case "monument": return "https://static.vecteezy.com/system/resources/thumbnails/020/906/679/small_2x/geometric-circle-shape-on-a-transparent-background-free-png.png";
      default: return "https://th.bing.com/th/id/R.e7f1336bc8acb0994878e811aad6cf91?rik=yp1ewg64euvIaA&riu=http%3a%2f%2fclipart-library.com%2fimg1%2f1036648.png&ehk=FBwKLIiOscPaQsiNDjAfqBQ7c1IPxDkoE6KflJiPu%2bg%3d&risl=&pid=ImgRaw&r=0";
    }
  }
  
  function initMap() {
    const lecce = { lat: 40.3520, lng: 18.1740 };
  
    map = new google.maps.Map(document.getElementById("map"), {
      center: lecce,
      zoom: 15,
      streetViewControl: true,
      mapTypeControl: true
    });
  
    panorama = new google.maps.StreetViewPanorama(document.getElementById("map"), {
      position: lecce,
      pov: { heading: 165, pitch: 0 },
      visible: true
    });
  
    map.setStreetView(panorama);
  
    createMarkers();
    applyFilters();
  
    document.getElementById("toggleBtn").addEventListener("click", () => {
      streetViewActive = !streetViewActive;
      panorama.setVisible(streetViewActive);
      document.getElementById("toggleBtn").innerText = streetViewActive
        ? "Switch to Map View"
        : "Switch to Street View";
    });
  
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  }
  
  function createMarkers() {
    markers = pointsOfInterest.map((poi) => {
      const marker = new google.maps.Marker({
        position: poi.position,
        title: poi.name,
        icon: {
            url: getMarkerColor(poi.type),
            scaledSize: new google.maps.Size(24, 24) // smaller size!
          },
        type: poi.type
      });
  
      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>${poi.name}</strong>`
      });
  
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
        if (streetViewActive) panorama.setPosition(poi.position);
      });
  
      return marker;
    });
  
    markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  }
  
  function applyFilters() {
    const checkedTypes = Array.from(document.querySelectorAll(".filter-checkbox:checked"))
                              .map(cb => cb.value);
  
    markers.forEach(marker => {
      const isVisible = checkedTypes.includes(marker.type);
      marker.setMap(isVisible ? map : null);
    });
  
    // Update clustering
    markerCluster.clearMarkers();
    const visibleMarkers = markers.filter(marker => marker.getMap() !== null);
    markerCluster.addMarkers(visibleMarkers);
  }
  