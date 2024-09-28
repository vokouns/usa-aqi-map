console.log(data);

// Sort the data by Median_AQI in ascending order
let sortedData = data.sort((a, b) => a.Median_AQI - b.Median_AQI);

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
Plotly.newPlot("plot", traceData, layout);
