# leaflet_challenge

# Earthquake Visualization Map

This project is a web-based application that visualizes earthquake data retrieved from the **USGS Earthquake API**. It uses the **Leaflet.js** library to render an interactive map, where each earthquake is represented by a marker. The **size** and **color** of the markers are determined by the earthquake's magnitude and depth, respectively.

---

## Project Structure

- **HTML**: Provides the basic structure for the project (`index.html`).
- **CSS**: Styles the map and the legend (`style.css`).
- **JavaScript**: Fetches and processes earthquake data, renders the map, and applies interactive features (`script.js`).

---

## Usage

1. Open the `index.html` file in a web browser.
2. The map will display earthquake data with interactive markers:
   - **Marker Size**: Reflects the earthquake's magnitude.
   - **Marker Color**: Reflects the earthquake's depth.

---

## Features

### 🌍 Real-Time Data
- Displays earthquake data from the past week, fetched directly from the **USGS GeoJSON API**.

### 🔵 Dynamic Marker Customization
- **Marker Size**: Scaled based on the earthquake's magnitude for visual significance.
- **Marker Color**: Indicates the depth of the earthquake:
  - Green: Shallow depth.
  - Red: Deep depth.

### 🗺️ Interactive Map
- **Clickable Markers**: Provide detailed earthquake information, including:
  - Location
  - Magnitude
  - Depth (in kilometers)
- **Geographic Positioning**: Markers are positioned based on earthquake coordinates.

### 📋 Legend
- A legend in the bottom-right corner explains the depth-to-color mapping, making it easier to interpret earthquake depth at a glance.

---

## How It Works

1. **Initialization**:
   - A **Leaflet.js** map is created and centered with a zoom level of 2 to display the entire world map.
   
2. **Data Fetching**:
   - Earthquake data is retrieved in **GeoJSON** format from the USGS API.

3. **Marker Rendering**:
   - Each earthquake is represented by a circle marker:
     - **Size**: Corresponds to the magnitude.
     - **Color**: Represents the depth.

4. **Interactive Popups**:
   - Markers include popups displaying:
     - Earthquake location
     - Magnitude
     - Depth (in kilometers)

5. **Legend Creation**:
   - A legend is dynamically added to the bottom-right corner, explaining the depth-to-color mapping.

---
