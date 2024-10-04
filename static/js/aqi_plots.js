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
        updateCountiesPlotly();
    });
}

// Function to update the plot with both top 10 and bottom 10 counties
function updateCountiesPlotly() {
    // Sort in ascending order for top 10 counties
    const top10Counties = window.aqiData.sort((a, b) => a.Median_AQI - b.Median_AQI).slice(0, 10);

    // Sort in descending order for bottom 10 counties
    const bottom10Counties = window.aqiData.sort((a, b) => b.Median_AQI - a.Median_AQI).slice(0, 10);

    // Prepare data for Top 10 Counties
    const topNames = top10Counties.map(county => `${county.County}, ${county.State}`);
    const topValues = top10Counties.map(county => county.Median_AQI);

    // Prepare data for Bottom 10 Counties
    const bottomNames = bottom10Counties.map(county => `${county.County}, ${county.State}`);
    const bottomValues = bottom10Counties.map(county => county.Median_AQI);

    // Create the trace for Top 10 Counties
    const topTrace = {
        x: topNames,
        y: topValues,
        type: "bar",
        name: "Top 10 Counties",
        marker: {
            color: 'green'
        },
        visible: true // Initially show top 10
    };

    // Create the trace for Bottom 10 Counties
    const bottomTrace = {
        x: bottomNames,
        y: bottomValues,
        type: "bar",
        name: "Bottom 10 Counties",
        marker: {
            color: 'red'
        },
        visible: false // Initially hide bottom 10
    };

    // Create the layout with a dropdown inside the chart
    const layout = {
        title: "Top 10 and Bottom 10 Counties by Median AQI",
        xaxis: {
            automargin: true,  // Automatically adjust margins for x-axis labels
        },
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

    // Render the plot with both traces (Top 10 and Bottom 10 Counties)
    Plotly.newPlot("plot", [topTrace, bottomTrace], layout);
}

// Initialize the dashboard
init();