import { React, useState, useEffect, useRef, cloneElement,forwardRef } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON, Popup, CircleMarker,useMap,FeatureGroup, Marker, LayerGroup,Tooltip } from "react-leaflet";
import { onEachTrail,LocationFinderDummy ,getFeelColor,getHexColor,onEachRoad,onEachContour, onEachHex} from "./maputils";
//import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import { GoogleProvider, OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/geosearch.css';
import icon from 'leaflet/dist/images/marker-icon.png';



//It is important to import leaflet styles in your component
import "leaflet/dist/leaflet.css";
import "./MyMap.css";




const urlToQuery = () => {
  var cntry = document.getElementById('country').value;
  var urlQ = "http://localhost:3000/all";
  if (cntry == 'Ghana')
  {urlQ = "http://localhost:3000/ghana" }
  else if (cntry == 'Senegal')
  {urlQ = "http://localhost:3000/senegal" }
  else if (cntry == 'Liberia')
  {urlQ = "http://localhost:3000/liberia" }
  else if (cntry == 'Kenya')
  {urlQ = "http://localhost:3000/kenya" }
  else if (cntry == 'Rwanda')
  {urlQ = "http://localhost:3000/rwanda" }
  else if (cntry == 'Tanzania')
  {urlQ = "http://localhost:3000/tanzania" }
  else if (cntry == 'Mozambique')
  {urlQ = "http://localhost:3000/mozambique" }
  else if (cntry == 'Malawi')
  {urlQ = "http://localhost:3000/malawi" }
  else if (cntry == 'Madagascar')
  {urlQ = "http://localhost:3000/madagascar" }
  else if (cntry == 'Zambia')
  {urlQ = "http://localhost:3000/zambia" }
  else
  {urlQ = "http://localhost:3000/all" }
  console.log(urlQ)
  return urlQ
}

const zoomLevelVar = (country) => {
  var cntry = country;
  var urlQ = 6;
  if (cntry == 'Ghana')
  {urlQ = 7 }
  else if (cntry == 'Senegal')
  {urlQ = 7 }
  else if (cntry == 'Liberia')
  {urlQ = 8 }
  else if (cntry == 'Kenya')
  {urlQ = 6 }
  else if (cntry == 'Rwanda')
  {urlQ = 9 }
  else if (cntry == 'Tanzania')
  {urlQ = 6 }
  else if (cntry == 'Mozambique')
  {urlQ = 6 }
  else if (cntry == 'Malawi')
  {urlQ = 7}
  else if (cntry == 'Madagascar')
  {urlQ = 6 }
  else if (cntry == 'Zambia')
  {urlQ = 6 }
  else
  {urlQ = 4 }
  return urlQ
}

const latCent = (country) => {
  var cntry = country;
  var urlQ = -1;
  if (cntry == 'Ghana')
  {urlQ = 7.965234 }
  else if (cntry == 'Senegal')
  {urlQ = 14.362423 }
  else if (cntry == 'Liberia')
  {urlQ = 6.447149 }
  else if (cntry == 'Kenya')
  {urlQ = 0.558101 }
  else if (cntry == 'Rwanda')
  {urlQ = -2.001052 }
  else if (cntry == 'Tanzania')
  {urlQ = -6.263001 }
  else if (cntry == 'Mozambique')
  {urlQ = -17.259122 }
  else if (cntry == 'Malawi')
  {urlQ = -13.211085}
  else if (cntry == 'Madagascar')
  {urlQ = -19.384331 }
  else if (cntry == 'Zambia')
  {urlQ = -13.456343 }
  else
  {urlQ = -1 }
  return urlQ
}

const lonCent = (country) => {
  var cntry = country;
  var urlQ = 20;
  if (cntry == 'Ghana')
  {urlQ = -1.206203 }
  else if (cntry == 'Senegal')
  {urlQ = -14.467627 }
  else if (cntry == 'Liberia')
  {urlQ = -9.309511 }
  else if (cntry == 'Kenya')
  {urlQ = 37.845552 }
  else if (cntry == 'Rwanda')
  {urlQ = 29.925426 }
  else if (cntry == 'Tanzania')
  {urlQ = 34.819776 }
  else if (cntry == 'Mozambique')
  {urlQ = 35.552121 }
  else if (cntry == 'Malawi')
  {urlQ = 34.302515}
  else if (cntry == 'Madagascar')
  {urlQ = 46.697973 }
  else if (cntry == 'Zambia')
  {urlQ = 27.79609 }
  else
  {urlQ = 20 }
  return urlQ
}




