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

        // Sort the states by average AQI
        const sortedData = avgStateAQIData.sort((a, b) => a.avgAQI - b.avgAQI);

        // Get the top 10 and bottom 10 states by AQI
        const top10States = sortedData.slice(1, 11);  // Top 10 with the lowest AQI
        const bottom10States = sortedData.slice(-10).reverse().slice(1);  // Bottom 10 with the highest AQI

        // Prepare data for the plot
        const topStatesNames = top10States.map(state => state.State);
        const topStatesAQI = top10States.map(state => state.avgAQI);

        const bottomStatesNames = bottom10States.map(state => state.State);
        const bottomStatesAQI = bottom10States.map(state => state.avgAQI);

        // Create the traces for Top 10 and Bottom 10
        const topTrace = {
            x: topStatesNames,
            y: topStatesAQI,
            type: 'bar',
            name: 'Top 10 States',
            marker: { color: 'green' },
            visible: true  // Initially visible
        };

        const bottomTrace = {
            x: bottomStatesNames,
            y: bottomStatesAQI,
            type: 'bar',
            name: 'Bottom 10 States',
            marker: { color: 'red' },
            visible: false  // Initially hidden
        };

        // Plotly layout with dropdown menu inside the chart
        const layout = {
            title: 'Top 10 and Bottom 10 States by Average AQI',
            xaxis: { title: 'States' },
            yaxis: { title: 'Average AQI' },
            updatemenus: [{
                buttons: [
                    {
                        method: 'update',
                        label: 'Top 10 States',
                        args: [{'visible': [true, false]}],  // Show top 10, hide bottom 10
                    },
                    {
                        method: 'update',
                        label: 'Bottom 10 States',
                        args: [{'visible': [false, true]}],  // Hide top 10, show bottom 10
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

        // Render the bar chart using Plotly
        Plotly.newPlot("plotstate", [topTrace, bottomTrace], layout);
    }).catch(function (error) {
        console.log("Error loading the GeoJSON file:", error);
    });
}

// Initialize the dashboard
init();