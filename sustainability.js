// Mock Environmental Data (replace with actual data fetch in production)
const mockEnvironmentalData = {
    currentTemperature: 25, // Example current temperature in Celsius
    currentHumidity: 60, // Example current humidity in percentage
    currentAirQuality: 15, // Example current PM2.5 (Air Quality)
    currentFootTraffic: 5, // Example foot traffic index (1-10 scale)
    hourlyTemperature: [22, 23, 24, 25, 26, 27, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 19, 20, 21, 22, 23, 24, 25],
    hourlyAirQuality: [10, 12, 14, 15, 16, 18, 20, 21, 22, 20, 18, 15, 12, 10, 11, 12, 13, 14, 16, 18, 19, 20, 21, 22]
  };
  
  // Function to update the current environmental data
  function updateCurrentConditions() {
    const currentConditionsElement = document.getElementById('current-data');
    currentConditionsElement.innerHTML = `
      <p><strong>Current Air Quality (PM2.5):</strong> ${mockEnvironmentalData.currentAirQuality} µg/m³</p>
      <p><strong>Current Temperature:</strong> ${mockEnvironmentalData.currentTemperature}°C</p>
      <p><strong>Current Humidity:</strong> ${mockEnvironmentalData.currentHumidity}%</p>
      <p><strong>Current Foot Traffic Index:</strong> ${mockEnvironmentalData.currentFootTraffic} (Scale 1-10)</p>
    `;
  }
  
  // Function to create the charts with Chart.js
  function createCharts() {
    const ctx1 = document.getElementById('airQualityChart').getContext('2d');
    const ctx2 = document.getElementById('temperatureChart').getContext('2d');
  
    // Air Quality Chart (over the last 24 hours)
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: Array.from({length: 24}, (_, i) => `${i}:00`), // Hourly labels
        datasets: [{
          label: 'PM2.5 (µg/m³)',
          data: mockEnvironmentalData.hourlyAirQuality,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day (Last 24 hours)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Air Quality (µg/m³)'
            },
            beginAtZero: true
          }
        }
      }
    });
  
    // Temperature Chart (over the last 24 hours)
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: Array.from({length: 24}, (_, i) => `${i}:00`), // Hourly labels
        datasets: [{
          label: 'Temperature (°C)',
          data: mockEnvironmentalData.hourlyTemperature,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day (Last 24 hours)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Call functions when the page loads
  window.onload = function() {
    updateCurrentConditions();  // Update current environmental conditions
    createCharts();  // Create charts with the data
  };
  