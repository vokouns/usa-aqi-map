// Function to run on page load
function init() {

// Use the correct URL for the data
const aqiUrl = "https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson";

// Fetch the JSON data
d3.json(aqiUrl).then(function(data) {
    console.log(data);

        // Make sure to access the correct data structure
        // Assuming 'features' is where your actual data resides
        let aqiData = data.output.map(output => ({
            State: data.output.State, // Adjust based on your data structure
            Median_AQI: data.output.Median_AQI // Adjust based on your data structure
        }));

        // Sort the data by Median_AQI in ascending order
        let sortedData = aqiData.sort((a, b) => a.Median_AQI - b.Median_AQI);

        // Select the bottom 10 entries
        let bottom10Data = sortedData.slice(0, 10);

        // State names for the bottom 10
        let names = bottom10Data.map(row => row.State);

        // Trace for the bottom 10 data
        let trace1 = {
            x: names,
            y: bottom10Data.map(row => row.Median_AQI),
            type: "bar"
        };

        // Data trace array
        let traceData = [trace1];

        // Apply the group barmode to the layout
        let layout = {
            title: "Bottom 10 States by AQI"
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", traceData, layout);
        });

}

// Initialize the dashboard
init();