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


export const QueryBuilderFeels=(clickState3, clickState4)=> {
  console.log("I ran!")
  console.log(clickState3, clickState4)
}


export default function App() {
  const [clickState, setClickState] = useState(false);
  const [clickState3, setClickState3] = useState(false);
  const toggle=()=>{
      setClickState(!clickState)
      //console.log(clickState)
  
  }
  const toggle3=()=>{
    setClickState3(!clickState3)
    //console.log(clickState4)
    document.getElementsByClassName("button3")[0].addEventListener("click", function() {
      if (clickState3)
      {this.classList.remove("test_skill")} else {
      this.classList.add("test_skill")}});
      QueryBuilderFeels( {clickState3} ) ;
  }
 
  return (
    <><div className="App">
      <div id="head-desc" style={{zIndex: 20000, position: "absolute", top: 1, left: 0, width: "100%"}}>
      <h1>Rock Creek Park Feels</h1></div>
      <LeafletMap ></LeafletMap>
 
    </div></>
  );
}

