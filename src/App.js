import './App.css';
import LeafletMap from "./components/LeafletMap"
//import { QueryBuilderFeels} from "./components/maputils";
import {useState} from 'react';


export default function App() {
  return (
    <><div className="App">
      <div id="map-space">
      <LeafletMap ></LeafletMap>
      </div>
    </div></>
  );
}

