// Initialize the Leaflet map
var map = L.map('map').setView([37.8, -96], 4); // Centered in the US

// Street and satellite layers
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

var esriSatellite = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '© Esri, USGS, NOAA'
});

// Layer control to switch between base maps
var baseMaps = {
    "Street Map": streetMap,
    "Satellite Map (Esri)": esriSatellite
};

// Define a function to return color based on the AQI value
function getColor(aqi) {
    return aqi > 300 ? '#7E0023' : // Hazardous
           aqi > 200 ? '#99004C' : // Very Unhealthy
           aqi > 150 ? '#FF0000' : // Unhealthy
           aqi > 100 ? '#FF7E00' : // Unhealthy for Sensitive Groups
           aqi > 50  ? '#FFFF00' : // Moderate
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

// Add a legend to the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 100, 150, 200, 300],  // AQI thresholds
        labels = ["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous"]; // AQI labels
        
    // Add a title to the legend
    div.innerHTML += '<div class="legend-title">Air Quality Index (AQI)</div>';

    // Loop through AQI intervals and generate a label with a colored square and the corresponding text label
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + // Color square
            labels[i] + ' (' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+') + ')<br>';  // Text label and AQI range
    }

    return div;
};

legend.addTo(map);

// Define a function to bind popups with information
function onEachFeature(feature, layer) {
    var county = feature.properties.County; // County name
    var state = feature.properties.State; // State name
    var aqi = feature.properties.Max_AQI; // Max AQI value
    var medianAqi = feature.properties.Median_AQI; // Median AQI value
    var good = feature.properties.Good_Days; // Days in "Good" range
    var mod_days = feature.properties.Moderate_Days; // Days in "Moderate" range
    var unhealthy_sensitive = feature.properties.Unhealthy_for_Sensitive_Groups_Days; // Days in "UFSG" range
    var unhealthy2 = feature.properties.Unhealthy_Days; // Days in "Unhealthy" range
    var very_unhealthy = feature.properties.Very_Unhealthy_Days; // Days in "Very Unhealthy" range
    var hazardous = feature.properties.Hazardous_Days // Days in "Hazardous" range

    // Bind a popup to the marker
    layer.bindPopup(`
        <strong>${county}, ${state}</strong></br>
        Max AQI: ${aqi}</br>
        Median AQI: ${medianAqi}</br>
        Good Days: ${good}</br>
        Moderate Days: ${mod_days}</br>
        Unhealthy for Sensitive Groups Days: ${unhealthy_sensitive}</br>
        Unhealthy Days: ${unhealthy2}</br>
        Very Unhealthy Days: ${very_unhealthy}</br>
        Hazrdous Days: ${hazardous}</br>
        `);
}

// Create empty layers for markers and heatmap
var markerLayer = L.layerGroup();
var heatmapLayer = L.layerGroup();

// Load the GeoJSON data from the URL
d3.json('https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson').then(function(data) {
    // Add GeoJSON data as markers to markerLayer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return createMarker(feature, latlng);
        },
        onEachFeature: onEachFeature // Bind popups for each feature
    }).addTo(markerLayer);  // Add markers to markerLayer

    // Create heatmap data
    var heatData = [];

    // Loop through each feature in the GeoJSON
    data.features.forEach(function(feature) {
        var lat = feature.properties.latitude;  // Use latitude from properties
        var lon = feature.properties.longitude;  // Use longitude from properties
        var aqi = feature.properties.Max_AQI;  // Use AQI from properties

        // Ensure lat and lon are valid numbers
        if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
            heatData.push([lat, lon, aqi * 3]);  // Normalize AQI for heatmap intensity
        }
    });

    console.log(heatData);  // Check the data being passed to the heatmap

    // Create heatmap layer and add to heatmapLayer
    var heat = L.heatLayer(heatData, {
        radius: 40,  // Adjust radius for larger points
        blur: 15,    // Adjust blur for smoother visualization
        maxZoom: 18,
        max: 0.5     // Maximum intensity (normalized)
    }).addTo(heatmapLayer);  // Add heatmap to heatmapLayer

}).catch(function(error) {
    console.error('Error loading the GeoJSON data: ', error);
});


// Layer control for base maps and overlays (markers and heatmap)
var overlayMaps = {
    "Markers": markerLayer,
    "Heatmap": heatmapLayer
};

// Add layer control to the map (default to markers)
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Show markers by default
markerLayer.addTo(map);