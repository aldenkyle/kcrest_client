import L from "leaflet";
import { React, useState, useEffect } from "react";
import { useMapEvents, Marker, Popup, CircleMarker } from "react-leaflet";


export function getColor(d) {
  return d > 7
    ? "#800026"
    : d > 6
    ? "#E31A1C"
    : d > 5
    ? "#FD8D3C"
    : d > 4
    ? "#FEB24C"
    : d > 3
    ? "#FED976"
    : "#FFEDA0";
}


export const LocationFinderDummy = () => {
  function handleClick() { 
        const formData = { "latitude": document.getElementById('Latitude').value , "longitude": document.getElementById('Longitude').value, "feeling":document.getElementById('feeling').value , "story":document.getElementById('story').value};
        console.log(formData);
        const requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: formData
        };
        console.log(request)
        fetch('http://localhost:3000/feels-ins',formData)
      };
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
      click(e) {
          console.log(e.latlng);
          setPosition(e.latlng)
      },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup><span>
      <div class="container">
  <form  class="pure-form">
    <div class="row">
      <div class="col-25">
        <label for="story">Your Story</label>
      </div>
      <div class="col-75">
        <input type="text" id="story" name="story" placeholder="Tell us about your experience.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="feeling">Your Emotion</label>
      </div>
      <div class="col-75">
        <select id="feeling" name="feeling">
          <option value="awestruck">Awestruck</option>
          <option value="excited">Excited</option>
          <option value="happy">Happy</option>
          <option value="relaxed">Relaxed</option>
          <option value="ambivalent">Ambivalent</option>
          <option value="annoyed">Annoyed</option>
          <option value="anxious">Anxious</option>
          <option value="fearful">Fearful</option>
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
    <div class="row">
      <button onClick={handleClick} type="button">Submit</button>
    </div>
  </form>
</div>
      </span>
      </Popup>
    </Marker>
  )
};


export function onEachTrail(trail, layer) {
  const countryName = trail.properties.trlname;
  console.log(countryName);
  layer.bindPopup(countryName);}

export function onEachPOI(trail, layer) {
    const countryName = trail.properties.poiname;
    const countrType = trail.properties.poitype;
    console.log(countryName);
    layer.bindPopup(countrType +"- "+ countryName);}

export function onEachRoad(trail, layer) {
  const countryName = trail.properties.rdname;
  console.log(countryName);
  layer.bindPopup(countryName);}

export function onEachContour(trail, layer) {
  const countryName = trail.properties.elevation;
  console.log(countryName);
  layer.bindPopup("Elevation: "+ countryName);}


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
