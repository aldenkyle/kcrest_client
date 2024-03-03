import './App.css';
import LeafletMap from "./components/LeafletMap"
//import { QueryBuilderFeels} from "./components/maputils";
import {useState} from 'react';
import {useMap} from 'react-leaflet'

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
console.log(window.React1)
console.log(window.React2);



export default function App() {
  const [clickState, setClickState] = useState(false);
  const [country, setCountry] = useState([]);
  const toggle=()=>{
      setClickState(!clickState)
      //console.log(clickState)
  
  }
 
  return (
    <><div className="App">
      <div id="map-space">
      <LeafletMap ></LeafletMap>
      </div>
    </div></>
  );
}

