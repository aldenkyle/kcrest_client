import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON, Popup, CircleMarker } from "react-leaflet";
import L from 'leaflet';
import ReactDOMServer from "react-dom/server";
import * as topojson from "topojson-client";
//It is important to import leaflet styles in your component
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

const getColor = (feelVal) => {
  if (feelVal === 0) return "#ef3c42";
  if (feelVal === 1) return "#f25e40";
  if (feelVal === 2) return  "#f2823a";
  if (feelVal === 3) return  "#f69537";
  if (feelVal === 4) return  "#ff4aa2f";
  if (feelVal === 5) return  "#f6c137";
  if (feelVal === 6) return  "#fad435";
  if (feelVal === 7) return  "#fdf32f";
  if (feelVal === 8) return  "#ffff2d";
};


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
    return <GeoJSON data={data} pathOptions={{fillcolor:'gray', opacity:.8, color:'white', fillOpacity:0, weight:5}}/>;
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
    return <GeoJSON data={data}  pathOptions={{fillcolor:'blue', opacity:0, color:'#55A9C2', fillOpacity:.5, weight:0}} />;
  } else {
    return null;
  }
};

const Trails = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/trails");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data);
  
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{opacity:1, color:'#897044', weight:2, dashArray: '5, 5', dashOffset: '10'}}  />;
  } else {
    return null;
  }
};

const Contours = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/contours");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data}  pathOptions={{opacity:1, color:'#448970', weight:.3}} />;
  } else {
    return null;
  }
};

const Roads = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/roads");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{opacity:1, color:'gray', weight:3}} />;
  } else {
    return null;
  }
};

const Parking = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/parking");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data}  pathOptions={{fillcolor:'gray', opacity:1, color:'gray', fillOpacity:1, weight:0}} />;
  } else {
    return null;
  }
};


const Buildings = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/buildings");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data );

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{fillcolor:'#C1A789', opacity:1, color:'#C1A789', fillOpacity:1, weight:0}} />;
  } else {
    return null;
  }
};

const Buffer = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/buffer");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data );

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{fillcolor:'white', opacity:1, color:'white', fillOpacity:1, weight:0}} />;
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
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
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
    function OnEachPOI(poi, layer)  {
      console.log("help")
    }
    return <GeoJSON data={data.features} />;
  } else {
    return null;
  }
};




const Feels = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/feels");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0].json_build_object)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log( data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data}/> ;
  } else {
    return null;
  }
};


// Using the GeoJSON tag in a Map container
const LeafletMap = () => {

  const [center, setCenter] = useState({ lat: 38.95672363296182, lng: -77.04749867734917 });
  const zoomLevel = 14;
  return (
    <MapContainer center={center} zoom={zoomLevel} maxZoom={35}> 
      {/*The LayersControl tag help us organize our layers into baselayers and tilelayers*/}
      <LayersControl position="topright">
        {/*Using an OpenStreetMap basemap as a basemap*/}
        <LayersControl.BaseLayer name="ESRI Imagery" checked>
          <TileLayer
            attribution='&copy'
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
            opacity={0.3} />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Park Boundary" checked>
          <BoundaryData />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Rock Creek" checked>
          <WaterData />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Trails" checked>
          <Trails />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="10 Foot Contours" checked>
          <Contours />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Parking" checked>
          <Parking />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Buildings" checked>
          <Buildings />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Roads" checked>
          <Roads />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="POIs" checked>
          <POIs />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Buffer" checked>
          <Buffer />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="User Provided Feelings" checked>
          <Feels />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );

};
export default LeafletMap;

