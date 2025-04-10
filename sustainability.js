// Mock environmental data (in real scenarios, this data would come from IoT sensors)
const environmentalData = {
    airQuality: "Good (PM2.5: 10 µg/m³)",
    temperature: "25°C",
    humidity: "60%",
    footTraffic: "Moderate"
  };
  
  // Update the environmental data dynamically on the page
  function updateEnvironmentalData() {
    document.getElementById('environmental-data').innerHTML = `
      <p><strong>Air Quality:</strong> ${environmentalData.airQuality}</p>
      <p><strong>Temperature:</strong> ${environmentalData.temperature}</p>
      <p><strong>Humidity:</strong> ${environmentalData.humidity}</p>
      <p><strong>Foot Traffic:</strong> ${environmentalData.footTraffic}</p>
    `;
  }
  
  // Call the function to update the environmental data when the page loads
  window.onload = function() {
    updateEnvironmentalData();
  };
  