import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
//It is important to import leaflet styles in your component
import "leaflet/dist/leaflet.css";
const BoundaryData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/boundary");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //console.log(jsonData)
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(JSON.parse(jsonData[0].st_asgeojson));

    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log(data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} />;
  } else {
    return null;
  }
};

const WaterData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/water");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //console.log(jsonData)
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(JSON.parse(jsonData[0].st_asgeojson));

    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log(data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} />;
  } else {
    return null;
  }
};

const POIs = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/pois");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      console.log(jsonData)
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log( data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} />;
  } else {
    return null;
  }
};


// Using the GeoJSON tag in a Map container
const LeafletMap = () => {

  const [center, setCenter] = useState({ lat: 38.95672363296182, lng: -77.04749867734917 });
  const zoomLevel = 14;
  return (
    <MapContainer center={center} zoom={zoomLevel}>
      {/*The LayersControl tag help us organize our layers into baselayers and tilelayers*/}
      <LayersControl position="topright">
        {/*Using an OpenStreetMap basemap as a basemap*/}
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Park Boundary" unchecked>
          <BoundaryData />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Rock Creek" checked>
          <WaterData />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="POIs" checked>
          <POIs />
        </LayersControl.Overlay>
      </LayersControl>

    </MapContainer>
  );
};
export default LeafletMap;