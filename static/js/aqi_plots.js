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

       
        const dropdown = d3.select("#selDatasetCounties");

// Clear any existing options
dropdown.html('');

// Add "Top 10 Counties" and "Bottom 10 Counties" options
dropdown.append("option").text("Top 10 Counties").attr("value", "top");
dropdown.append("option").text("Bottom 10 Counties").attr("value", "bottom");

        // Default to 'top' when the page loads
        updateCountiesPlotly('top'); 
    });
}

// Function to update the plot based on dropdown selection
function updateCountiesPlotly(selection) {
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
        names.push(`${sortedData[i].County}, ${sortedData[i].State}`);
        values.push(sortedData[i].Median_AQI);
    }

    // Create the trace for the plot
    const trace = {
        x: names,
        y: values,
        type: "bar",
        marker: {
            color: selection === 'top' ? 'green' : 'red'  // Conditionally set the bar color
        }
    };

    // Render the plot
    const layout = {
        title: selection === 'top' ? "Top 10 Counties by Median AQI" : "Bottom 10 Counties by Median AQI"
        // margin: {
        //     l: 75,
        //     r: 75,
        //     t: 100,
        //     b: 115
        // }
    };

    Plotly.newPlot("plot", [trace], layout);
}
// Function to handle dropdown change
function optionChanged() {
    const selection = document.getElementById("selDatasetCounties").value;
    updateCountiesPlotly(selection); // Call the update function based on the selection
}
// Event listener for dropdown change
d3.selectAll("#selDatasetCounties").on("change", function() {
    const selectedValue = d3.select(this).property("value");
    updateCountiesPlotly(selectedValue);  // Calls the plot update based on the selected value
});

// Initialize the dashboard
init();
