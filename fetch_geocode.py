import csv
import requests
import time
from config import email_address

# Input and output CSV file paths
input_csv = 'datasets/annual_aqi_by_county_2024.csv'
output_csv = 'datasets/updated_aqi_data_with_lat_lon.csv'

# Define Nominatim URL for geocoding
nominatim_url = 'https://nominatim.openstreetmap.org/search'

# Function to get lat/lon from Nominatim
def get_lat_lon(county, state):
    try:
        params = {
            'county': county,
            'state': state,
            'format': 'json'
        }
        headers = {
            'User-Agent': 'MyPythonApp/1.0 (email_address)'  # Use your email or a valid identifier
        }
        response = requests.get(nominatim_url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()

        if data and len(data) > 0:
            lat = data[0]['lat']
            lon = data[0]['lon']
            print(f"Fetched lat/lon for {county}, {state}: {lat}, {lon}")
            return lat, lon
        else:
            print(f"No results for {county}, {state}")
            return None, None
    except Exception as e:
        print(f"Error fetching geocode for {county}, {state}: {e}")
        return None, None


# Read the original CSV and write a new one with lat/lon
with open(input_csv, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    fieldnames = reader.fieldnames + ['latitude', 'longitude']  # Add new fields
    rows = []

    # Iterate over each row and fetch lat/lon
    for row in reader:
        county = row['County']
        state = row['State']

        # Fetch latitude and longitude using the Nominatim API
        lat, lon = get_lat_lon(county, state)

        if lat and lon:
            row['latitude'] = lat
            row['longitude'] = lon
        else:
            row['latitude'] = ''
            row['longitude'] = ''
        
        # Add updated row to the rows list
        rows.append(row)

        # Sleep for 1 second to respect Nominatim's rate limits
        time.sleep(1)

# Write the updated data to a new CSV file
with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Updated CSV with latitude and longitude saved to {output_csv}")
