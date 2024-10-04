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

        // Store the data globally for later use
        window.aqiData = aqiData;

        // Initialize with the default 'Top 10 Counties'
        updateCountiesPlotly('top');
    });
}

// Function to update the plot based on dropdown selection
function updateCountiesPlotly(selection) {
    let sortedData;

    if (selection === 'top') {
        // Sort in ascending order for top 10 counties
        sortedData = window.aqiData.sort((a, b) => a.Median_AQI - b.Median_AQI).slice(0, 10);
    } else {
        // Sort in descending order for bottom 10 counties
        sortedData = window.aqiData.sort((a, b) => b.Median_AQI - a.Median_AQI).slice(0, 10);
    }

    const names = sortedData.map(county => `${county.County}, ${county.State}`);
    const values = sortedData.map(county => county.Median_AQI);

    // Create the trace for the plot
    const trace = {
        x: names,
        y: values,
        type: "bar",
        marker: {
            color: selection === 'top' ? 'green' : 'red'  // Conditionally set the bar color
        }
    };

    // Create the layout with a dropdown inside the chart
    const layout = {
        title: selection === 'top' ? "Top 10 Counties by Median AQI" : "Bottom 10 Counties by Median AQI",
        updatemenus: [{
            buttons: [
                {
                    method: 'update',
                    label: 'Top 10 Counties',
                    args: [{'visible': [true, false]}],  // Show Top 10, hide Bottom 10
                },
                {
                    method: 'update',
                    label: 'Bottom 10 Counties',
                    args: [{'visible': [false, true]}],  // Hide Top 10, show Bottom 10
                }
            ],
            direction: 'down',
            showactive: true,
            x: 0,
            xanchor: 'left',
            y: 1.15,
            yanchor: 'top'
        }]
    };

    // Render the plot using Plotly
    Plotly.newPlot("plot", [trace], layout);
}

// Initialize the dashboard
init();