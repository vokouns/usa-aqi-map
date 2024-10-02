// Function to initialize the dashboard
function init() {
    const aqiUrl = "https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson";

    // Fetch the JSON data
    d3.json(aqiUrl).then(function(data) {
        const aqiData = data.features.map(feature => ({
            County: feature.properties.County,
            State: feature.properties.State,
            Median_AQI: feature.properties.Median_AQI
        }));

        // Group the AQI data by state and calculate average AQI for each state
        const stateAQIData = {};

        aqiData.forEach(item => {
            const state = item.State;
            const aqi = item.Median_AQI;

            if (!stateAQIData[state]) {
                stateAQIData[state] = { totalAQI: 0, countyCount: 0 };
            }

            stateAQIData[state].totalAQI += aqi;
            stateAQIData[state].countyCount += 1;
        });

        // Calculate average AQI for each state
        const avgStateAQIData = Object.keys(stateAQIData).map(state => ({
            State: state,
            avgAQI: stateAQIData[state].totalAQI / stateAQIData[state].countyCount
        }));

        // Store the state-level AQI data globally
        window.avgStateAQIData = avgStateAQIData;

        // Initialize with the top 10 states on page load
        updateStatesPlotly('topstate');
    });
}

// Function to update the plot based on dropdown selection
function updateStatesPlotly(selection) {
    let sortedData;

    // Sort the states by average AQI
    if (selection === 'topstate') {
        // Sort in ascending order for top 10 states (best AQI)
        sortedData = [...window.avgStateAQIData].sort((a, b) => a.avgAQI - b.avgAQI).slice(0, 10);
    } else {
        // Sort in descending order for bottom 10 states (worst AQI)
        sortedData = [...window.avgStateAQIData].sort((a, b) => b.avgAQI - a.avgAQI).slice(1, 11);
    }

    // Extract state names and their average AQI values for the chart
    const names = sortedData.map(object => object.State);
    const values = sortedData.map(object => object.avgAQI);

    // Create the trace for the plot
    const trace = {
        x: names,
        y: values,
        type: "bar",
        marker: {
            color: selection === 'topstate' ? 'green' : 'red'  // Conditionally set the bar color
        }
    };

    // Render the plot
    const layout = {
        title: selection === 'topstate' ? "Top 10 States by Average Median AQI" : "Bottom 10 States by Average Median AQI"
        // margin: {
        //     l: 75,
        //     r: 75,
        //     t: 100,
        //     b: 50
        // }
    };

    Plotly.newPlot("plotstate", [trace], layout);
}

// Function to handle dropdown change
function optionChanged() {
    const selection = document.getElementById("selDatasetStates").value;
    updateStatesPlotly(selection); // Call the update function based on the selection
}

// Event listener for dropdown change
d3.selectAll("#selDatasetStates").on("change", function() {
    const selectedValue = d3.select(this).property("value");
    updateStatesPlotly(selectedValue);
});

// Initialize the dashboard
init();
