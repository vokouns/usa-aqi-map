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

        // Sort the data by Median_AQI in ascending order
        let sortedData = aqiData.sort((a, b) => a.Median_AQI - b.Median_AQI);

        // Select the top 10 entries
        let top10Data = sortedData.slice(0, 10);

        // State names for the bottom 10
        let names = top10Data.map(object => object.County);

        // Trace for the bottom 10 data
        let trace1 = {
            x: names,
            y: top10Data.map(object => object.Median_AQI),
            type: "bar"
        };

        // Data trace array
        let traceData = [trace1];

        // Apply the group barmode to the layout
        let layout = {
            title: "Top 10 Counties by AQI",
            margin: {
                l: 75,
                r: 75,
                t: 100,
                b: 50
              }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot", traceData, layout);
        });
}

//     // Code to plot botton 10 counties
//         let aqiData = data.features.map(feature => ({
//             County: feature.properties.County, // Adjust based on your data structure
//             Median_AQI: feature.properties.Median_AQI // Adjust based on your data structure
//         }));

//         // Sort the data by Median_AQI in desending order
//         let sortedData = aqiData.sort((a, b) => b.Median_AQI - a.Median_AQI);

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
init();