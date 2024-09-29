# Air Quality Index

## Project Overview
Our group focused on researching air quality across the United States. We found databases via the EPA and leveraged their Air Quality System (AQS) API to get Air Quality Index (AQI) data by county and state in order to produce our maps and charts. The EPS provides data for multiple years, but we focused on 2024 data since we had over 1,000 data sets to work with. The AQI data includes information on healthy days, unhealthy days, hazardous days, max AQI, media AQI, and more. This data can help users determine the air quality across the United States and the number of days with unhealthy air. 

In order to use the CSV data we downloaded, we first had to convert the state and county locations in the file into longitude and latitude. We used Nominatim via XXX to convert our data. Once we had the updated locations, we converted the CSV file into a GeoJSON file using GeoPandas and coding support from Chat GPT. We ran this code in Jupyter Notebook and saved a new file with the GeoJSON data. 

Once we had our GeoJSON data complete, we uploaded our GeoJSON file into MongoDB to store the data and created a Flask API via Visual Studio Code to meet the requirements of the project. We also used the GeoJson data file to upload the data directly into our GitHub repository so we could make a raw data file link which we used as an API the project materials. 

Once we had our data and data links, we began coding our webpage using Visual Studio Code. We began to format our page by creating an HTML file to hold our map and charts and a CSS file to format the overall page. We created our JS file to input the JavaScript coding for the map and charts.

## Instructions on how to use and interact with the site
Users can interact with the map to find AQI indexes across the United States for 2024 based on county location. Users can interact with the site by pulling up map layers of street view maps and topography maps. Users can also interact with charts at the bottom of the page showing the top ten median AQI locations and the bottom ten median AQI locations.

## Ethical considerations made in the project


## References for the data source(s)
We used air quality data provided by the EPA: https://aqs.epa.gov/aqsweb/airdata/download_files.html. 



## References for any code used that is not your own
OpenStreetMap API resource for location conversions: https://nominatim.openstreetmap.org/ui/search.html & https://nominatim.org/release-docs/develop/api/Overview/ - utilized Nominatim documentation and OpenAI ChatGPT (11/30/22) support to convert location information into latitude and longitude coordinates.

Converting CSV data into GeoJSON data: https://geopandas.org/en/stable/ - utilized GeoPandas documentation and OpenAI ChatGPT (11/30/22) support to convert CSV data into GeoJSON data.

Resource for creating flask documentation and coding: https://flask.palletsprojects.com/en/3.0.x/
