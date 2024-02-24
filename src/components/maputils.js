import L from "leaflet";
import { React, useState, useEffect } from "react";
import { useMapEvents, Marker, Popup, Tooltip, CircleMarker } from "react-leaflet";
import marker from "./result-icon.svg"
import {toggle} from "../App"


export function getColor(d) {
  return d > 7 ? "#800026":
     d > 6 ? "#E31A1C"
    : d > 5
    ? "#FD8D3C"
    : d > 4
    ? "#FEB24C"
    : d > 3
    ? "#FED976"
    : "#FFEDA0";
}

export function getFeelColor(x) {
  return x === "Awestruck" ? "#3C4F76" :
         x === "Excited" ? "#005F73" :
         x === "Happy" ? "#0A9396" :
         x === "Relaxed" ? "#94D2BD" :
         x === "Ambivalent" ? "#E9D8A6" :
         x === "Annoyed" ? "#EE9B00" :
         x === "Anxious" ? "#BB3E03":
         x === "Fearful" ? "#9B2226" :
         "black";
  }


  export function getHexColor(x) {
    console.log(x)
    return x  < 1  ? "#dadaeb" :
           x  < 2  ? "#bcbddc" :
           x < 3  ? "#9e9ac8" :
           x < 6 ? "#807dba" :
           x < 11  ? "#6a51a3" :
           "#4a1486";
    }
   


export const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [24,36],    
});



export const LocationFinderDummy = (clickState) => {
  //console.log(clickState.tog)
  function handleClick() { 
    if (document.getElementById('Longitude').value > -77.058 &&  document.getElementById('Longitude').value < -77.034 &&  document.getElementById('Latitude').value < 38.9915 && document.getElementById('Latitude').value > 38.9325 && document.getElementById('story').value.length > 0) 
    {   var x = document.getElementById("ErrorDiv");
        if (x.style.display === "block") {
          x.style.display = "none";
        }
        const formData = { "latitude": document.getElementById('Latitude').value , "longitude": document.getElementById('Longitude').value, "feeling":document.getElementById('feeling').value , "story":document.getElementById('story').value};
        //console.log(formData);
        const requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(formData)
        };
        //console.log(requestOptions)
        const fetchPromise  =  fetch('https://ancient-dusk-34834-4d58d241ef9f.herokuapp.com/feels-ins', requestOptions)
        setTimeout(function(){
          console.log(console.log(fetchPromise));
          }, 1000);
          location.reload();
      } else {
        var x = document.getElementById("ErrorDiv");
        if (x.style.display === "none") {
          x.style.display = "block";
        }}
      };
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
      click(e) {
          //console.log(e.latlng);
          setPosition(e.latlng)
      },
  });

  if (clickState.tog) {
    console.log(clickState.tog)
  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup permanent><span>
      <div class="container">
  <form  class="pure-form">
    <div class="row">
      <div class="col-25">
        <label for="story">Tell us your story:</label>
      </div>
      <div class="col-75">
        <input type="textarea" id="story" name="story" placeholder="Tell us about your experience.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="feeling">Describe Feeling</label>
      </div>
      <div class="col-75">
        <select id="feeling" name="feeling">
          <option value="Awestruck">Awestruck</option>
          <option value="Excited">Excited</option>
          <option value="Happy">Happy</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Ambivalent">Ambivalent</option>
          <option value="Annoyed">Annoyed</option>
          <option value="Anxious">Anxious</option>
          <option value="Fearful">Fearful</option>
        </select>
      </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="Longitude">Clicked Longitude</label>
      </div>
      <div class="col-75">
      <select id="Longitude" name="Longitude">
          <option value={position.lng}>{position.lng}</option></select>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Latitude">Clicked Latitude</label>
      </div>
      <div class="col-75">
      <select id="Latitude" name="Latitude">
          <option value={position.lat}>{position.lat}</option></select>
    </div>
    </div>
      <div id="ErrorDiv" style={{display:"none"}}> Failed to submit, either not in park or no story provided.   
    </div>
    <div class="row">
    <button class="button button1" onClick={handleClick} type="button">Submit</button>
    </div>
  </form>
</div>
      </span>
      </Popup>
    </Marker>
  )
    } 
};


export function onEachTrail(trail, layer) {
  const countryName = trail.properties.trlname;
  //console.log(countryName);
  layer.bindPopup(countryName);}

export function onEachPOI(trail, layer) {
    const countryName = trail.properties.poiname;
    const countrType = trail.properties.poitype;
    //console.log(countryName);
    layer.bindPopup(countrType +"- "+ countryName);}

export function onEachRoad(trail, layer) {
  const countryName = trail.properties.rdname;
  //console.log(countryName);
  layer.bindPopup(countryName);}

export function onEachContour(trail, layer) {
  const countryName = trail.properties.elevation;
  //console.log(countryName);
  layer.bindPopup("Elevation: "+ countryName);}


export function onEachHex(trail, layer) {
    const awestruck = trail.properties.awestruck + 0;
    const excited = trail.properties.excited + 0;
    const happy = trail.properties.happy + 0;
    const relaxed = trail.properties.relaxed + 0;
    const ambivalent = trail.properties.abivalent + 0;
    const annoyed = trail.properties.annoyed + 0;
    const anxious = trail.properties.anxious + 0;
    const fearful = trail.properties.fearful + 0;
    //console.log(countryName);
    layer.bindPopup("<b>Instances of Each Feeling</b><br> Awestruck: "+awestruck + "  <span style='color:white'>---</span> Excited: " +excited + "<br> Happy: "+happy + "  <span style='color:white'>--------</span> Relaxed: " + relaxed +  "<br> Ambivalent: "+ ambivalent + " <span style='color:white'>--</span> Annoyed: " + annoyed + "<br> Anxious: "+anxious + " <span style='color:white'>------</span> Fearful: " + fearful  );}



export function onEachFeel(trail, layer) {
  const feeling = trail.properties.feeling;
  const story = trail.properties.story;
  layer.bindPopup(feeling +"- "+ story);}

export function layersUtils(geoJsonRef, mapRef) {
  function highlightOnClick(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: "#f90303",
      dashArray: "",
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    geoJsonRef.current.leafletElement.resetStyle(e.target);
  }

  function zoomToFeature(e) {
    mapRef.current.leafletElement.fitBounds(e.target.getBounds());
  }

  return { highlightOnClick, resetHighlight, zoomToFeature };
}