const KcrestCountries = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/all");

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
    return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
  } else {
    return null;
  }
};

const KcrestFeaturesFront = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/all");

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
    return <GeoJSON data={data}  onEachFeature={onEachHex}  pathOptions={{opacity:0, fillColor:'white', color:'#dcdee0', fillOpacity:0, weight:1, smoothFactor:.1}} />;
  } else {
    return null;
  }
};


const KcrestCountriesFront = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/kcrest_countries");

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
    return <GeoJSON data={data} pathOptions={{opacity:1, color:'white', fillOpacity:0, weight:1}} />;
  } else {
    return null;
  }
};



export function getMax(arr, prop) {
  var max;
  for (var i=0 ; i<arr.length ; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
  }
  return max;
}

const Hunger = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}   style={(feature) => {
      const hunger = feature.properties.hunger_1;
     // console.log(fcount)
      return {
        color: "#3C4F76",
        weight: 0, 
        fillOpacity: hunger/100,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});
const Stunting = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
     // console.log(fcount)
      return {
        color: "#005F73",
        weight: 0, 
        fillOpacity: stunting/50,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});

const Wasting = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
     // console.log(fcount)
      return {
        color: "#0A9396",
        weight: 0, 
        fillOpacity: wasting/15,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});


const Under5Mort = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
     // console.log(fcount)
      return {
        color: "#94D2BD",
        weight: 0, 
        fillOpacity: u5mort/142,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});

const Conflict = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const viol = feature.properties.count_viol;
     // console.log(fcount)
      return {
        color: "#BB3E03",
        weight: 0, 
        fillOpacity: viol/50,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});


const Literacy = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/100,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});


const Handwashing = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const viol = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: viol/70,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});


const AgPotential = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const viol = feature.properties.agpotentia;
     // console.log(fcount)
      return {
        color: "#354d36",
        weight: 0, 
        fillOpacity: viol/50000,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});



const Traveltime = forwardRef((undefined, wastingRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const viol = feature.properties.timeperper;
     // console.log(fcount)
      return {
        color: "#66507d",
        weight: 0, 
        fillOpacity: viol/120,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});



const Poverty = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery(country));

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const poverty = feature.properties.gsap_pov21;
     // console.log(fcount)
      return {
        color: "#9B2226",
        weight: 0, 
        fillOpacity: poverty/100,
        smoothFactor: .1
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});

const FeelsHex = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(urlToQuery());

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
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const fcount = feature.properties.feelcount;
     // console.log(fcount)
      return {
        color: "#431682",
        weight: 0, 
        fillOpacity: fcount/250
      };}} 
    eventHandlers={{
      add: (e) => {
        console.log("Added Layer:", e.target);
      },
      remove: (e) => {
        console.log("Removed layer:", e.target);
      }
    }} /> ;
  } else {
    return null;
  }
});


// make new leaflet element
const Search = (props) => {
  const map = useMap() // access to leaflet map
  const { provider } = props

  useEffect(() => {
      const searchControl = new GeoSearchControl({
          provider,
          showMarker: false,
      })

      map.addControl(searchControl) // this is how you add a control in vanilla leaflet
      return () => map.removeControl(searchControl)
  }, [props])

  return null // don't want anything to show up from this comp
}





