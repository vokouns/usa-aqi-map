// Function to run on page load
function init() {

// Use the correct URL for the data
const aqiUrl = "https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson";

// Fetch the JSON data
d3.json(aqiUrl).then(function(data) {
    console.log(data);

        // Make sure to access the correct data structure
        // Assuming 'features' is where your actual data resides
        let aqiData = data.features.map(feature => ({
            County: feature.properties.County, // Adjust based on your data structure
            Median_AQI: feature.properties.Median_AQI // Adjust based on your data structure
        }));

        // Store the data globally for later use
        window.aqiData = aqiData;

        
        // Populate dropdown options
        options.forEach(option => {
            dropdown.append("option")
                .text(option.charAt(0).toUpperCase() + option.slice(1) + " 10")
                .attr("value", option);
        });

        // Default to 'top' when the page loads
        updatePlotly('top'); 
    });
}

// Function to update the plot based on dropdown selection
function updatePlotly(selection) {
    let sortedData;

    if (selection === 'top') {
        // Sort in ascending order for top 10
        sortedData = window.aqiData.sort((a, b) => a.Median_AQI - b.Median_AQI).slice(0, 10);
    } else {
        // Sort in descending order for bottom 10
        sortedData = window.aqiData.sort((a, b) => b.Median_AQI - a.Median_AQI).slice(0, 10);
    }

    const names = [];
    const values = [];

    for (let i = 0; i < sortedData.length; i++) {
        names.push(sortedData[i].County);
        values.push(sortedData[i].Median_AQI);
    }

//         // Select the top 10 entries
//         let bottom10Data = sortedData.slice(0, 10);

//         // State names for the bottom 10
//         let names = bottom10Data.map(object => object.County);

//         // Trace for the bottom 10 data
//         let trace2 = {
//             x: names,
//             y: bottom10Data.map(object => object.Median_AQI),
//             type: "bar"
//         };

//         // Data trace array
//         let traceData = [trace2];

//         // Apply the group barmode to the layout
//         let layout = {
//             title: "Top 10 Counties by AQI",
//             margin: {
//                 l: 75,
//                 r: 75,
//                 t: 100,
//                 b: 50
//               }
//         };

//         // Render the plot to the div tag with id "plot"
//         Plotly.newPlot("plot", traceData, layout);
//         });
// }

// Initialize the dashboard
<<<<<<< HEAD
init();
=======
init();

>>>>>>> 25b98973b1f44a8ab944a57da851ba743ab5eebe
