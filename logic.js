// Initialize the map
const map = L.map("map").setView([0, 0], 2);

// Add a tile layer to the map with OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// URL for fetching USGS GeoJSON dataset containing all earthquakes in the past 7 days
const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to determine the color of the marker based on earthquake depth
function getColor(depth) {
  return depth > 90 ? "#ff0000" : // Red for depths greater than 90 km
         depth > 70 ? "#ff4500" : // Orange-Red for depths between 71 and 90 km
         depth > 50 ? "#ff8c00" : // Dark Orange for depths between 51 and 70 km
         depth > 30 ? "#ffd700" : // Gold for depths between 31 and 50 km
         depth > 10 ? "#adff2f" : // Green-Yellow for depths between 11 and 30 km
                      "#00ff00"; // Bright Green for depths less than 10 km
}

// Function to determine the size of the marker based on earthquake magnitude
function getRadius(magnitude) {
  return magnitude > 0 ? magnitude * 4 : 1; // Scale the radius to enhance visibility
}

// Fetch GeoJSON data and add it to the map as styled circle markers
d3.json(earthquakeUrl).then((data) => {
  L.geoJSON(data, {
    // Define how each point is represented on the map
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag), // Radius based on magnitude
        fillColor: getColor(feature.geometry.coordinates[2]), // Color based on depth
        color: "#000", // Outline color
        weight: 0.5, // Outline width
        opacity: 1, // Outline opacity
        fillOpacity: 0.8, // Fill opacity
      });
    },
    // Add popups to each marker with detailed information
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<h3>${feature.properties.place}</h3>
         <p>Magnitude: ${feature.properties.mag}</p>
         <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
      );
    },
  }).addTo(map);

  // Add a legend to describe marker colors
  createLegend();
});

// Function to create and add a legend to the map
function createLegend() {
  const legend = L.control({ position: "bottomright" }); // Position the legend in the bottom-right corner

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "legend"); // Create a div element for the legend
    const depths = [-10, 10, 30, 50, 70, 90]; // Depth categories
    const colors = ["#00ff00", "#adff2f", "#ffd700", "#ff8c00", "#ff4500", "#ff0000"]; // Corresponding colors

    div.innerHTML += "<h4>Depth (km)</h4>"; // Title for the legend

    // Loop through depth intervals to create legend entries
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        `<div style="display: flex; align-items: center; margin-bottom: 4px;">
          <i style="width: 18px; height: 18px; background:${colors[i]}; display: inline-block; margin-right: 8px;"></i>
          <span>${depths[i]}${depths[i + 1] ? `&ndash;${depths[i + 1]}` : "+"}</span>
        </div>`;
    }

    return div;
  };

  legend.addTo(map); // Add the legend to the map
}