// Using the GeoJSON tag in a Map container
const LeafletMap = () => {

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const feelRef = useRef()
  const popRef = useRef()
  const layersRef = useRef();
  const [feelState, setFeeltate] = useState(false);
  const hungerRef = useRef();
  const [hungerState, setHungerState] = useState(false);
  const stuntingRef = useRef();
  const [stuntingState, setStuntingState] = useState(false);
  const wastingRef = useRef();
  const [wastingState, setWastingState] = useState(false);
  const u5mortRef = useRef();
  const [u5mortState, setU5MortState] = useState(false);
  const conflictRef = useRef();
  const [conflictState, setConflictState] = useState(false);
  const literacyRef = useRef();
  const [literacyState, setLiteracyState] = useState(false);
  const handwashingRef = useRef();
  const [handwashingState, setHwashState] = useState(false);
  const povRef = useRef();
  const [PovState, setPovState] = useState(false);
  const travRef = useRef();
  const [travState, setTravState] = useState(false);
  const agpotRef = useRef();
  const [agpotState, setAgpotState] = useState(false);
  const [clickState, setClickState] = useState(false);
  const [infoState, setInfoState] = useState(false);
 
  const zoomToCountry = () => {
    const mapC = map;
    //mapC.removeLayer(povRef.current)
    console.log(layersRef.current)
    var country2 = document.getElementById('country').value
    var lat2 = latCent(country2)
    var lon2 = lonCent(country2)
    var zoom2 = zoomLevelVar(country2)
    mapC.setView([lat2,lon2],zoom2)
    console.log(country2)
    //var url = urlToQuery()
    //map.remove()
    //LeafletMap()
  }  
  
  const toggle=(clickState)=>{
      //console.log(clickState)
      setClickState(!clickState)};
      //console.log(clickState)

  const toggleInfo=()=>{
        setInfoState(!infoState)};


        
  const removeLayers = () => {
          const mapC = map;
          mapC.removeLayer(hungerRef.current)
          mapC.removeLayer(povRef.current)
          mapC.removeLayer(stuntingRef.current)
          mapC.removeLayer(wastingRef.current)
          mapC.removeLayer(handwashingRef.current)
          mapC.removeLayer(conflictRef.current)
          mapC.removeLayer(literacyRef.current)
          mapC.removeLayer(agpotRef.current)
          mapC.removeLayer(travRef.current)
          mapC.removeLayer(u5mortRef.current)
        }  

    const removeOutlines = () => {
        document.getElementsByClassName("button3")[0].classList.remove("test_skill");
        document.getElementsByClassName("button4")[0].classList.remove("test_skill");
        document.getElementsByClassName("button5")[0].classList.remove("test_skill");
        document.getElementsByClassName("button6")[0].classList.remove("test_skill");
        document.getElementsByClassName("button7")[0].classList.remove("test_skill");
        document.getElementsByClassName("button8")[0].classList.remove("test_skill");
        document.getElementsByClassName("button9")[0].classList.remove("test_skill");
        document.getElementsByClassName("button10")[0].classList.remove("test_skill");
        document.getElementsByClassName("button11")[0].classList.remove("test_skill");
        document.getElementsByClassName("button12")[0].classList.remove("test_skill");
        }  



  const toggleHunger = () => {
    const arr = [hungerState,stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    //console.log(count)
    //console.log(map)
    if (map && hungerRef.current && !hungerState) {
      const mapC = map;
      const hungerLayer = hungerRef.current;
      removeLayers()
      mapC.addLayer(hungerLayer);
      const feelLayer = feelRef.current;
      //feelLayer.bringToFront()
      const popLayer = popRef.current
      popLayer.bringToFront()
      setHungerState(!hungerState);
      removeOutlines()
      document.getElementsByClassName("button3")[0].classList.add("test_skill");
    } else if (map && hungerRef.current && hungerState) {
       const mapC = map;
      const hungerLayer = hungerRef.current;
      mapC.removeLayer(hungerLayer);
      const feelLayer = feelRef.current;
      //feelLayer.bringToFront()
      popRef.current.bringToFront()
      setHungerState(!hungerState);
      document.getElementsByClassName("button3")[0].classList.remove("test_skill");
    }
   
  };
  const toggleTrav = () => {
    const arr = [hungerState, travState, agpotState, stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    if (map && travRef.current && !travState) {
      const mapC = map;
      const travLayer = travRef.current;
      removeLayers()
      mapC.addLayer(travLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setTravState(!travState);
      removeOutlines()
      document.getElementsByClassName("button12")[0].classList.add("test_skill");
    } else if (map && travRef.current && travState) {
       const mapC = map;
      const travLayer = travRef.current;
      mapC.removeLayer(travLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setTravState(!travState);
      document.getElementsByClassName("button12")[0].classList.remove("test_skill");
    }
   
  };
  const toggleAgpot = () => {
    const arr = [hungerState,stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    if (map && agpotRef.current && !agpotState) {
      const mapC = map;
      const agpotLayer = agpotRef.current;
      removeLayers()
      mapC.addLayer(agpotLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAgpotState(!agpotState);
      removeOutlines()
      document.getElementsByClassName("button11")[0].classList.add("test_skill");
    } else if (map && agpotRef.current && agpotState) {
       const mapC = map;
      const agpotLayer = agpotRef.current;
      mapC.removeLayer(agpotLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAgpotState(!agpotState);
      document.getElementsByClassName("button11")[0].classList.remove("test_skill");
    }
   
  };

  const toggleStunting = () => {
    if (map && stuntingRef.current && !stuntingState) {
       const mapC = map;
      const stuntingLayer = stuntingRef.current;
      removeLayers()
      mapC.addLayer(stuntingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setStuntingState(!stuntingState);
      removeOutlines()
      document.getElementsByClassName("button4")[0].classList.add("test_skill");
    } else if (map && stuntingRef.current && stuntingState) {
       const mapC = map;
      const stuntingLayer = stuntingRef.current;
      mapC.removeLayer(stuntingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setStuntingState(!stuntingState);
      document.getElementsByClassName("button4")[0].classList.remove("test_skill");
    }
  };

  const toggleWasting = () => {
    if (map && wastingRef.current && !wastingState) {
       const mapC = map;
      const wastingLayer = wastingRef.current;
      removeLayers()
      mapC.addLayer(wastingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setWastingState(!wastingState);
      removeOutlines()
      document.getElementsByClassName("button5")[0].classList.add("test_skill");
    } else if (map && wastingRef.current && wastingState) {
       const mapC = map;
      const wastingLayer = wastingRef.current;
      mapC.removeLayer(wastingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setWastingState(!wastingState);
      document.getElementsByClassName("button5")[0].classList.remove("test_skill");
    }
  };

  const toggleU5Mort = () => {
    if (map && u5mortRef.current && !u5mortState) {
       const mapC = map;
      const u5mortLayer = u5mortRef.current;
      removeLayers()
      mapC.addLayer(u5mortLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setU5MortState(!u5mortState);
      removeOutlines()
      document.getElementsByClassName("button6")[0].classList.add("test_skill");
    } else if (map && u5mortRef.current && u5mortState) {
       const mapC = map;
      const u5mortLayer = u5mortRef.current;
      mapC.removeLayer(u5mortLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setU5MortState(!u5mortState);
      document.getElementsByClassName("button6")[0].classList.remove("test_skill");
    }
  };

  const toggleConflict = () => {
    if (map && conflictRef.current && !conflictState) {
       const mapC = map;
      const conflictLayer = conflictRef.current;
      removeLayers()
      mapC.addLayer(conflictLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setConflictState(!conflictState);
      removeOutlines()
      document.getElementsByClassName("button7")[0].classList.add("test_skill");
    } else if (map && conflictRef.current && conflictState) {
       const mapC = map;
      const conflictLayer = conflictRef.current;
      mapC.removeLayer(conflictLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setConflictState(!conflictState);
      document.getElementsByClassName("button7")[0].classList.remove("test_skill");
    }
  };

  const toggleLiteracy = () => {
    if (map && literacyRef.current && !literacyState) {
       const mapC = map;
      const literacyLayer = literacyRef.current;
      removeLayers()
      mapC.addLayer(literacyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setLiteracyState(!literacyState);
      removeOutlines()
      document.getElementsByClassName("button8")[0].classList.add("test_skill");
    } else if (map && literacyRef.current && literacyState) {
       const mapC = map;
      const literacyLayer = literacyRef.current;
      mapC.removeLayer(literacyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setLiteracyState(!literacyState);
      document.getElementsByClassName("button8")[0].classList.remove("test_skill");
    }
  };

  const toggleHandwashing = () => {
    if (map && handwashingRef.current && !handwashingState) {
       const mapC = map;
      const handwashingLayer = handwashingRef.current;
      removeLayers()
      mapC.addLayer(handwashingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHwashState(!handwashingState);
      removeOutlines()
      document.getElementsByClassName("button9")[0].classList.add("test_skill");
    } else if (map && handwashingRef.current && handwashingState) {
       const mapC = map;
      const handwashingLayer = handwashingRef.current;
      mapC.removeLayer(handwashingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHwashState(!handwashingState);
      document.getElementsByClassName("button9")[0].classList.remove("test_skill");
    }
  };



  const togglePov = () => {
    if (map && povRef.current && !PovState) {
       const mapC = map;
      const povLayer = povRef.current;
      removeLayers()
      mapC.addLayer(povLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setPovState(!PovState);
      removeOutlines()
      document.getElementsByClassName("button10")[0].classList.add("test_skill");
    } else if (map && povRef.current && PovState) {
       const mapC = map;
      const povLayer = povRef.current;
      mapC.removeLayer(povLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setPovState(!PovState);
      document.getElementsByClassName("button10")[0].classList.remove("test_skill");
    }
  };

  const addInfo = () => {
  var x = document.getElementById("info-div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }}

  
  const addLegend = () => {
    var x = document.getElementById("legend");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }}
  

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    L.easyButton("fa-crosshairs", () => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 18);
      });
    }).addTo(map);

  }, [map]);

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    L.easyButton( "fa-map-marker", () => {
      setClickState(!clickState);
    }).addTo(map);

  }, [map]);


  const  PointsToFront = () => {
    setTimeout(function(){
      if (map && popRef.current) {
        const mapC = map;
        console.log("I'm fronting2")
        const feelLayer = popRef.current;
        mapC.removeLayer(feelLayer);
        mapC.addLayer(feelLayer);}
     },1000);
   }

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    L.easyButton("fa-map", () => {
      addLegend()
    }).addTo(map);

  }, [map]);

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    console.log(map)
    L.easyButton("fa-info-circle", () => {
      addInfo()
    }).addTo(map);

  }, [map]);
 
  try{
    var country = document.getElementById('country').value()
    }catch(e){
    var country = 'all';
    }

  //console.log("in LM" + JSON.stringify(clickState.tog))
  const [center, setCenter] = useState({ lat: latCent(country), lng: lonCent(country) });
  const zoomLevel = zoomLevelVar(country);
  return (
    <>
    <div id="head-desc" style={{zIndex: 20000, position: "absolute", top: 1, left: 0, width: "100%"}}>
      <h1>Scenario Builder for Development Programs<br></br>
        Select a Country:  
      <select name="country" id="country">
        <option value="Ghana">Ghana</option>
        <option value="Liberia">Liberia</option>
        <option value="Kenya" >Kenya</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Senegal">Senegal</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Zambia">Zambia</option>
        <option value="all" selected>Select a Country</option>
      </select> 
      <button class="button button13" onClick={zoomToCountry} type="button"> Go </button>
      </h1>
      </div>

    <MapContainer  ref={setMap} center={center} zoom={zoomLevel} maxZoom={21} tapTolerance={1}  >  
    <LocationFinderDummy tog={clickState} />
      {/*The LayersControl tag help us organize our layers into baselayers and tilelayers*/}
      <TileLayer
            attribution='Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}"
            opacity={0.5} 
            maxZoom={21}/>
      <TileLayer
            attribution='Esri &mdash; Source: DCGIS&copy'
            url="https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Ortho2019_WebMercator/MapServer/tile/{z}/{y}/{x}"
            opacity={0.5}
            maxZoom={21} />     
      <KcrestCountries />
      <LayersControl ref={layersRef} position="topright">
        <LayersControl.Overlay name="Poverty" checked>
          <LayerGroup id='povG' ref={povRef} ><Poverty /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger" unchecked>
        <LayerGroup id='hungerG' ref={hungerRef} ><Hunger /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City" unchecked>
        <LayerGroup id='travG' ref={travRef} ><Traveltime /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential" unchecked>
        <LayerGroup id='agG' ref={agpotRef} ><AgPotential /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary" unchecked>
          <LayerGroup id='stuntingG' ref={stuntingRef} ><Stunting /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary" unchecked>
          <LayerGroup id='wastingG' ref={wastingRef} ><Wasting /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality" unchecked>
          <LayerGroup id='u5mortG' ref={u5mortRef} ><Under5Mort /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events" unchecked>
          <LayerGroup id='conflictG' ref={conflictRef} ><Conflict /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy" unchecked>
          <LayerGroup id='literacyG' ref={literacyRef} ><Literacy /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station" unchecked>
          <LayerGroup id='handwashingG' ref={handwashingRef} ><Handwashing /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries" checked>
          <FeatureGroup id='countG' ref={feelRef} ><KcrestCountriesFront /></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Features" checked>
          <FeatureGroup id='popG' ref={popRef} ><KcrestFeaturesFront /></FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <PointsToFront/>
      <Search provider={new OpenStreetMapProvider({ })} />
    </MapContainer>
    <div id="info-div" style={{display:"none"}}><button id="close" class="button close" onClick={addInfo}>x</button><text class="p1">{"\n"}This tool allows international development practitioners to develop scenarios regarding where they will target international development programs. The tool will also allow users to visualize several key development indicators and summarize them across subsets of administrative areas in their countries of interest. Finally, it will allow users to save scenarios so that they can retrieve those scenarios and review them multiple times. The goal is to ensure that development practitioners have easy access to, and are using, high quality quantitative data as a determinant in their decision making about where to invest their limited resources.  If you have questions please reach out to Kyle Alden at kyle.alden@gmail.com{"\n "}</text></div> 
    <div id="bottom-desc" style={{zIndex: 19999, position: "absolute", bottom: 36, left: 1, width: "100%", textAlign: "center"}}>
    <button class="button button10"  onClick={togglePov} type="button">Poverty</button>   
    <button class="button button3"  onClick={toggleHunger} type="button">Hunger</button> 
    <button class="button button4"  onClick={toggleStunting} type="button">Stunting</button> 
    <button class="button button5"  onClick={toggleWasting} type="button">Wasting</button> 
    <button class="button button6"  onClick={toggleU5Mort} type="button">Under 5 Mortality</button> 
    <button class="button button7"  onClick={toggleHandwashing} type="button">Access to Handwashing</button> 
    <button class="button button8"  onClick={toggleLiteracy} type="button">Women's Literacy</button> 
    <button class="button button9"  onClick={toggleConflict} type="button">Conflict Events</button> 
    <button class="button button11"  onClick={toggleAgpot} type="button">Agricultural Potential</button> 
    <button class="button button12"  onClick={toggleTrav} type="button">Avg. Travel Time to Cities</button> </div>
    <div id="legend" style={{display:"none"}}><button id="close" class="button close" onClick={addLegend}>x</button><b>Legend</b><br></br><br></br>
    <i style={{background:"#9B2226"}}></i><span2>Poverty</span2><br></br>
    <i style={{background:"#3C4F76"}}></i><span2>Hunger</span2><br></br>
    <i style={{background:"#005F73"}}></i><span2>Stunting</span2><br></br>
    <i style={{background:"#0A9396"}}></i><span2>Wasting</span2><br></br>
    <i style={{background:"#94D2BD"}}></i><span2>Under 5 Mortality</span2><br></br>
    <i style={{background:"#b8a004"}}></i><span2>Access to Basic Handwashing Station</span2><br></br>
    <i style={{background:"#EE9B00"}}></i><span2>Women's Literacy</span2><br></br>
    <i style={{background:"#BB3E03"}}></i><span2>Count of Conflict Events</span2><br></br>
    <i style={{background:"#354d36"}}></i><span2>Agricultural Potential</span2><br></br>
    <i style={{background:"#66507d"}}></i><span2>Avg. Travel Time to Cities</span2><br></br>
    <i class="i2" style={{background:"#363533"}}></i><span2>Points of Interest</span2><br></br>
    <text class="i3" style={{color:"#ab985e", fontWeight:"bold", fontSize:"20px"}}>- - </text><span2>Trails</span2><br></br>
    <i class="i4" style={{background:"gray"}}></i><span2>Roads</span2><br></br>

    </div>
    </>
  );
  
};
export default LeafletMap;

