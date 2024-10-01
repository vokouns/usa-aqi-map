// Initialize the Leaflet map
var map = L.map('map').setView([37.8, -96], 4); // Centered in the US

// Add a base map layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Define a function to return color based on the AQI value
function getColor(aqi) {
    return aqi > 300 ? '#7e0023' : // Hazardous
           aqi > 200 ? '#ff0000' : // Very Unhealthy
           aqi > 150 ? '#ff7e00' : // Unhealthy
           aqi > 100 ? '#ffff00' : // Unhealthy for Sensitive Groups
           aqi > 50  ? '#00e400' : // Moderate
                        '#00e400';  // Good (default)
}

// Define a function to create markers with different color based on AQI
function createMarker(feature, latlng) {
    var aqi = feature.properties.Max_AQI; // Get AQI from the GeoJSON feature

    // Define the circle marker style
    var markerStyle = {
        radius: 8, // You can adjust the size if needed
        fillColor: getColor(aqi),
        color: "#000", // Border color
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    // Create a Leaflet circle marker
    return L.circleMarker(latlng, markerStyle);
}

// Define a function to bind popups with information
function onEachFeature(feature, layer) {
    var county = feature.properties.County; // County name
    var state = feature.properties.State; // State name
    var aqi = feature.properties.Max_AQI; // Median AQI value

    // Bind a popup to the marker
    layer.bindPopup(`<strong>${county}, ${state}</strong><br/>Max Air Quality Index: ${aqi}`);
}

// Load the GeoJSON data from the URL
d3.json('https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson').then(function(data) {
    // Add GeoJSON layer to the map
    L.geoJson(data, {
        pointToLayer: createMarker,  // Use the createMarker function for each point
        onEachFeature: onEachFeature // Bind popups for each feature
    }).addTo(map);
}).catch(function(error) {
    console.error('Error loading the GeoJSON data: ', error);
});
