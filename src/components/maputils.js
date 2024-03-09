import L from "leaflet";
import { React, useState, useEffect } from "react";
import { useMapEvents, Marker, Popup, Tooltip, CircleMarker } from "react-leaflet";
import marker from "./result-icon.svg"
import {toggle} from "../App"



export const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor:  [-0, -0],
  iconSize: [24,36],    
});

function createButton(context, func) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "im a button";

  var selectPanel = document.getElementById("bottom-desc");
  selectPanel.appendChild(button);
}

export const BuildScenarioOne = (clickState) => {
  console.log(clickState)
  //here is where I will add lasso button, run analysis, clear selection button
  if (clickState) {
  console.log(document.getElementById("bottom-desc"))  
  //createButton()
}
};



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
