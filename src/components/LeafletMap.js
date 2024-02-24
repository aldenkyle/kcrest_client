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



const BoundaryData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/boundary");

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


const BoundaryDataBack = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/boundary");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#9dc4a7', opacity:0, color:'#9dc4a7', fillOpacity:.1}}/>;
  } else {
    return null;
  }
};


const WaterData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/water");

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
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/trails");

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
    return <GeoJSON data={data} onEachFeature={onEachTrail} pathOptions={{opacity:1, color:'#ab985e', weight:2, dashArray: '5, 5', dashOffset: '10'}}  />;
  } else {
    return null;
  }
};


const Contours = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/contours");

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
    return <GeoJSON data={data} onEachFeature={onEachContour}  pathOptions={{opacity:1, color:'#448970', weight:.6}} />;
  } else {
    return null;
  }
};

const Roads = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/roads");

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
    return <GeoJSON data={data} onEachFeature={onEachRoad} pathOptions={{opacity:1, color:'gray', weight:3}} />;
  } else {
    return null;
  }
};

const Parking = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/parking");

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
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/buildings");

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
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/buffer");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'white', opacity:1, color:'white', fillOpacity:.6, weight:0}} />;
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

const Awestruck = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/awestruck");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      //console.log(jsonData[0])
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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#3C4F76', opacity:1, color:'#3C4F76', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Excited = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/excited");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#005F73', opacity:1, color:'#005F73', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Happy = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/happy");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#0A9396', opacity:1, color:'#0A9396', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Relaxed = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/relaxed");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#94D2BD', opacity:1, color:'#94D2BD', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Ambivalent = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/ambivalent");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#E9D8A6', opacity:1, color:'#E9D8A6', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Annoyed = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/annoyed");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#EE9B00', opacity:1, color:'#EE9B00', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Anxious = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/anxious");

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
    return <GeoJSON data={data} pathOptions={{fillcolor:'#BB3E03', opacity:1, color:'#BB3E03', fillOpacity:.6, weight:0}} />;
  } else {
    return null;
  }
};
const Fearful = forwardRef((undefined, fearRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/fearful");

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
    console.log(data)
    return  <GeoJSON data={data} pathOptions={{fillcolor:'#9B2226', opacity:1, color:'#9B2226', fillOpacity:.6, weight:0}} 
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

const FeelsHex = forwardRef((undefined, fearRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/feels-hex");

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
    console.log(data)
    return  <GeoJSON data={data}  onEachFeature={onEachHex}  style={(feature) => {
      const fcount = feature.properties.feelcount;
     // console.log(fcount)
      return {
        color: "#431682",
        weight: 0, 
        fillOpacity: fcount/5
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


const FearfulData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/fearful");

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
    console.log(data)
    return data;
  } else {
    return null;
  }
};


const POIs = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/pois");

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
    //console.log(data.features)
    const myPoints = data.features.map( (pt, index) => {
      const coord = [pt.geometry.coordinates[1], pt.geometry.coordinates[0]]
      const name = pt.properties.poiname
      //console.log(coord)
      return (
              <CircleMarker
                 key={'cm-' + index}
                 className={"myClass-" + index}
                 center={coord}
                 fillOpacity={1}
                 radius={4}
                 fillColor={'#363533'}
                 stroke={0}
               >
                 <Popup>
                   <span>{pt.properties.poiname}</span>
                 </Popup>
            </CircleMarker>
          )});
    return myPoints;
  } else {
    return null;
  }
};




const Feels = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/feels");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();
      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(jsonData[0].json_build_object);
      console.log(jsonData[0].json_build_object)
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
    //console.log(data.features)
    const myPoints = data.features.map( (pt, index) => {
      const coord = [pt.geometry.coordinates[1], pt.geometry.coordinates[0]]
      const feel = pt.properties.feeltext
      //console.log(feel)
      //console.log(coord)
      return (     
            <CircleMarker
                 key={'cm-' + index}
                 className={"myClass-" + index}
                 center={coord}
                 fillOpacity={1}
                 radius={6}
                 fillColor={getFeelColor(feel)}
                 weight={1}
                 color={'white'}
               >
                 <Popup>
                   <span style={{fontWeight:'bold', color:getFeelColor(feel)}}>{pt.properties.feeltext}:  </span><span style={{fontFamily:'bradley hand itc', fontSize:14, fontWeight:'bold'}}>   {pt.properties.story}</span>
                 </Popup>
            </CircleMarker>
                      )});
    return myPoints;
  } else {
    return null;
  }
};



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
  const feelRef = useRef();
  const [feelState, setFeeltate] = useState(false);
  const aweRef = useRef();
  const [aweState, setAweState] = useState(false);
  const exciteRef = useRef();
  const [exciteState, setExciteState] = useState(false);
  const happyRef = useRef();
  const [happyState, setHappyState] = useState(false);
  const relaxRef = useRef();
  const [relaxState, setRelaxState] = useState(false);
  const ambivRef = useRef();
  const [ambivState, setAmbivState] = useState(false);
  const annoyRef = useRef();
  const [annoyState, setAnnoyState] = useState(false);
  const anxRef = useRef();
  const [anxState, setAnxState] = useState(false);
  const fearRef = useRef();
  const [FearState, setFearState] = useState(false);
  const [clickState, setClickState] = useState(false);
  const [infoState, setInfoState] = useState(false);
 
  const toggle=(clickState)=>{
      console.log(clickState)
      setClickState(!clickState)};
      console.log(clickState)

  const toggleInfo=()=>{
        setInfoState(!infoState)};
  

        



  const toggleAwe = () => {
    const arr = [aweState,exciteState, happyState, relaxState,ambivState, annoyState, anxState, FearState ]
    const count = arr.filter(Boolean).length
    console.log(count)
    console.log(map)
    if (map && aweRef.current && !aweState) {
      const mapC = map;
      const aweLayer = aweRef.current;
      mapC.addLayer(aweLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAweState(!aweState);
      document.getElementsByClassName("button3")[0].classList.add("test_skill");
    } else if (map && aweRef.current && aweState) {
       const mapC = map;
      const aweLayer = aweRef.current;
      mapC.removeLayer(aweLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAweState(!aweState);
      document.getElementsByClassName("button3")[0].classList.remove("test_skill");
    }
   
  };

  const toggleExcite = () => {
    console.log(map)
    if (map && exciteRef.current && !exciteState) {
       const mapC = map;
      const exciteLayer = exciteRef.current;
      mapC.addLayer(exciteLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setExciteState(!exciteState);
      document.getElementsByClassName("button4")[0].classList.add("test_skill");
    } else if (map && exciteRef.current && exciteState) {
       const mapC = map;
      const exciteLayer = exciteRef.current;
      mapC.removeLayer(exciteLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setExciteState(!exciteState);
      document.getElementsByClassName("button4")[0].classList.remove("test_skill");
    }
  };

  const toggleHappy = () => {
    console.log(map)
    if (map && happyRef.current && !happyState) {
       const mapC = map;
      const happyLayer = happyRef.current;
      mapC.addLayer(happyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHappyState(!happyState);
      document.getElementsByClassName("button5")[0].classList.add("test_skill");
    } else if (map && happyRef.current && happyState) {
       const mapC = map;
      const happyLayer = happyRef.current;
      mapC.removeLayer(happyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHappyState(!happyState);
      document.getElementsByClassName("button5")[0].classList.remove("test_skill");
    }
  };

  const toggleRelaxed = () => {
    console.log(map)
    if (map && relaxRef.current && !relaxState) {
       const mapC = map;
      const relaxLayer = relaxRef.current;
      mapC.addLayer(relaxLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setRelaxState(!relaxState);
      document.getElementsByClassName("button6")[0].classList.add("test_skill");
    } else if (map && relaxRef.current && relaxState) {
       const mapC = map;
      const relaxLayer = relaxRef.current;
      mapC.removeLayer(relaxLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setRelaxState(!relaxState);
      document.getElementsByClassName("button6")[0].classList.remove("test_skill");
    }
  };

  const toggleAmbivalent = () => {
    console.log(map)
    if (map && ambivRef.current && !ambivState) {
       const mapC = map;
      const ambivLayer = ambivRef.current;
      mapC.addLayer(ambivLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAmbivState(!ambivState);
      document.getElementsByClassName("button7")[0].classList.add("test_skill");
    } else if (map && ambivRef.current && ambivState) {
       const mapC = map;
      const ambivLayer = ambivRef.current;
      mapC.removeLayer(ambivLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAmbivState(!ambivState);
      document.getElementsByClassName("button7")[0].classList.remove("test_skill");
    }
  };

  const toggleAnnoyed = () => {
    console.log(map)
    if (map && annoyRef.current && !annoyState) {
       const mapC = map;
      const annoyLayer = annoyRef.current;
      mapC.addLayer(annoyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAnnoyState(!annoyState);
      document.getElementsByClassName("button8")[0].classList.add("test_skill");
    } else if (map && annoyRef.current && annoyState) {
       const mapC = map;
      const annoyLayer = annoyRef.current;
      mapC.removeLayer(annoyLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAnnoyState(!annoyState);
      document.getElementsByClassName("button8")[0].classList.remove("test_skill");
    }
  };

  const toggleAnxious = () => {
    console.log(map)
    if (map && anxRef.current && !anxState) {
       const mapC = map;
      const anxLayer = anxRef.current;
      mapC.addLayer(anxLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAnxState(!anxState);
      document.getElementsByClassName("button9")[0].classList.add("test_skill");
    } else if (map && anxRef.current && anxState) {
       const mapC = map;
      const anxLayer = anxRef.current;
      mapC.removeLayer(anxLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setAnxState(!anxState);
      document.getElementsByClassName("button9")[0].classList.remove("test_skill");
    }
  };



  const toggleFear = () => {
    console.log(map)
    if (map && fearRef.current && !FearState) {
       const mapC = map;
      const fearLayer = fearRef.current;
      mapC.addLayer(fearLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setFearState(!FearState);
      document.getElementsByClassName("button10")[0].classList.add("test_skill");
    } else if (map && fearRef.current && FearState) {
       const mapC = map;
      const fearLayer = fearRef.current;
      mapC.removeLayer(fearLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setFearState(!FearState);
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
    console.log(map)
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
    console.log(map)
    L.easyButton( "fa-map-marker", () => {
      setClickState(!clickState);
    }).addTo(map);

  }, [map]);

  const  PointsToFront = () => {
    setTimeout(function(){
      if (map && feelRef.current) {
        const mapC = map;
        console.log("I'm fronting2")
        const feelLayer = feelRef.current;
        mapC.removeLayer(feelLayer);
        mapC.addLayer(feelLayer);}
     },2000);
   }


  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    console.log(map)
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

  //console.log("in LM" + JSON.stringify(clickState.tog))
  const [center, setCenter] = useState({ lat: 38.9555, lng: -77.04749867734917 });
  const zoomLevel = 14;
  return (
    <>
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
       <WaterData />
       <Trails />
       <Parking />
       <Buildings />
       <Roads />
       <Buffer />
       <BoundaryData />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Points of Interest" checked>
          <FeatureGroup><POIs /></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Combined Feelings" unchecked>
          <FeatureGroup><FeelsHex /></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="User Provided Experiences" checked>
          <FeatureGroup id='feelG' ref={feelRef}><Feels/></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="10 Foot Contours" unchecked>
          <Contours />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Awestruck Summary" unchecked>
        <LayerGroup id='aweG' ref={aweRef} ><Awestruck /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Excited Summary" unchecked>
          <LayerGroup id='exciteG' ref={exciteRef} ><Excited /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Happy Summary" unchecked>
          <LayerGroup id='happyG' ref={happyRef} ><Happy /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Relaxed Summary" unchecked>
          <LayerGroup id='relaxedG' ref={relaxRef} ><Relaxed /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Ambivalent Summary" unchecked>
          <LayerGroup id='ambivG' ref={ambivRef} ><Ambivalent /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Annoyed Summary" unchecked>
          <LayerGroup id='annoyG' ref={annoyRef} ><Annoyed /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Anxious Summary" unchecked>
          <LayerGroup id='anxG' ref={anxRef} ><Anxious /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Fearful Summary" unchecked>
          <LayerGroup id='fearG' ref={fearRef} ><Fearful /></LayerGroup>
          </LayersControl.Overlay>
      </LayersControl>
      <PointsToFront/>
      <Search provider={new OpenStreetMapProvider({ })} />
    </MapContainer>
    <div id="info-div" style={{display:"none"}}><button id="close" class="button close" onClick={addInfo}>x</button><text class="p1">{"\n"}We want to see how different places in Rock Creek Park make people feel. If you'd like to share your experience, click the map marker button on the left, then click anywhere in the park to tell us a story (or several) about your experiences in the park. If you have questions please reach out to Kyle Alden at kyle.alden@gmail.com{"\n "}</text></div> 
    <div id="bottom-desc" style={{zIndex: 19999, position: "absolute", bottom: 36, left: 1, width: "100%", textAlign: "center"}}>
    <button class="button button3"  onClick={toggleAwe} type="button">Awestruck</button> 
    <button class="button button4"  onClick={toggleExcite} type="button">Excited</button> 
    <button class="button button5"  onClick={toggleHappy} type="button">Happy</button> 
    <button class="button button6"  onClick={toggleRelaxed} type="button">Relaxed</button> 
    <button class="button button7"  onClick={toggleAmbivalent} type="button">Ambivalent</button> 
    <button class="button button8"  onClick={toggleAnnoyed} type="button">Annoyed</button> 
    <button class="button button9"  onClick={toggleAnxious} type="button">Anxious</button> 
    <button class="button button10"  onClick={toggleFear} type="button">Fearful</button>   </div>
    <div id="legend" style={{display:"none"}}><button id="close" class="button close" onClick={addLegend}>x</button><b>Legend</b><br></br><br></br>
    <i style={{background:"#3C4F76"}}></i><span2>Awestruck Experiences</span2><br></br>
    <i style={{background:"#005F73"}}></i><span2>Excited Experiences</span2><br></br>
    <i style={{background:"#0A9396"}}></i><span2>Happy Experiences</span2><br></br>
    <i style={{background:"#94D2BD"}}></i><span2>Relaxed Experiences</span2><br></br>
    <i style={{background:"#E9D8A6"}}></i><span2>Ambivalent Experiences</span2><br></br>
    <i style={{background:"#EE9B00"}}></i><span2>Annoyed Experiences</span2><br></br>
    <i style={{background:"#BB3E03"}}></i><span2>Anxious Experiences</span2><br></br>
    <i style={{background:"#9B2226"}}></i><span2>Fearful Experiences</span2><br></br>
    <i class="i2" style={{background:"#363533"}}></i><span2>Points of Interest</span2><br></br>
    <text class="i3" style={{color:"#ab985e", fontWeight:"bold", fontSize:"20px"}}>- - </text><span2>Trails</span2><br></br>
    <i class="i4" style={{background:"gray"}}></i><span2>Roads</span2><br></br>
    
    </div>
    </>
  );
  
};
export default LeafletMap;

