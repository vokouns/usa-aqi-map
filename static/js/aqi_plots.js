// Function to initialize the dashboard
function init() {
    const aqiUrl = "https://raw.githubusercontent.com/vokouns/usa-aqi-map/refs/heads/main/datasets/output.geojson";

    // Fetch the JSON data
    d3.json(aqiUrl).then(function(data) {
        const aqiData = data.features.map(feature => ({
            County: feature.properties.County,
            Median_AQI: feature.properties.Median_AQI
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

    // Create the trace for the plot
    const trace = {
        x: names,
        y: values,
        type: "bar"
    };

    // Render the plot
    const layout = {
        title: selection === 'top' ? "Top 10 Counties by AQI" : "Bottom 10 Counties by AQI",
        margin: {
            l: 75,
            r: 75,
            t: 100,
            b: 50
        }
    };

    Plotly.newPlot("plot", [trace], layout);
}

// Event listener for dropdown change
d3.selectAll("#selDataset").on("change", function() {
    const selectedValue = d3.select(this).property("value");
    updatePlotly(selectedValue);
});

// Initialize the dashboard
init();

