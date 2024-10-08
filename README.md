# Air Quality Index

## Project Overview
Our group focused on researching air quality across the United States. We found databases via the EPA and leveraged their Air Quality System (AQS) 
API to get Air Quality Index (AQI) data by county and state in order to produce our maps and charts. The EPS provides data for multiple years, 
but we focused on 2024 data since we had over 1,000 data sets to work with. The AQI data includes information on healthy days, unhealthy days, 
hazardous days, max AQI, media AQI, and more. The data was collected up through August 20th, 2024. This data can help users determine the air quality across the United States and the number of days with
unhealthy air. 

In order to use the CSV data we downloaded, we first had to convert the state and county locations in the file into longitude and latitude. 
We used the Nominatim documentation and library to convert our location (county and state) data. Once we had the updated locations, we converted
the CSV file into a GeoJSON file using GeoPandas and coding support from Chat GPT. We ran this code in Jupyter Notebook and saved a new file 
with the GeoJSON data. 

Once we had our GeoJSON data complete, we uploaded our GeoJSON file into MongoDB to store the data and created a Flask API via Visual Studio Code
to meet the project's requirements. We also used the GeoJSON data file to upload the data directly into our GitHub repository so we could make a raw
data file link, which we used as an API for the project materials. 

Once we had our data and data links, we began coding our webpage using Visual Studio Code. We started to format our page by creating an HTML file to 
hold our map and charts and a CSS file to format the overall page. We created separate JS files for our map and our plots to input the JavaScript coding
into our overall HTML file.

For the map, we used OpenStreetMap, Esri, and Leaflet to map various air quality data points for the counties in our dataset. We added options for users to add
the following overlays: a heatmap, a satellite map, a street map, and markers. The markers are formatted so users of the map can easily tell when each county
ranks by air quality using the colored-coded index, with green being the best and dark red being the worst.

For the first two charts, we used D3 and Plotly to pull in Median_AQI data for each county in our dataset. We created two bar graphs—one for the top ten
counties with the lowest median air quality (highest AQI) and one for the top ten counties with the highest median air quality (lowest AQI). We used the 
median values because there are multiple data points per state and some per county, so the median gives us a better estimate of the overall air quality 
of each location.

For the second two charts, we used D3 and Plotly to pull the average Median_AQI for each state. Similar to the county charts, we created charts for the 
top ten and bottom ten states. Because there are multiple counties per state, we decided to find the average Median_AQI for these charts so the results 
would give a bigger picture per state. 

Once we had our basic chart structure, we decided to add some additional formatting to each plot by making the top ten green to reflect better-quality air 
and the bottom ten red to reflect poor-quality air. We also moved our drop-down bottoms to be within each chart so it would be more user-friendly.

## Instructions on how to use and interact with the site
Users can find our map at https://vokouns.github.io/usa-aqi-map/

Users can interact with the map on our site to find various AQI data points across the United States for 2024 based on county and state locations. They can
pull up different map layers to see street views and satellite views and toggle between heatmap views and AQI markers. Users can also interact with charts 
at the bottom of the page showing the top ten median AQI locations, the bottom ten median AQI locations per county, the top ten average median AQI per state, 
and the bottom ten average median AQI to see the best and poorest air quality locations.

## References for the data source(s)
We used air quality data provided by the EPA: https://aqs.epa.gov/aqsweb/airdata/download_files.html.

Background photo downloaded from Shutterstock: https://www.shutterstock.com/images


## References for any code used that is not your own
OpenStreetMap API resource for location conversions: https://nominatim.openstreetmap.org/ui/search.html & 
https://nominatim.org/release-docs/develop/api/Overview/ - utilized Nominatim documentation and OpenAI ChatGPT 
(11/30/22) support to convert location information into latitude and longitude coordinates.

Converting CSV data into GeoJSON data: https://geopandas.org/en/stable/ - utilized GeoPandas documentation and OpenAI 
ChatGPT (11/30/22) support to convert CSV data into GeoJSON data.

Resource for creating flask documentation and coding: https://flask.palletsprojects.com/en/3.0.x/

Utilized TA support during class time to get advice and troubleshoot any coding errors we were stuck on.