// This pulls state, county, lat, lon, gooddays, moderatedays, medianAQI
// Store the local GeoJSON file path (update this path to the actual location of your file)
var queryUrl = "output.geojson";

// Perform a GET request to fetch the local GeoJSON file
d3.json(queryUrl).then(function (data) {
  // Extract features from the GeoJSON data
  var features = data.features;

  // Loop through each feature to extract the required information
  features.forEach(function (feature) {
    var properties = feature.properties;
    
    // Extract the relevant fields
    var state = properties.State;
    var county = properties.County;
    var latitude = properties.latitude;
    var longitude = properties.longitude;
    var goodDays = properties.Good_Days;
    var moderateDays = properties.Moderate_Days;
    var medianAQI = properties.Median_AQI;

    // Log the extracted information to the console
    console.log(`State: ${state}, County: ${county}`);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    console.log(`Good Days: ${goodDays}, Moderate Days: ${moderateDays}, Median AQI: ${medianAQI}`);
    console.log('--------------------------------------');
  });
});



// THis is to pull all the data
// Define the path to your GeoJSON file (update the path if necessary)
var queryUrl = "output.geojson"; // Ensure that this path is correct relative to your HTML file

// Fetch the GeoJSON file using D3.js
d3.json(queryUrl).then(function(data) {
  // Extract the features from the GeoJSON file
  var features = data.features;

  // Select the div where the data will be displayed
  var geojsonDiv = d3.select("#geojson-data");

  // Loop through each feature to display all properties
  features.forEach(function(feature) {
    var properties = feature.properties;
    var geometry = feature.geometry;

    // Create a string to hold the feature data
    var htmlString = "<strong>Properties:</strong><br>";
    
    // Loop through each property and append to the HTML string
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        htmlString += key + ": " + properties[key] + "<br>";
      }
    }

    // Append geometry information (coordinates and type)
    htmlString += "<strong>Geometry:</strong><br>";
    htmlString += "Type: " + geometry.type + "<br>";
    htmlString += "Coordinates: " + geometry.coordinates.join(", ") + "<br>";

    // Append the generated HTML to the geojsonDiv
    geojsonDiv.append("p").html(htmlString);
  });
}).catch(function(error) {
  console.log("Error loading the GeoJSON file:", error);
});