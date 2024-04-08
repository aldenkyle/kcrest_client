import { React, useState, useEffect, useRef, cloneElement,forwardRef, useMemo, useCallback, RefObject  } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON, Popup, CircleMarker,useMap,FeatureGroup, useMapEvent,LayerGroup,Tooltip,Pane } from "react-leaflet";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useReactToPrint } from 'react-to-print';
import {useScreenshot, createFileName} from 'use-react-screenshot';
import {   Document,  Page,  Text,  Image as ImageRPDF,  StyleSheet,  Font , PDFDownloadLink, View, usePDF, pdf} from "@react-pdf/renderer";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import ReactPDF from '@react-pdf/renderer';
import { SimpleMapScreenshoter } from "leaflet-simple-map-screenshoter";

//import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-easyprint';
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import { GoogleProvider, OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/geosearch.css';
import icon from 'leaflet/dist/images/marker-icon.png';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//It is important to import leaflet styles in your component
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

export const handleFeatureClick = (e) => {
  //console.log("clikced marker", e)
  console.log("clikced marker", e.layer.options.opacity)
  //e.layer.options.fillOpacity = 1
  //e.layer.options.color = "black"
  const layer = e.target;

  layer.setStyle({ opacity:1, color: "red" });
};

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

export function onMouseOut2() {
  var ttdiv = document.getElementById('tooltip2')
  ttdiv.innerHTML = "Hover over any administrative unit for details"
}
 

export function onEachHex(e, layer) {
  var layer = e.target
  const adm0 = e.sourceTarget.feature.properties.adm0_name;
  const adm1 = e.sourceTarget.feature.properties.adm1_name;
  const adm2 = e.sourceTarget.feature.properties.adm2_name;
  const popP = numberWithCommas(e.sourceTarget.feature.properties.pop_ls_1.toFixed(0));
  const stuntingP = e.sourceTarget.feature.properties.stunting_1.toFixed(1);
  const povertyP = e.sourceTarget.feature.properties.gsap_pov21;
  const hungerP = e.sourceTarget.feature.properties.hunger_1;
  const wastingP = e.sourceTarget.feature.properties.wasting_1;
  const under5mortP = e.sourceTarget.feature.properties.under5_mor + " per 100,000"
  const accesstoHWP = e.sourceTarget.feature.properties.handwashin.toFixed(1);
  const travTimeP = e.sourceTarget.feature.properties.timeperper.toFixed(1);
  const agPotP = numberWithCommas(e.sourceTarget.feature.properties.agpotentia);
  const conflictP = numberWithCommas(e.sourceTarget.feature.properties.count_viol);
  const literacWP = e.sourceTarget.feature.properties.women_lite.toFixed(1);
  const hungerSource = e.sourceTarget.feature.properties.hungersour;
  //console.log(countryName);
  var ttdiv = document.getElementById('tooltip2')
  ttdiv.innerHTML = "<b>"+ adm0 + " | " + adm1+ " | " + adm2 + "</b><br>Est. Population 2022 (Landscan): <span style='color:black;font-weight:bold'>"+ popP + "</span><br>Prevalence of Poverty ($2.15/day, GSAP): <span style='color:#9B2226;font-weight:bold'>"+ povertyP + "%</span><br>Prevalence of Stunting (DHS): <span style='color:#005F73;font-weight:bold'>"+ stuntingP + "%</span><br> Hunger: <span style='color:#3C4F76;font-weight:bold'>"+ hungerP + "%</span><br>Prevalence of Wasting (DHS): <span style='color:#0A9396;font-weight:bold'>"+ wastingP + "%</span><br>Under 5 Mortality per 100,000 (DHS): <span style='color:#94D2BD;font-weight:bold'>"+ under5mortP + "</span><br> Count of Violence Events (ACLED): <span style='color:#BB3E03;font-weight:bold'>"+ conflictP + "</span><br>Access to Basic Handwashing (DHS): <span style='color:#b8a004;font-weight:bold'>"+ accesstoHWP + "%</span><br>Percent of Women Literate (DHS): <span style='color:#EE9B00;font-weight:bold'>"+ literacWP + "%</span><br>Avg. Minutes in Travel Time to a City: <span style='color:#66507d;font-weight:bold'>"+ travTimeP + "</span><br>Potential Agricultural Growth (FAO): <span style='color:#354d36;font-weight:bold'>"+ agPotP + "</span>"
}


export function onEachHex2(e, layer) {
  var layer = e.target
  const adm0 = e.sourceTarget.feature.properties.adm0_name;
  const adm1 = e.sourceTarget.feature.properties.adm1_name;
  const adm2 = e.sourceTarget.feature.properties.adm2_name;
  const popP = e.sourceTarget.feature.properties.pop_ls_1.toFixed(0);
  const stuntingP = e.sourceTarget.feature.properties.stunting_1.toFixed(1);
  const povertyP = e.sourceTarget.feature.properties.gsap_pov21;
  const hungerP = e.sourceTarget.feature.properties.hunger_1;
  const wastingP = e.sourceTarget.feature.properties.wasting_1;
  const under5mortP = e.sourceTarget.feature.properties.under5_mor;
  const accesstoHWP = e.sourceTarget.feature.properties.handwashin.toFixed(1);
  const travTimeP = e.sourceTarget.feature.properties.timeperper.toFixed(1);
  const agPotP = e.sourceTarget.feature.properties.agpotentia;
  const conflictP = e.sourceTarget.feature.properties.count_viol;
  const literacWP = e.sourceTarget.feature.properties.women_lite.toFixed(1);
  const hungerSource = e.sourceTarget.feature.properties.hungersour;
  //console.log(countryName);
  layer.bindPopup("<b>"+ adm0 + " | " + adm1+ " | " + adm2 + "</b><br>Est. Population 2022 (Landscan): <span style='color:black;font-weight:bold'>"+ popP + "</span><br>Prevalence of Poverty ($2.15/day, GSAP): <span style='color:#9B2226;font-weight:bold'>"+ povertyP + "%</span><br>Prevalence of Stunting (DHS): <span style='color:#005F73;font-weight:bold'>"+ stuntingP + "%</span><br> Hunger: <span style='color:#3C4F76;font-weight:bold'>"+ hungerP + "%</span><br>Prevalence of Wasting (DHS): <span style='color:#0A9396;font-weight:bold'>"+ wastingP + "%</span><br>Under 5 Mortality per 100,000 (DHS): <span style='color:#94D2BD;font-weight:bold'>"+ under5mortP + "</span><br> Count of Violence Events (ACLED): <span style='color:#BB3E03;font-weight:bold'>"+ conflictP + "</span><br>Access to Basic Handwashing (DHS): <span style='color:#b8a004;font-weight:bold'>"+ accesstoHWP + "%</span><br>Percent of Women Literate (DHS): <span style='color:#EE9B00;font-weight:bold'>"+ literacWP + "%</span><br>Avg. Minutes in Travel Time to a City: <span style='color:#66507d;font-weight:bold'>"+ travTimeP + "</span><br>Potential Agricultural Growth (FAO): <span style='color:#354d36;font-weight:bold'>"+ agPotP + "</span>"  );
}

export function getStyle(feature) {
  return {
      weight: .1,
      opacity: .3,
      fillcolor: 'red',
      fillOpacity: 0,
      color: '#dcdee0',
      smoothFactor:.01
  };
}
 //set up a bunch of vars!
var img1 = new Image()
var img1a = ""
var scenario = 0
var scen1_population = 0
var scen1_povest = 0
var scen1_hungest = 0
var scen1_stuntest = 0
var scen1_wastest = 0
var scen1_u5mortest = 0
var scen1_accesstoHWest = 0
var scen1_womensLitest = 0
var scen1_conflictEventsEst = 0
var scen1_agPotentialEst = 0
var scen1_avgTravTimeEst = 0
var scen1_Admins = ""
var scen1_pop_initial = 0
var scen1_idlist = []
var admincomb = ""
var scen2_population = 0
var scen2_povest = 0
var scen2_hungest = 0
var scen2_stuntest = 0
var scen2_wastest = 0
var scen2_u5mortest = 0
var scen2_accesstoHWest = 0
var scen2_womensLitest = 0
var scen2_conflictEventsEst = 0
var scen2_agPotentialEst = 0
var scen2_avgTravTimeEst = 0
var scen2_Admins = ""
var scen2_pop_initial = 0
var scen2_idlist = []



export function addTooltip(e) {
     onEachHex(e);}

var selector = "False"

export function highlightFeature(e) {
  if (selector == "False") {
  if (scenario == 1) {
    //if the id list includes the feature already
  if (scen1_idlist.includes(e.sourceTarget.feature.properties.adm2_id)) {
    var layer = e.target;
    layer.setStyle({
      weight: .3,
      opacity: .3,
      fillcolor: 'red',
      fillOpacity: 0,
      color: '#dcdee0',
      smoothFactor:.1
    })
    scen1_idlist = scen1_idlist.filter(item => item != e.sourceTarget.feature.properties.adm2_id);
    scen1_pop_initial = scen1_population
    scen1_population = scen1_population - e.sourceTarget.feature.properties.pop_ls_1;
    scen1_hungest = 100*((((scen1_hungest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_povest = 100*((((scen1_povest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_stuntest = 100*((((scen1_stuntest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_wastest = 100*((((scen1_wastest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_u5mortest = 100*((((scen1_u5mortest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_accesstoHWest = 100*((((scen1_accesstoHWest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_womensLitest = 100*((((scen1_womensLitest/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    scen1_conflictEventsEst = scen1_conflictEventsEst - e.sourceTarget.feature.properties.count_viol
    scen1_agPotentialEst = scen1_agPotentialEst - (e.sourceTarget.feature.properties.agpotentia*1)
    scen1_avgTravTimeEst = 100*((((scen1_avgTravTimeEst/100) * scen1_pop_initial) - ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen1_population+1))
    admincomb = e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
    scen1_Admins = scen1_Admins.replace(admincomb, "")
    console.log("pop " + scen1_population )
    console.log("hung " + scen1_hungest )
    console.log("pov " + scen1_povest )
    console.log("stunt " + scen1_stuntest )
    console.log("wast " + scen1_wastest )
    console.log("mort " + scen1_u5mortest )
    console.log("hw " + scen1_accesstoHWest )
    console.log("liter " + scen1_womensLitest )
    console.log("conf " + scen1_conflictEventsEst )
    console.log("agpotential " + scen1_agPotentialEst )
    console.log("trav time avg " + scen1_avgTravTimeEst )
    console.log("admins " + scen1_Admins )
  }
   //if the id doesnt include the id
  else {
  var layer = e.target;
  if (e.sourceTarget.feature.properties.adm0_name == country.value || country.value =='all') {
  //console.log(e)

  layer.setStyle({
      weight: 2,
      color: '#363636',
      dashArray: '',
      fillOpacity: 0.6
  });

  layer.bringToFront();
  //calculate my features!
  
  scen1_idlist.push(e.sourceTarget.feature.properties.adm2_id)
  scen1_pop_initial = scen1_population
  scen1_population = scen1_population + e.sourceTarget.feature.properties.pop_ls_1
  scen1_hungest = 100*((((scen1_hungest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_povest = 100*((((scen1_povest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_stuntest = 100*((((scen1_stuntest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_wastest = 100*((((scen1_wastest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_u5mortest = 100*((((scen1_u5mortest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_accesstoHWest = 100*((((scen1_accesstoHWest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_womensLitest = 100*((((scen1_womensLitest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_conflictEventsEst = scen1_conflictEventsEst + e.sourceTarget.feature.properties.count_viol
  scen1_agPotentialEst = scen1_agPotentialEst +  (e.sourceTarget.feature.properties.agpotentia*1)
  scen1_avgTravTimeEst = 100*((((scen1_avgTravTimeEst/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_Admins = scen1_Admins + ", "+ e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
  //console.log("pop " + scen1_population )
  //console.log("hung " + scen1_hungest )
  //console.log("pov " + scen1_povest )
  //console.log("stunt " + scen1_stuntest )
 // console.log("wast " + scen1_wastest )
  //console.log("mort " + scen1_u5mortest )
  //console.log("hw " + scen1_accesstoHWest )
  //console.log("liter " + scen1_womensLitest )
  //console.log("conf " + scen1_conflictEventsEst )
  //console.log("agpotential " + scen1_agPotentialEst )
  //console.log("trav time avg " + scen1_avgTravTimeEst )
  //console.log("admins " + scen1_Admins )
}}}
if (scenario == 2) {
  if (scen2_idlist.includes(e.sourceTarget.feature.properties.adm2_id)) {
    var layer = e.target;
    layer.setStyle({
      weight: .3,
      opacity: .3,
      fillcolor: 'red',
      fillOpacity: 0,
      color: '#dcdee0',
      smoothFactor:.1
    })
    scen2_idlist = scen2_idlist.filter(item => item != e.sourceTarget.feature.properties.adm2_id);
    scen2_pop_initial = scen2_population
    scen2_population = scen2_population - e.sourceTarget.feature.properties.pop_ls_1;
    scen2_hungest = 100*((((scen2_hungest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_povest = 100*((((scen2_povest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_stuntest = 100*((((scen2_stuntest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_wastest = 100*((((scen2_wastest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_u5mortest = 100*((((scen2_u5mortest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_accesstoHWest = 100*((((scen2_accesstoHWest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_womensLitest = 100*((((scen2_womensLitest/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    scen2_conflictEventsEst = scen2_conflictEventsEst - e.sourceTarget.feature.properties.count_viol
    scen2_agPotentialEst = scen2_agPotentialEst -  (e.sourceTarget.feature.properties.agpotentia*1)
    scen2_avgTravTimeEst = 100*((((scen2_avgTravTimeEst/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    admincomb = e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
    scen2_Admins = scen2_Admins.replace(admincomb, "")
    //console.log("pop " + scen2_population )
    //console.log("hung " + scen2_hungest )
    //console.log("pov " + scen2_povest )
    //console.log("stunt " + scen2_stuntest )
    //console.log("wast " + scen2_wastest )
   // console.log("mort " + scen2_u5mortest )
    //console.log("hw " + scen2_accesstoHWest )
    //console.log("liter " + scen2_womensLitest )
    //console.log("conf " + scen2_conflictEventsEst )
    //console.log("agpotential " + scen2_agPotentialEst )
    //console.log("trav time avg " + scen2_avgTravTimeEst )
    //console.log("admins " + scen2_Admins )
  }
  else {
    if (e.sourceTarget.feature.properties.adm0_name == country.value || country.value =='all') {
  var layer = e.target;
  console.log(e)

  layer.setStyle({
      weight: 3,
      color: '#7d6c4a',
      dashArray: '',
      fillOpacity:0.6
  });

  layer.bringToFront();
  //calculate my features!
  scen2_idlist.push(e.sourceTarget.feature.properties.adm2_id)
  scen2_pop_initial = scen2_population
  scen2_population = scen2_population + e.sourceTarget.feature.properties.pop_ls_1
  scen2_hungest = 100*((((scen2_hungest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_povest = 100*((((scen2_povest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_stuntest = 100*((((scen2_stuntest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_wastest = 100*((((scen2_wastest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_u5mortest = 100*((((scen2_u5mortest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_accesstoHWest = 100*((((scen2_accesstoHWest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_womensLitest = 100*((((scen2_womensLitest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_conflictEventsEst = scen2_conflictEventsEst + e.sourceTarget.feature.properties.count_viol
  scen2_agPotentialEst = scen2_agPotentialEst + (e.sourceTarget.feature.properties.agpotentia*1)
  scen2_avgTravTimeEst = 100*((((scen2_avgTravTimeEst/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_Admins = scen2_Admins + ", "+ e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
  console.log("pop " + scen2_population )
  console.log("hung " + scen2_hungest )
  console.log("pov " + scen2_povest )
  console.log("stunt " + scen2_stuntest )
  console.log("wast " + scen2_wastest )
  console.log("mort " + scen2_u5mortest )
  console.log("hw " + scen2_accesstoHWest )
  console.log("liter " + scen2_womensLitest )
  console.log("conf " + scen2_conflictEventsEst )
  console.log("agpotential " + scen2_agPotentialEst )
  console.log("trav time avg " + scen2_avgTravTimeEst )
  console.log("admins " + scen2_Admins )
}}}
}}

export function highlightFeature2(e) {
  if (selector == "True") {
  if (scenario == 1) {
  if (scen1_idlist.includes(e.sourceTarget.feature.properties.adm2_id)) {
  }
  else {
    if (e.sourceTarget.feature.properties.adm0_name == country.value || country.value =='all') {
  var layer = e.target;
  console.log(e)

  layer.setStyle({
      weight: 2,
      color: '#363636',
      dashArray: '',
      fillOpacity: 0.6
  });

  layer.bringToFront();
  //calculate my features!
  scen1_idlist.push(e.sourceTarget.feature.properties.adm2_id)
  scen1_pop_initial = scen1_population
  scen1_population = scen1_population + e.sourceTarget.feature.properties.pop_ls_1
  scen1_hungest = 100*((((scen1_hungest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_povest = 100*((((scen1_povest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_stuntest = 100*((((scen1_stuntest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_wastest = 100*((((scen1_wastest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_u5mortest = 100*((((scen1_u5mortest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_accesstoHWest = 100*((((scen1_accesstoHWest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_womensLitest = 100*((((scen1_womensLitest/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_conflictEventsEst = scen1_conflictEventsEst + e.sourceTarget.feature.properties.count_viol
  scen1_agPotentialEst = scen1_agPotentialEst +  (e.sourceTarget.feature.properties.agpotentia*1)
  scen1_avgTravTimeEst = 100*((((scen1_avgTravTimeEst/100) * scen1_pop_initial) + ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen1_population)
  scen1_Admins = scen1_Admins + ", "+ e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
  console.log("pop " + scen1_population )
  console.log("hung " + scen1_hungest )
  console.log("pov " + scen1_povest )
  console.log("stunt " + scen1_stuntest )
  console.log("wast " + scen1_wastest )
  console.log("mort " + scen1_u5mortest )
  console.log("hw " + scen1_accesstoHWest )
  console.log("liter " + scen1_womensLitest )
  console.log("conf " + scen1_conflictEventsEst )
  console.log("agpotential " + scen1_agPotentialEst )
  console.log("trav time avg " + scen1_avgTravTimeEst )
  console.log("admins " + scen1_Admins )
}}}
if (scenario == 2) {
  if (scen2_idlist.includes(e.sourceTarget.feature.properties.adm2_id)) {
  }
  else {
    if (e.sourceTarget.feature.properties.adm0_name == country.value || country.value =='all') {
  var layer = e.target;
  console.log(e)

  layer.setStyle({
      weight: 3,
      color: '#7d6c4a',
      dashArray: '',
      fillOpacity:0.6
  });

  layer.bringToFront();
  //calculate my features!
  scen2_idlist.push(e.sourceTarget.feature.properties.adm2_id)
  scen2_pop_initial = scen2_population
  scen2_population = scen2_population + e.sourceTarget.feature.properties.pop_ls_1
  scen2_hungest = 100*((((scen2_hungest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.hunger_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_povest = 100*((((scen2_povest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.gsap_pov21/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_stuntest = 100*((((scen2_stuntest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.stunting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_wastest = 100*((((scen2_wastest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.wasting_1/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_u5mortest = 100*((((scen2_u5mortest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.under5_mor/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_accesstoHWest = 100*((((scen2_accesstoHWest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.handwashin/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_womensLitest = 100*((((scen2_womensLitest/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.women_lite/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_conflictEventsEst = scen2_conflictEventsEst + e.sourceTarget.feature.properties.count_viol
  scen2_agPotentialEst = scen2_agPotentialEst + (e.sourceTarget.feature.properties.agpotentia*1)
  scen2_avgTravTimeEst = 100*((((scen2_avgTravTimeEst/100) * scen2_pop_initial) + ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/scen2_population)
  scen2_Admins = scen2_Admins + ", "+ e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
  console.log("pop " + scen2_population )
  console.log("hung " + scen2_hungest )
  console.log("pov " + scen2_povest )
  console.log("stunt " + scen2_stuntest )
  console.log("wast " + scen2_wastest )
  console.log("mort " + scen2_u5mortest )
  console.log("hw " + scen2_accesstoHWest )
  console.log("liter " + scen2_womensLitest )
  console.log("conf " + scen2_conflictEventsEst )
  console.log("agpotential " + scen2_agPotentialEst )
  console.log("trav time avg " + scen2_avgTravTimeEst )
  console.log("admins " + scen2_Admins )
}}}
}}

function onEachFeature(feature, layer) {
  layer.on({
      click: highlightFeature,
      mouseover: addTooltip,
      mouseout: onMouseOut2
  }); 
    layer.on({
      mouseover: highlightFeature2,
  });
  }



const urlToQuery = () => {
  var cntry = document.getElementById('country').value;
  var urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json";
  if (cntry == 'Ghana')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json" }
  else if (cntry == 'Senegal')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json" }
  else if (cntry == 'Liberia')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json" }
  else if (cntry == 'Kenya')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json" }
  else if (cntry == 'Rwanda')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json" }
  else if (cntry == 'Tanzania')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json" }
  else if (cntry == 'Mozambique')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json" }
  else if (cntry == 'Malawi')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json" }
  else if (cntry == 'Madagascar')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json" }
  else if (cntry == 'Zambia')
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json" }
  else
  {urlQ = "https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json" }
  //console.log(urlQ)
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
      const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json");

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


const KcrestScen1 = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json");

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
  //console.log( "I called scenario 1 for the report map" );
  const scenario1Ref = useRef()
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{opacity:1, color:'white', fillOpacity:0, weight:1}} />;
  } else {
    return null;
  }
};

const KcrestScen2 = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json");

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
  //console.log( "I called scenario 1 for the report map" );
  const scenario1Ref = useRef()
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} pathOptions={{opacity:1, color:'white', fillOpacity:0, weight:1}} />;
  } else {
    return null;
  }
};


const KcrestFeaturesFront = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json");

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
  const scenarioRef = useRef()
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} ref={scenarioRef} onEachFeature={onEachFeature} style={getStyle} />;
  } else {
    return null;
  }
};

const KcrestScenario2 = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/all.json");

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
  const scenarioRef = useRef()
  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} ref={scenarioRef} onEachFeature={onEachFeature} style={getStyle} />;
  } else {
    return null;
  }
};



const KcrestCountriesFront = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kcrest_countries");

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
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    return  <GeoJSON data={data}   style={(feature) => {
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    return  <GeoJSON data={data}  style={(feature) => {
    const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
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
    return  <GeoJSON data={data}  style={(feature) => {
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
    try {const response = await fetch(urlToQuery(country));
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const poverty = feature.properties.gsap_pov21;
      return {
        color: "#9B2226",
        weight: 0, 
        fillOpacity: poverty/100,
        smoothFactor: .1
      };}}/> ;
  } else {
    return null;
  }});


const PovertyGhana = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/50,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerGhana = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/30,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/10,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/52,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingGhana = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/70,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/100,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/10,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeGhana = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/30,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const GhanaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/ghana.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  const PovertyLiberia = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/70,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerLiberia = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/91
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/35,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/5,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/120,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingLiberia = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/10,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/65,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/24,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeLiberia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/90,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const LiberiaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/liberia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  const PovertySenegal = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/65,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerSenegal = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/31,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/15,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/80,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingSenegal = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/60,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracySenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/70,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/18,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeSenegal = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/30,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const SenegalCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/senegal.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };
  


  const PovertyKenya = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/65,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerKenya = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/37,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/23,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/60,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingKenya = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/88,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/100,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/120,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeKenya = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/30,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const KenyaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/kenya.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };



  const PovertyMalawi = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/88,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerMalawi = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/60
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/40,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/5,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/125,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingMalawi = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/14,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/80,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/15,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeMalawi = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/30,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const MalawiCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/malawi.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  

  const PovertyMadagascar = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/100,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerMadagascar = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/90
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/52,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/15,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/100,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingMadagascar = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/40,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/100,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/60,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/100000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeMadagascar = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/120,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const MadagascarCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/madagascar.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  

  const PovertyMozambique = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/80,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerMozambique = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/55,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/10,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/140,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingMozambique = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/28,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/75,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/100,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/18000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeMozambique = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/60,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const MozambiqueCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/mozambique.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  

  const PovertyRwanda = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/83,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerRwanda = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/80
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/40,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/3,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/57,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingRwanda = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/35,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/100,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/20,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/250000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeRwanda = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/10,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const RwandaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/rwanda.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  

  const PovertyTanzania = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/75,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerTanzania = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/65
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/46,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/8,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/70,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingTanzania = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/16,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/90,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/10,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/3500000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeTanzania = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/30,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const TanzaniaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/tanzania.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
    } else {
      return null;
    }
  };

  

  const PovertyZambia = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const poverty = feature.properties.gsap_pov21;
        return {
          color: "#9B2226",
          weight: 0, 
          fillOpacity: poverty/85,
          smoothFactor: .1
        };}}/> ;
    } else {
      return null;
    }});

const HungerZambia = forwardRef((undefined, povRef) => {
      // create state variable to hold data when it is fetched
      const [data, setData] = useState();
      const getData = async () => {
        try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
          const jsonData = await response.json();
          setData(jsonData[0].json_build_object);
        } catch (err) {console.error(err.message);}};
      useEffect(() => { getData();  }, []);
      if (data) {
        return  <GeoJSON data={data}  style={(feature) => {
          const hunger = feature.properties.hunger_1;
      const colorWork = () => {
        if (hunger > 0) return  "#3C4F76"
        else return "gray"
       }
       const opacityWork = () => {
        if (hunger > 0) return  hunger/92
        else return 1
       }
     // console.log(fcount)
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}/> ;
      } else {
        return null;
      }});

const StuntingZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const stunting = feature.properties.stunting_1;
      // console.log(fcount)
       return {
         color: "#005F73",
         weight: 0, 
         fillOpacity: stunting/45,
         smoothFactor: .1
       };}} /> ;
  } else {
    return null;
  }});

const WastingZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#0A9396",
          weight: 0, 
          fillOpacity: wasting/8,
          smoothFactor: .1
        };}} /> ;
  } else {
    return null;
  }});

const Under5MortZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const u5mort = feature.properties.under5_mor;
    // console.log(fcount)
    return {
      color: "#94D2BD",
      weight: 0, 
      fillOpacity: u5mort/110,
      smoothFactor: .1
    };}}  /> ;
  } else {
    return null;
  }});

  const HandwashingZambia = forwardRef((undefined, povRef) => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState();
    const getData = async () => {
      try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
      } catch (err) {console.error(err.message);}};
    useEffect(() => { getData();  }, []);
    if (data) {
      return  <GeoJSON data={data}  style={(feature) => {
        const hw = feature.properties.handwashin;
     // console.log(fcount)
      return {
        color: "#b8a004",
        weight: 0, 
        fillOpacity: hw/37,
        smoothFactor: .1
      };}}   /> ;
    } else {
      return null;
    }});
  
const LiteracyZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const liter = feature.properties.women_lite;
     // console.log(fcount)
      return {
        color: "#EE9B00",
        weight: 0, 
        fillOpacity: liter/80,
        smoothFactor: .1
      };}}    /> ;
  } else {
    return null;
  }});
    
const ConflictZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.count_viol;
      // console.log(fcount)
        return {
          color: "#BB3E03",
          weight: 0, 
          fillOpacity: viol/10,
          smoothFactor: .1
        };}}    /> ;
  } else {
    return null;
  }});

const AgPotentialZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const potent = feature.properties.agpotentia;
     // console.log(fcount)
     const colorWork = () => {
      if (potent > 0) return  "#354d36"
      else return "gray"
     }
     const opacityWork = () => {
      if (potent > 0) return  potent/50000
      else return 1
     }
      return {
        color: colorWork(),
        weight: 0, 
        fillOpacity: opacityWork(),
        smoothFactor: .1
      };}}     /> ;
  } else {
    return null;
  }});

const TraveltimeZambia = forwardRef((undefined, povRef) => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();
  const getData = async () => {
    try {const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const viol = feature.properties.timeperper;
      // console.log(fcount)
       return {
         color: "#66507d",
         weight: 0, 
         fillOpacity: viol/60,
         smoothFactor: .1
       };}}     /> ;
  } else {
    return null;
  }});

const ZambiaCountry = () => {
    // create state variable to hold data when it is fetched
    const [data, setData] = useState(); 
    const getData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/aldenkyle/kcrest_client/main/src/data/zambia.json");
        const jsonData = await response.json();
        setData(jsonData[0].json_build_object);
        //console.log(jsonData[0].json_build_object)
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    if (data) {
      return <GeoJSON data={data}  pathOptions={{opacity:.3, fillColor:'white', color:'#dcdee0', fillOpacity:1, weight:1, smoothFactor:.1}} />;
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
  const scen1Ref = useRef()
  const mapRef = useRef()
  const scen2Ref2 = useRef()
  const mapRef2 = useRef()
  const reportRef = useRef();
  const mapsRef = useRef();
  const [map1Image, setMap1Image] = useState();

    function resetHighlightScen1d() {
      console.log("did I make it here to reset highlight")
      console.log(scen1Ref.current)
      var featLayer = scen1Ref.current.getLayers()[0].getLayers()
 
      console.log(scen1Ref.current.getLayers()[0].getLayers()[0].feature.properties)
      var max_lat = 0;
      var min_lat = 0;
      var max_lon = 0;
      var min_lon = 0; 
      for (let i = 0; i < featLayer.length; i++) {
        if (scen1_idlist.includes(featLayer[i].feature.properties.adm2_id)) {
        console.log(featLayer[i].feature.properties.adm2_id)
        featLayer[i].setStyle({
          weight: 1,
          opacity: .7,
          fillColor: '#005F73',
          fillOpacity: .7,
          color: '#dcdee0',
          smoothFactor:.1
        })
        if (max_lat == 0 ) {max_lat = featLayer[i].getBounds()._northEast.lat} else if
        (featLayer[i].getBounds()._northEast.lat > max_lat) 
          {max_lat = featLayer[i].getBounds()._northEast.lat};

        if (max_lon == 0 ) {max_lon = featLayer[i].getBounds()._northEast.lng} else if
         (featLayer[i].getBounds()._northEast.lng > max_lon) 
        {max_lon = featLayer[i].getBounds()._northEast.lng};

        if  (min_lon == 0 ) {min_lon = featLayer[i].getBounds()._southWest.lng} else if
         (featLayer[i].getBounds()._southWest.lng < min_lon) 
        {min_lon = featLayer[i].getBounds()._southWest.lng};

        if  (min_lat == 0 ) {min_lat = featLayer[i].getBounds()._southWest.lat} else if
         (featLayer[i].getBounds()._southWest.lat < min_lat) 
        {min_lat = featLayer[i].getBounds()._southWest.lat};
      } else {
          featLayer[i].setStyle({
            weight: 0,
            opacity: 0,
            fillColor: 'gray',
            fillOpacity: 0,
            color: '#dcdee0',
            smoothFactor:.1
        }  )}
      }
      var cent_lat = (min_lat + max_lat)/2
      var cent_lon = (min_lon + max_lon)/2
      var mapLayer = mapRef.current
      mapLayer.setView([cent_lat,cent_lon],5)
      //console.log(mapLayer)
      var lc = document.getElementsByClassName('leaflet-control-layers');
      lc[1].style.visibility = 'hidden';
    };

    function resetHighlightScen2d() {
      var featLayer = scen2Ref2.current.getLayers()[0].getLayers()
      var max_lat = 0;
      var min_lat = 0;
      var max_lon = 0;
      var min_lon = 0; 
      for (let i = 0; i < featLayer.length; i++) {
        if (scen2_idlist.includes(featLayer[i].feature.properties.adm2_id)) {
        //console.log(featLayer[i].getBounds())
        featLayer[i].setStyle({
          weight: 1,
          opacity: .7,
          fillColor: '#A80084',
          fillOpacity: .7,
          color: '#dcdee0',
          smoothFactor:.1
        })
        if (max_lat == 0 ) {max_lat = featLayer[i].getBounds()._northEast.lat} else if
        (featLayer[i].getBounds()._northEast.lat > max_lat) 
          {max_lat = featLayer[i].getBounds()._northEast.lat};

        if (max_lon == 0 ) {max_lon = featLayer[i].getBounds()._northEast.lng} else if
         (featLayer[i].getBounds()._northEast.lng > max_lon) 
        {max_lon = featLayer[i].getBounds()._northEast.lng};

        if  (min_lon == 0 ) {min_lon = featLayer[i].getBounds()._southWest.lng} else if
         (featLayer[i].getBounds()._southWest.lng < min_lon) 
        {min_lon = featLayer[i].getBounds()._southWest.lng};

        if  (min_lat == 0 ) {min_lat = featLayer[i].getBounds()._southWest.lat} else if
         (featLayer[i].getBounds()._southWest.lat < min_lat) 
        {min_lat = featLayer[i].getBounds()._southWest.lat};
      } else {
          featLayer[i].setStyle({
            weight: 0,
            opacity: 0,
            fillColor: 'gray',
            fillOpacity: 0,
            color: '#dcdee0',
            smoothFactor:.1
        }  )}
      }
      var cent_lat = (min_lat + max_lat)/2
      var cent_lon = (min_lon + max_lon)/2
      var mapLayer = mapRef2.current
      mapLayer.setView([cent_lat,cent_lon],5)
      //console.log(mapLayer)
      var lc = document.getElementsByClassName('leaflet-control-layers');
      lc[2].style.visibility = 'hidden';
    };


  var SimpleMap1 = () => {
    //const [mapRef, setMapRef] = useState(null);
    //console.log("loading internal map 1")
    try{
      var country = document.getElementById('country').value()
      }catch(e){
      var country = 'all';
      }
    const [center, setCenter] = useState({ lat: latCent(country), lng: lonCent(country) });
    const zoomLevel = zoomLevelVar(country);
    const layersRef2 = useRef();
     return ( 
      <>
      <div id="head-desc2" style={{top: 20, left: 0, width: "100%"}}>
      <h1>Scenario 1 Map<br></br></h1> </div> 
        <MapContainer id='map-container1' ref={mapRef} center={center} zoom={zoomLevel} maxZoom={21} tapTolerance={1} zoomControl={false} layersControl={false} style={{height: "300px", width: "100%"}}>
        <TileLayer
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}"
              ext='png'
              opacity={0.8} 
              maxZoom={10}/>   
          {/* Additional map layers or components can be added here */}
          <LayersControl ref={layersRef2} position="topright">
          <LayersControl.Overlay name="Features" checked>
            <FeatureGroup id='scen1' ref={scen1Ref}  ><KcrestScen1 /></FeatureGroup>
          </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
        </>
    );
  };  

  var SimpleMap2 = () => {
    //const [mapRef, setMapRef] = useState(null);
    try{
      var country = document.getElementById('country').value()
      }catch(e){
      var country = 'all';
      }
    const [center, setCenter] = useState({ lat: latCent(country), lng: lonCent(country) });
    const zoomLevel = zoomLevelVar(country);
    const layersRef2 = useRef();
    
    
     return ( 
      <>
      <div id="head-desc3" style={{top: 20, left: 0, width: "100%"}}>
      <h1>Scenario 2 Map<br></br></h1> </div> 
        <MapContainer id='map-container2' ref={mapRef2} center={center} zoom={zoomLevel} maxZoom={21} tapTolerance={1} zoomControl={false} layersControl={false} style={{height: "300px", width: "100%"}}>
        <TileLayer
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}"
              ext='png'
              opacity={0.8} 
              maxZoom={10}/>   
          {/* Additional map layers or components can be added here */}
          <LayersControl ref={layersRef2} position="topright">
          <LayersControl.Overlay name="Features" checked>
            <FeatureGroup id='scen2' ref={scen2Ref2}  ><KcrestScen2 /></FeatureGroup>
          </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
        </>
    );
  };  

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const feelRef = useRef()
  const labelsRef = useRef()
  const lineRef = useRef()
  const countryRef = useRef()
  const popRef = useRef()
  const scen2Ref = useRef()
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
  const [labelState, setLabelState] = useState(false);
  const agpotRef = useRef();
  const [agpotState, setAgpotState] = useState(false);
  const [scenarioDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);
 
  const [infoState, setInfoState] = useState(false);
  const countryRefGhana = useRef();  const povRefGhana = useRef(); const hungerRefGhana = useRef(); const stuntingRefGhana = useRef(); const wastingRefGhana = useRef();const u5mortRefGhana = useRef(); const conflictRefGhana = useRef();const literacyRefGhana = useRef();const handwashingRefGhana = useRef(); const travRefGhana = useRef(); const agpotRefGhana = useRef();
  const countryRefLiberia = useRef();const povRefLiberia = useRef();const hungerRefLiberia = useRef();const stuntingRefLiberia = useRef();const wastingRefLiberia = useRef(); const u5mortRefLiberia = useRef(); const conflictRefLiberia = useRef(); const literacyRefLiberia = useRef(); const handwashingRefLiberia = useRef(); const travRefLiberia = useRef(); const agpotRefLiberia = useRef();
  const countryRefSenegal = useRef(); const povRefSenegal = useRef(); const hungerRefSenegal = useRef(); const stuntingRefSenegal = useRef(); const wastingRefSenegal = useRef(); const u5mortRefSenegal = useRef(); const conflictRefSenegal = useRef(); const literacyRefSenegal = useRef(); const handwashingRefSenegal = useRef(); const travRefSenegal = useRef(); const agpotRefSenegal = useRef();
  const countryRefKenya = useRef(); const povRefKenya = useRef(); const hungerRefKenya = useRef(); const stuntingRefKenya = useRef(); const wastingRefKenya = useRef(); const u5mortRefKenya = useRef(); const conflictRefKenya = useRef(); const literacyRefKenya = useRef(); const handwashingRefKenya = useRef(); const travRefKenya = useRef(); const agpotRefKenya = useRef();
  const countryRefMalawi = useRef(); const povRefMalawi = useRef(); const hungerRefMalawi = useRef(); const stuntingRefMalawi = useRef(); const wastingRefMalawi = useRef(); const u5mortRefMalawi = useRef(); const conflictRefMalawi = useRef(); const literacyRefMalawi = useRef(); const handwashingRefMalawi = useRef(); const travRefMalawi = useRef(); const agpotRefMalawi = useRef();
  const countryRefMadagascar = useRef(); const povRefMadagascar = useRef(); const hungerRefMadagascar = useRef(); const stuntingRefMadagascar = useRef(); const wastingRefMadagascar = useRef(); const u5mortRefMadagascar = useRef(); const conflictRefMadagascar = useRef(); const literacyRefMadagascar = useRef(); const handwashingRefMadagascar = useRef(); const travRefMadagascar = useRef(); const agpotRefMadagascar = useRef();
  const countryRefMozambique = useRef(); const povRefMozambique = useRef(); const hungerRefMozambique = useRef(); const stuntingRefMozambique = useRef(); const wastingRefMozambique = useRef(); const u5mortRefMozambique = useRef(); const conflictRefMozambique = useRef(); const literacyRefMozambique = useRef(); const handwashingRefMozambique = useRef(); const travRefMozambique = useRef(); const agpotRefMozambique = useRef();
  const countryRefRwanda = useRef(); const povRefRwanda = useRef(); const hungerRefRwanda = useRef(); const stuntingRefRwanda = useRef(); const wastingRefRwanda = useRef(); const u5mortRefRwanda = useRef(); const conflictRefRwanda = useRef(); const literacyRefRwanda = useRef(); const handwashingRefRwanda = useRef(); const travRefRwanda = useRef(); const agpotRefRwanda = useRef();
  const countryRefTanzania = useRef(); const povRefTanzania = useRef(); const hungerRefTanzania = useRef(); const stuntingRefTanzania = useRef(); const wastingRefTanzania = useRef(); const u5mortRefTanzania = useRef(); const conflictRefTanzania = useRef(); const literacyRefTanzania = useRef(); const handwashingRefTanzania = useRef(); const travRefTanzania = useRef(); const agpotRefTanzania = useRef();
  const countryRefZambia = useRef(); const povRefZambia = useRef(); const hungerRefZambia = useRef(); const stuntingRefZambia = useRef(); const wastingRefZambia = useRef(); const u5mortRefZambia = useRef(); const conflictRefZambia = useRef(); const literacyRefZambia = useRef(); const handwashingRefZambia = useRef(); const travRefZambia = useRef(); const agpotRefZambia = useRef();
  
  
  const zoomToCountry = () => {
    const mapC = map;
    //mapC.removeLayer(povRef.current)
    console.log(layersRef.current)
    var country2 = document.getElementById('country').value
    var lat2 = latCent(country2)
    var lon2 = lonCent(country2)
    var zoom2 = zoomLevelVar(country2)
    mapC.setView([lat2,lon2],zoom2)
    removeLayers()
    console.log(country2)
    if (country2 == 'Ghana') {mapC.addLayer(countryRefGhana.current);mapC.addLayer(povRefGhana.current);}
    else if (country2 == 'Liberia') {mapC.addLayer(countryRefLiberia.current);mapC.addLayer(povRefLiberia.current);}
    else if (country2 == 'Senegal') {mapC.addLayer(countryRefSenegal.current);mapC.addLayer(povRefSenegal.current);}
    else if (country2 == 'Kenya') {mapC.addLayer(countryRefKenya.current);mapC.addLayer(povRefKenya.current);}
    else if (country2 == 'Malawi') {mapC.addLayer(countryRefMalawi.current);mapC.addLayer(povRefMalawi.current);}
    else if (country2 == 'Madagascar') {mapC.addLayer(countryRefMadagascar.current);mapC.addLayer(povRefMadagascar.current);}
    else if (country2 == 'Mozambique') {mapC.addLayer(countryRefMozambique.current);mapC.addLayer(povRefMozambique.current);}
    else if (country2 == 'Rwanda') {mapC.addLayer(countryRefRwanda.current);mapC.addLayer(povRefRwanda.current);}
    else if (country2 == 'Tanzania') {mapC.addLayer(countryRefTanzania.current);mapC.addLayer(povRefTanzania.current);}
    else if (country2 == 'Zambia') {mapC.addLayer(countryRefZambia.current);mapC.addLayer(povRefZambia.current);}
    else {mapC.addLayer(countryRef.current);mapC.addLayer(povRef.current);}
    PointsToFront()
    //var url = urlToQuery()
    //map.remove()
    //LeafletMap()
  }  
  
        
  const removeLayers = () => {
          const mapC = map;
          mapC.removeLayer(countryRef.current);mapC.removeLayer(hungerRef.current); mapC.removeLayer(povRef.current);mapC.removeLayer(stuntingRef.current);mapC.removeLayer(wastingRef.current);mapC.removeLayer(handwashingRef.current);mapC.removeLayer(conflictRef.current); mapC.removeLayer(literacyRef.current); mapC.removeLayer(agpotRef.current); mapC.removeLayer(travRef.current);mapC.removeLayer(u5mortRef.current);
          mapC.removeLayer(countryRefGhana.current);mapC.removeLayer(hungerRefGhana.current); mapC.removeLayer(povRefGhana.current);mapC.removeLayer(stuntingRefGhana.current);mapC.removeLayer(wastingRefGhana.current);mapC.removeLayer(handwashingRefGhana.current);mapC.removeLayer(conflictRefGhana.current); mapC.removeLayer(literacyRefGhana.current); mapC.removeLayer(agpotRefGhana.current); mapC.removeLayer(travRefGhana.current);mapC.removeLayer(u5mortRefGhana.current);
          mapC.removeLayer(countryRefLiberia.current);mapC.removeLayer(hungerRefLiberia.current); mapC.removeLayer(povRefLiberia.current);mapC.removeLayer(stuntingRefLiberia.current);mapC.removeLayer(wastingRefLiberia.current);mapC.removeLayer(handwashingRefLiberia.current);mapC.removeLayer(conflictRefLiberia.current); mapC.removeLayer(literacyRefLiberia.current); mapC.removeLayer(agpotRefLiberia.current); mapC.removeLayer(travRefLiberia.current);mapC.removeLayer(u5mortRefLiberia.current);
          mapC.removeLayer(countryRefSenegal.current);mapC.removeLayer(hungerRefSenegal.current); mapC.removeLayer(povRefSenegal.current);mapC.removeLayer(stuntingRefSenegal.current);mapC.removeLayer(wastingRefSenegal.current);mapC.removeLayer(handwashingRefSenegal.current);mapC.removeLayer(conflictRefSenegal.current); mapC.removeLayer(literacyRefSenegal.current); mapC.removeLayer(agpotRefSenegal.current); mapC.removeLayer(travRefSenegal.current);mapC.removeLayer(u5mortRefSenegal.current);
          mapC.removeLayer(countryRefKenya.current);mapC.removeLayer(hungerRefKenya.current); mapC.removeLayer(povRefKenya.current);mapC.removeLayer(stuntingRefKenya.current);mapC.removeLayer(wastingRefKenya.current);mapC.removeLayer(handwashingRefKenya.current);mapC.removeLayer(conflictRefKenya.current); mapC.removeLayer(literacyRefKenya.current); mapC.removeLayer(agpotRefKenya.current); mapC.removeLayer(travRefKenya.current);mapC.removeLayer(u5mortRefKenya.current);
          mapC.removeLayer(countryRefMalawi.current);mapC.removeLayer(hungerRefMalawi.current); mapC.removeLayer(povRefMalawi.current);mapC.removeLayer(stuntingRefMalawi.current);mapC.removeLayer(wastingRefMalawi.current);mapC.removeLayer(handwashingRefMalawi.current);mapC.removeLayer(conflictRefMalawi.current); mapC.removeLayer(literacyRefMalawi.current); mapC.removeLayer(agpotRefMalawi.current); mapC.removeLayer(travRefMalawi.current);mapC.removeLayer(u5mortRefMalawi.current);
          mapC.removeLayer(countryRefMadagascar.current);mapC.removeLayer(hungerRefMadagascar.current); mapC.removeLayer(povRefMadagascar.current);mapC.removeLayer(stuntingRefMadagascar.current);mapC.removeLayer(wastingRefMadagascar.current);mapC.removeLayer(handwashingRefMadagascar.current);mapC.removeLayer(conflictRefMadagascar.current); mapC.removeLayer(literacyRefMadagascar.current); mapC.removeLayer(agpotRefMadagascar.current); mapC.removeLayer(travRefMadagascar.current);mapC.removeLayer(u5mortRefMadagascar.current);
          mapC.removeLayer(countryRefRwanda.current);mapC.removeLayer(hungerRefRwanda.current); mapC.removeLayer(povRefRwanda.current);mapC.removeLayer(stuntingRefRwanda.current);mapC.removeLayer(wastingRefRwanda.current);mapC.removeLayer(handwashingRefRwanda.current);mapC.removeLayer(conflictRefRwanda.current); mapC.removeLayer(literacyRefRwanda.current); mapC.removeLayer(agpotRefRwanda.current); mapC.removeLayer(travRefRwanda.current);mapC.removeLayer(u5mortRefRwanda.current);
          mapC.removeLayer(countryRefTanzania.current);mapC.removeLayer(hungerRefTanzania.current); mapC.removeLayer(povRefTanzania.current);mapC.removeLayer(stuntingRefTanzania.current);mapC.removeLayer(wastingRefTanzania.current);mapC.removeLayer(handwashingRefTanzania.current);mapC.removeLayer(conflictRefTanzania.current); mapC.removeLayer(literacyRefTanzania.current); mapC.removeLayer(agpotRefTanzania.current); mapC.removeLayer(travRefTanzania.current);mapC.removeLayer(u5mortRefTanzania.current);
          mapC.removeLayer(countryRefMozambique.current);mapC.removeLayer(hungerRefMozambique.current); mapC.removeLayer(povRefMozambique.current);mapC.removeLayer(stuntingRefMozambique.current);mapC.removeLayer(wastingRefMozambique.current);mapC.removeLayer(handwashingRefMozambique.current);mapC.removeLayer(conflictRefMozambique.current); mapC.removeLayer(literacyRefMozambique.current); mapC.removeLayer(agpotRefMozambique.current); mapC.removeLayer(travRefMozambique.current);mapC.removeLayer(u5mortRefMozambique.current);
          mapC.removeLayer(countryRefZambia.current);mapC.removeLayer(hungerRefZambia.current); mapC.removeLayer(povRefZambia.current);mapC.removeLayer(stuntingRefZambia.current);mapC.removeLayer(wastingRefZambia.current);mapC.removeLayer(handwashingRefZambia.current);mapC.removeLayer(conflictRefZambia.current); mapC.removeLayer(literacyRefZambia.current); mapC.removeLayer(agpotRefZambia.current); mapC.removeLayer(travRefZambia.current);mapC.removeLayer(u5mortRefZambia.current);
        
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
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var hungerLayer = hungerRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var hungerLayer = hungerRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var hungerLayer = hungerRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var hungerLayer = hungerRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var hungerLayer = hungerRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var hungerLayer = hungerRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var hungerLayer = hungerRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var hungerLayer = hungerRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var hungerLayer = hungerRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var hungerLayer = hungerRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var hungerLayer = hungerRefZambia.current; var baseLayer = countryRefZambia.current}
    const arr = [hungerState,stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    //console.log(count)
    //console.log(map)
    if (map && hungerRef.current && !hungerState) {
      const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(hungerLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
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
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var travLayer = travRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var travLayer = travRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var travLayer = travRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var travLayer = travRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var travLayer = travRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var travLayer = travRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var travLayer = travRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var travLayer = travRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var travLayer = travRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var travLayer = travRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var travLayer = travRefZambia.current; var baseLayer = countryRefZambia.current}
    const arr = [hungerState, travState, agpotState, stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    if (map && travRef.current && !travState) {
      const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
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

  const toggleLabels = () => {
    if (map && travRef.current && !labelState) {
      const mapC = map;
      const labelLayer = labelsRef.current
      const lineLayer = lineRef.current
      //mapC.addLayer(lineLayer);
      mapC.addLayer(labelLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setLabelState(!labelState);
      removeOutlines()
      document.getElementsByClassName("button18")[0].classList.add("test_skill");
    } else if (map && travRef.current && labelState) {
       const mapC = map;
      const labelLayer = labelsRef.current;
      const lineLayer = lineRef.current
      //mapC.removeLayer(lineLayer);
      mapC.removeLayer(labelLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setLabelState(!labelState);
      document.getElementsByClassName("button18")[0].classList.remove("test_skill");
    }
   
  };

  const toggleAgpot = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var agpotLayer = agpotRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var agpotLayer = agpotRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var agpotLayer = agpotRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var agpotLayer = agpotRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var agpotLayer = agpotRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var agpotLayer = agpotRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var agpotLayer = agpotRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var agpotLayer = agpotRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var agpotLayer = agpotRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var agpotLayer = agpotRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var agpotLayer = agpotRefZambia.current; var baseLayer = countryRefZambia.current}
    const arr = [hungerState,stuntingState, wastingState, u5mortState,conflictState, literacyState, handwashingState, PovState ]
    const count = arr.filter(Boolean).length
    if (map && agpotRef.current && !agpotState) {
      const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
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
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var stuntingLayer = stuntingRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var stuntingLayer = stuntingRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var stuntingLayer = stuntingRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var stuntingLayer = stuntingRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var stuntingLayer = stuntingRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var stuntingLayer = stuntingRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var stuntingLayer = stuntingRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var stuntingLayer = stuntingRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var stuntingLayer = stuntingRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var stuntingLayer = stuntingRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var stuntingLayer = stuntingRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && stuntingRef.current && !stuntingState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(stuntingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setStuntingState(!stuntingState);
      removeOutlines()
      document.getElementsByClassName("button4")[0].classList.add("test_skill");
    } else if (map && stuntingRef.current && stuntingState) {
       const mapC = map;
      mapC.removeLayer(stuntingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setStuntingState(!stuntingState);
      document.getElementsByClassName("button4")[0].classList.remove("test_skill");
    }
  };

  const toggleWasting = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var wastingLayer = wastingRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var wastingLayer = wastingRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var wastingLayer = wastingRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var wastingLayer = wastingRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var wastingLayer = wastingRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var wastingLayer = wastingRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var wastingLayer = wastingRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var wastingLayer = wastingRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var wastingLayer = wastingRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var wastingLayer = wastingRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var wastingLayer = wastingRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && wastingRef.current && !wastingState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(wastingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setWastingState(!wastingState);
      removeOutlines()
      document.getElementsByClassName("button5")[0].classList.add("test_skill");
    } else if (map && wastingRef.current && wastingState) {
       const mapC = map;
      mapC.removeLayer(wastingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setWastingState(!wastingState);
      document.getElementsByClassName("button5")[0].classList.remove("test_skill");
    }
  };

  const toggleU5Mort = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var u5mortLayer = u5mortRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var u5mortLayer = u5mortRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var u5mortLayer = u5mortRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var u5mortLayer = u5mortRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var u5mortLayer = u5mortRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var u5mortLayer = u5mortRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var u5mortLayer = u5mortRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var u5mortLayer = u5mortRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var u5mortLayer = u5mortRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var u5mortLayer = u5mortRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var u5mortLayer = u5mortRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && u5mortRef.current && !u5mortState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(u5mortLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setU5MortState(!u5mortState);
      removeOutlines()
      document.getElementsByClassName("button6")[0].classList.add("test_skill");
    } else if (map && u5mortRef.current && u5mortState) {
       const mapC = map;
      mapC.removeLayer(u5mortLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setU5MortState(!u5mortState);
      document.getElementsByClassName("button6")[0].classList.remove("test_skill");
    }
  };

  const toggleConflict = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var conflictLayer = conflictRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var conflictLayer = conflictRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var conflictLayer = conflictRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var conflictLayer = conflictRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var conflictLayer = conflictRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var conflictLayer = conflictRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var conflictLayer = conflictRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var conflictLayer = conflictRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var conflictLayer = conflictRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var conflictLayer = conflictRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var conflictLayer = conflictRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && conflictRef.current && !conflictState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(conflictLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setConflictState(!conflictState);
      removeOutlines()
      document.getElementsByClassName("button9")[0].classList.add("test_skill");
    } else if (map && conflictRef.current && conflictState) {
       const mapC = map;
      mapC.removeLayer(conflictLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setConflictState(!conflictState);
      document.getElementsByClassName("button9")[0].classList.remove("test_skill");
    }
  };

  const toggleLiteracy = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var literacyLayer = literacyRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var literacyLayer = literacyRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var literacyLayer = literacyRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var literacyLayer = literacyRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var literacyLayer = literacyRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var literacyLayer = literacyRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var literacyLayer = literacyRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var literacyLayer = literacyRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var literacyLayer = literacyRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var literacyLayer = literacyRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var literacyLayer = literacyRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && literacyRef.current && !literacyState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
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
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var handwashingLayer = handwashingRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var handwashingLayer = handwashingRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var handwashingLayer = handwashingRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var handwashingLayer = handwashingRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var handwashingLayer = handwashingRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var handwashingLayer = handwashingRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var handwashingLayer = handwashingRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var handwashingLayer = handwashingRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var handwashingLayer = handwashingRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var handwashingLayer = handwashingRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var handwashingLayer = handwashingRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && handwashingRef.current && !handwashingState) {
       const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(handwashingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHwashState(!handwashingState);
      removeOutlines()
      document.getElementsByClassName("button7")[0].classList.add("test_skill");
    } else if (map && handwashingRef.current && handwashingState) {
       const mapC = map;
      const handwashingLayer = handwashingRef.current;
      mapC.removeLayer(handwashingLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setHwashState(!handwashingState);
      document.getElementsByClassName("button7")[0].classList.remove("test_skill");
    }
  };

  const togglePov = () => {
    const country3 = document.getElementById('country').value
    if (country3 == 'all') {var povLayer = povRef.current; var baseLayer = countryRef.current}
    else if (country3 == 'Ghana') {var povLayer = povRefGhana.current; var baseLayer = countryRefGhana.current}
    else if (country3 == 'Senegal') {var povLayer = povRefSenegal.current; var baseLayer = countryRefSenegal.current}
    else if (country3 == 'Kenya') {var povLayer = povRefKenya.current; var baseLayer = countryRefKenya.current}
    else if (country3 == 'Liberia') {var povLayer = povRefLiberia.current; var baseLayer = countryRefLiberia.current}
    else if (country3 == 'Malawi') {var povLayer = povRefMalawi.current; var baseLayer = countryRefMalawi.current}
    else if (country3 == 'Madagascar') {var povLayer = povRefMadagascar.current; var baseLayer = countryRefMadagascar.current}
    else if (country3 == 'Mozambique') {var povLayer = povRefMozambique.current; var baseLayer = countryRefMozambique.current}
    else if (country3 == 'Rwanda') {var povLayer = povRefRwanda.current; var baseLayer = countryRefRwanda.current}
    else if (country3 == 'Tanzania') {var povLayer = povRefTanzania.current; var baseLayer = countryRefTanzania.current}
    else if (country3 == 'Zambia') {var povLayer = povRefZambia.current; var baseLayer = countryRefZambia.current}
    if (map && povRef.current && !PovState) {
      const mapC = map;
      removeLayers()
      mapC.addLayer(baseLayer);
      mapC.addLayer(povLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setPovState(!PovState);
      removeOutlines()
      document.getElementsByClassName("button10")[0].classList.add("test_skill");
    } else if (map && povRef.current && PovState) {
      const mapC = map;
      mapC.removeLayer(povLayer);
      const feelLayer = feelRef.current;
      feelLayer.bringToFront()
      setPovState(!PovState);
      document.getElementsByClassName("button10")[0].classList.remove("test_skill");
    }
  };

  function resetHighlight(e) {
    if (scenario == 1) {
    var featLayer = popRef.current}
    else {var featLayer = scen2Ref.current}
    console.log(featLayer)
    featLayer.setStyle({
      weight: .3,
      opacity: .3,
      fillcolor: 'red',
      fillOpacity: 0,
      color: '#dcdee0',
      smoothFactor:.1
    })
    if (scenario == 1) {
      scen1_idlist = []
      scen1_population = 0
      scen1_povest = 0
      scen1_hungest = 0
      scen1_stuntest = 0
      scen1_wastest = 0
      scen1_u5mortest = 0
      scen1_accesstoHWest = 0
      scen1_womensLitest = 0
      scen1_conflictEventsEst = 0
      scen1_agPotentialEst = 0
      scen1_avgTravTimeEst = 0
      scen1_Admins = ""
      scen1_pop_initial = 0

    }
    else {
      scen2_idlist = []
      scen2_population = 0
      scen2_povest = 0
      scen2_hungest = 0
      scen2_stuntest = 0
      scen2_wastest = 0
      scen2_u5mortest = 0
      scen2_accesstoHWest = 0
      scen2_womensLitest = 0
      scen2_conflictEventsEst = 0
      scen2_agPotentialEst = 0
      scen2_avgTravTimeEst = 0
      scen2_Admins = ""
      scen2_pop_initial = 0
    }
  }

  function scenario1(popRef) {
    //task: bring right layer to front!
    console.log("hi")
    scenario = 1
    document.getElementsByClassName("button14")[0].classList.add("test_skill");
    document.getElementsByClassName("button15")[0].classList.remove("test_skill");
    ScenToFront()
    }
  
  function scenario2() {
    scenario = 2
    document.getElementsByClassName("button15")[0].classList.add("test_skill");
    document.getElementsByClassName("button14")[0].classList.remove("test_skill");
    ScenToFront()
    //task: bring right layer to front!
  }

function greater(a,b) {
  if (Number(a)>Number(b)) {
    return "<b>></b>"
  }
  else if (b>a) {return "<b><</b>"}
  else {return"="}
}

function bolderStart(a,b) {
  if (Number(a)>Number(b)) {
    return "<b>"}
  else {return ""}
};

function getStyle(id, name)
{
    var element = document.getElementById(id);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}


const defsSourcing = " <span style='color:black;font-size:11px;font-family:Gill Sans,Gill Sans MT, Calibri, sans-serif;'><b><br>Analytic Caveats:</b><br>1. For several datasets, data was only available at the first-order administrative level. For the purposes of this application, we assign each second-order administrative unit the value of the first order-administrative unit in the cases where data is not available. <br>2. Two datasets should not be compared across countries: Hunger and Agricultural potential as they may use different datasets and methods depending on the selected countries.<br>3. Summary values are population weighted averages based on Landscan 2022 population estimates for each administrative unit.<br><br> <b>Sources and Definitions:</b><br> <b>Population:</b> Sims, K., Reith, A., Bright, E., Kaufman, J., Pyle, J., Epting, J., Gonzales, J., Adams, D., Powell, E., Urban, M., & Rose, A. (2023). LandScan Global 2022 [Data set]. Oak Ridge National Laboratory. https://doi.org/10.48690/1529167 <br><br><b>Administrative Boundaries:</b> FieldMaps, geoBoundaries, U.S. Department of State, U.S. Geological Survey. (2024, January 2). Data. Fieldmaps.io. Retrieved March 23, 2024, from https://fieldmaps.io/data, geometries simplified for this application<br><br><b>Conflict Events - Count of Political Violence events per administrative district:</b> ACLED, Raleigh, C., Kishi, R. & Linke, A. Political instability patterns are obscured by conflict dataset scope conditions, sources, and coding choices. Humanit Soc Sci Commun 10, 74 (2023). https://doi.org/10.1057/s41599-023-01559-4, acleddata.com<br><br><b>Avg. Travel Time To Cities - Derived from MAP travel time to cities dataset by calculating a Landscan population weighted average of the travel time to cities for each administrative district:</b> Accessibility to Healthcare | MAP. (2018, January 10). Malaria Atlas Project. Retrieved March 23, 2024, from https://malariaatlas.org/project-resources/accessibility-to-healthcare/<br><br><b>Poverty -  Poverty Headcount Ratio at US$ 2.15/day 2017 PPP (2019 line-up):</b> Global Subnational Atlas of Poverty (version June 2023) [Data set]. World Bank Group<br><br><b>Stunting - Percentage of children stunted (below -2 SD of height for age according to the WHO standard):</b> Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024<br><br><b>Wasting - Percentage of children wasted (below -2 SD of weight for height according to the WHO standard):</b> Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024<br><br><b>Agricultural Potential - The Agricultural Potential component provides the maximum agricultural income smallholders in a region can attain if performing at maximum capacity (their own, as well as of the markets, productive infrastructure, and basic services surrounding them). Agricultural income potential is determined by both the biophysical factors that impact agricultural production and the economic factors that influence crop prices:</b> Food and Agriculture Organization (FAO). (2024, February 2). HiH Agricultural Typologies. Agricultural Potential Datasets. Retrieved March 23, 2024, from https://data.apps.fao.org/?lang=en, datasets were retrieved for each relevant country.<br><br><b>Hunger - This application uses different sources for hunger:</b> for Kenya, Tanzania and Malawi, we use Percent of People Experiencing IPC Phase 2 or Above (2023) from the IPC, for Liberia, Rwanda, Madagascar, Mozambique, and Zambia we use the Prevalence of Moderate or Severe Food Insecurity from FAO surveys using the Food Insecurity Experience Scale (FIES):</b> The Integrated Food Security Phase Classification (IPC). (2024). IPC Country Analysis | IPC. IPC Country Analysis | IPC - Integrated Food Security Phase Classification. Retrieved March 23, 2024, from https://www.ipcinfo.org/ipc-country-analysis/en/?maptype=77106 or Cafiero, C., Gheri, F., Kepple, A.W., Rosero Moncayo, J. and Viviani, S. 2022. Access to food in 2021:</b> Filling data gaps. Results of twenty national surveys using the Food Insecurity Experience Scale (FIES). Rome. https://doi.org/10.4060/cc0721en<br><br><b>Under 5 Mortality Ratio - Probability of dying before the fifth birthday in the five or ten years preceding the survey, per 1,000 live births. Estimates are given for ten year periods for all characteristics, but for five year periods only for the national total, by residence, and by sex.:</b> Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024<br><br><b>Women's Literacy - Percentage of women who are literate:</b> Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024<br><br><b>Access to Handwashing - Percentage of households with a basic handwashing facility, defined as a handwashing facility with soap and water available:</b> Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024</span>"

const AreaSelect = () => {
  if (map && selector == "False") {
    selector = "True"
    console.log(selector + " cs")
    document.getElementsByClassName("button19")[0].classList.add("test_skill");
    document.getElementsByClassName("button19")[0].innerHTML = "Stop Selecting by Hover"
  } else if (map &&  selector == "True") {
    selector = "False"
    console.log(selector + " cs")
    document.getElementsByClassName("button19")[0].classList.remove("test_skill");
    document.getElementsByClassName("button19")[0].innerHTML = "Add Admins by Hovering"
  }};



const showReport = () => {
    window.dispatchEvent(new Event('resize'));  
    console.log(scen1Ref.current)
    try {if (scen1Ref.current.getLayers()[0].getLayers()) {
    resetHighlightScen1d();
    resetHighlightScen2d();}}
    catch {
      try {setTimeout(function(){
        console.log("I'm getting triggered")
        resetHighlightScen1d();
        resetHighlightScen2d();
       },5000);}
       catch {console.log("Resetting map didnt work");}
    }

    //open and close report
    var x = document.getElementById("report-div");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
   //add stuff to report
   var y = document.getElementById("report-inner-div");
   var z = document.getElementById("reportSourcing")
   z.innerHTML = defsSourcing
   y.innerHTML = ""
   if (scen1_idlist.length > 0 & scen2_idlist.length > 0) {
    y.innerHTML = "<br><u><b>Compare Scenario Details</u><br><br>" 
    var tablestuff = [
    ['Population (Landscan 2022)',bolderStart(scen1_population.toFixed(0), scen2_population.toFixed(0)) + numberWithCommas(scen1_population), greater(scen1_population.toFixed(0), scen2_population.toFixed(0)), bolderStart(scen2_population.toFixed(0), scen1_population.toFixed(0)) +  numberWithCommas(scen2_population)],
    ["Number of Administrative Units",bolderStart(scen1_idlist.length, scen2_idlist.length) +scen1_idlist.length,  greater(scen1_idlist.length, scen2_idlist.length ), bolderStart(scen2_idlist.length, scen1_idlist.length) +scen2_idlist.length ],
    ['Prevalence of Poverty (GSAP)', bolderStart(scen1_povest.toFixed(0), scen2_povest.toFixed(0)) + scen1_povest.toFixed(1),  greater(scen1_povest, scen2_povest), bolderStart(scen2_povest.toFixed(0), scen1_povest.toFixed(0)) + scen2_povest.toFixed(1) ],
    ["Hunger", bolderStart(scen1_hungest.toFixed(0), scen2_hungest.toFixed(0)) +scen1_hungest.toFixed(1), greater(scen1_hungest, scen2_hungest), bolderStart(scen2_hungest.toFixed(0), scen1_hungest.toFixed(0)) + scen2_hungest.toFixed(1)],
    ["Prevalence of Stunting",bolderStart(scen1_stuntest.toFixed(0), scen2_stuntest.toFixed(0)) + scen1_stuntest.toFixed(1),greater(scen1_stuntest, scen2_stuntest),bolderStart(scen2_stuntest.toFixed(0), scen1_stuntest.toFixed(0)) + scen2_stuntest.toFixed(1)],
    ["Prevalence of Wasting", bolderStart(scen1_wastest.toFixed(0), scen2_wastest.toFixed(0)) +scen1_wastest.toFixed(1),greater(scen1_wastest, scen2_wastest),bolderStart(scen2_wastest.toFixed(0), scen1_wastest.toFixed(0)) + scen2_wastest.toFixed(1)],
    ["Under 5 Mortality",bolderStart(scen1_u5mortest.toFixed(0), scen2_u5mortest.toFixed(0)) + scen1_u5mortest.toFixed(1),greater(scen1_u5mortest, scen2_u5mortest),bolderStart(scen2_u5mortest.toFixed(0), scen1_u5mortest.toFixed(0)) + scen2_u5mortest.toFixed(1)],
    ["Conflict Events",bolderStart(scen1_conflictEventsEst.toFixed(0), scen2_conflictEventsEst.toFixed(0)) + scen1_conflictEventsEst, greater(scen1_conflictEventsEst, scen2_conflictEventsEst), bolderStart(scen2_conflictEventsEst.toFixed(0), scen1_conflictEventsEst.toFixed(0)) + scen2_conflictEventsEst], 
    ["Access to Basic Handwashing",bolderStart(scen1_accesstoHWest.toFixed(0), scen2_accesstoHWest.toFixed(0)) + scen1_accesstoHWest.toFixed(1),greater(scen1_accesstoHWest, scen2_accesstoHWest),bolderStart(scen2_accesstoHWest.toFixed(0), scen1_accesstoHWest.toFixed(0)) + scen2_accesstoHWest.toFixed(1)],
     ["Percent of Women Literate",bolderStart(scen1_womensLitest.toFixed(0), scen2_womensLitest.toFixed(0)) + scen1_womensLitest.toFixed(1),greater(scen1_womensLitest, scen2_womensLitest),bolderStart(scen2_womensLitest.toFixed(0), scen1_womensLitest.toFixed(0)) + scen2_womensLitest.toFixed(1)], 
     ["Agricultural Potential",bolderStart(scen1_agPotentialEst, scen2_agPotentialEst) + scen1_agPotentialEst, greater(scen1_agPotentialEst, scen2_agPotentialEst),bolderStart(scen2_agPotentialEst, scen1_agPotentialEst) + scen2_agPotentialEst], 
     ["Avg. Travel Time to Nearest City", bolderStart(scen1_avgTravTimeEst.toFixed(1), scen2_avgTravTimeEst.toFixed(1)) +scen1_avgTravTimeEst.toFixed(1), greater(scen1_avgTravTimeEst, scen2_avgTravTimeEst), bolderStart(scen2_avgTravTimeEst.toFixed(1), scen1_avgTravTimeEst.toFixed(1)) + scen2_avgTravTimeEst.toFixed(1)]]
    var thtml = '<table id="compare-table">  <tr><th><center>Indicator</center></th><th><center>Scenario 1</center></th><th></th><th><center>Scenario 2</center></th></tr>'
    for (var i = 0; i < tablestuff.length; i++) {
      thtml += '<tr><td>' + tablestuff[i][0] + '</td><td><center>' + tablestuff[i][1] + '</center></td><td>' + tablestuff[i][2] + '</td><td><center>' + tablestuff[i][3] + '</center></td></tr>';
    }
    thtml += '</table>'
    y.innerHTML += thtml
    y.innerHTML += "<br><u><b>Additional Details</u></b><br> The administrative unit(s) included in Scenario 1: " + scen1_Admins.slice(2) + "."
    y.innerHTML += "<br><br>The administrative unit(s) included in Scenario 2 are: " + scen2_Admins.slice(2) + "."
    }
    //add stuff to report if scenario 1 only
    else if (scenario == 1) {
    var mapC2 = document.getElementById("map-container2");
    console.log(mapC2)
    if (mapC2.style.display === "none") {
      mapC2.style.display = "block";
    } else if (mapC2.style.display == "") {
      mapC2.style.display = "none";
    }
    else {
      mapC2.style.display = "none";
    }
    var headC2 = document.getElementById("head-desc3");
    if (headC2.style.display === "none") {
      headC2.style.display = "block";
    } else {
      headC2.style.display = "none";
    }
  y.innerHTML = "<br><u><b>Scenario 1 Details</u></b><br>This scenario selected " + scen1_idlist.length + " administrative unit(s) and has a population of approximately "+ numberWithCommas(scen1_population) +" people. The following table shows summary statistics for our ten indicators of interest across the selected areas.<br><br>" 
    var tablestuff = [['Prevalence of Poverty (GSAP)', scen1_povest.toFixed(1)],["Hunger", scen1_hungest.toFixed(1)],["Prevalence of Stunting", scen1_stuntest.toFixed(1)],["Prevalence of Wasting", scen1_wastest.toFixed(1)],["Under 5 Mortality", scen1_u5mortest.toFixed(1)],["Conflict Events", scen1_conflictEventsEst], ["Access to Basic Handwashing", scen1_accesstoHWest.toFixed(1)], ["Percent of Women Literate", scen1_womensLitest.toFixed(1)], ["Agricultural Potential", scen1_agPotentialEst], ["Avg. Travel Time to Nearest City", scen1_avgTravTimeEst.toFixed(1)]]
    var thtml = '<table id="compare-table">  <tr><th><center>Indicator</center></th><th><center>Scenario 1</center></th></tr>'
    for (var i = 0; i < tablestuff.length; i++) {
      thtml += '<tr><td>' + tablestuff[i][0] + '</td><td>' + tablestuff[i][1] + '</td></tr>';
    }
    thtml += '</table>'
    y.innerHTML += thtml
    y.innerHTML += "<br><u><b>Additional Details</u></b><br> The administrative unit(s) included in Scenario 1: " + scen1_Admins.slice(2) + "."
    }
    //add stuff to report if scenario 2 only
    else if (scenario == 2) {
    var mapC1 = document.getElementById("map-container1");
    if (mapC1.style.display === "none") {
      mapC1.style.display = "block";
    } else {
      mapC1.style.display = "none";
    }
    var headC1 = document.getElementById("head-desc2");
    if (headC1.style.display === "none") {
      headC1.style.display = "block";
    } else {
      headC1.style.display = "none";
    }
      y.innerHTML = "<br><u><b>Scenario 2 Details</u></b><br>This scenario selected " + scen2_idlist.length + " administrative unit(s) and has a population of approximately "+ numberWithCommas(scen2_population) +" people. The following table shows summary statistics for our ten indicators of interest across the selected areas.<br><br>" 
      var tablestuff = [['Prevalence of Poverty (GSAP)', scen2_povest.toFixed(1)],["Hunger", scen2_hungest.toFixed(1)],["Prevalence of Stunting", scen2_stuntest.toFixed(1)],["Prevalence of Wasting", scen2_wastest.toFixed(1)],["Under 5 Mortality", scen2_u5mortest.toFixed(1)],["Conflict Events", scen2_conflictEventsEst], ["Access to Basic Handwashing", scen2_accesstoHWest.toFixed(1)], ["Percent of Women Literate", scen2_womensLitest.toFixed(1)], ["Agricultural Potential", scen2_agPotentialEst], ["Avg. Travel Time to Nearest City", scen2_avgTravTimeEst.toFixed(1)]]
      var thtml = '<table id="scen2-table">'
      var thtml = '<table id="compare-table">  <tr><th><center>Indicator</center></th><th><center>Scenario 2</center></th></tr>'
      for (var i = 0; i < tablestuff.length; i++) {
        thtml += '<tr><td>' + tablestuff[i][0] + '</td><td>' + tablestuff[i][1] + '</td></tr>';
      }
      thtml += '</table>'
      y.innerHTML += thtml
      y.innerHTML += "<br><u><b>Additional Details</u></b><br> The administrative unit(s) included in Scenario 2: "  + scen2_Admins.slice(2) + "."
      }
      else if (scenario == 0) {
        y.innerHTML = "<br><u><b>No scenarios have been developed, click Create Scenario 1 to start building a targeting scenario</u></b>"
        }
    //console.log(x)
  }

  const updatePDFData = () => {
  return ("hi I am the data")  
  }

  const generatePdfDocument = async (documentData,fileName) => {
    const blob = await pdf((
        <MyDocument/>
    )).toBlob();
    saveAs(blob, "latestDownload.pdf");};


  const showUpdatePDF =  async () => {
    //console.log(mapRef.current.getSize().x);
    console.log(document.getElementById('report-inner-div-map1').clientWidth)
    var wd =  document.getElementById('report-inner-div-map1').clientWidth
    var hth = document.getElementById('report-inner-div-map1').clientHeight
    const _PageSize= { 	height: hth, width: wd}
    var haveResult = "no"
    setTimeout(function(){
    domtoimage.toPng(document.getElementById('report-inner-div-map1'), _PageSize)
    //.then(function (blob) {
    //  window.saveAs(blob, 'my-node.png');})
    .then(function (dataUrl) {
      img1a = dataUrl;
      //console.log(img1a)
      setDetails(["mapsReset"]);
      haveResult = "yes";
    })  ;},1000)
    //console.log(img1a)
    //MapPrint()
    //takeScreenShot2()
    //downloadScreenshot()
    //printDocument()
    //easyPrinter()
    //generatePdfDocument();
    var pdfButton = document.getElementById("downloadPDF-report");
    if (pdfButton.style.display === "none") {
       pdfButton.style.display = "block";
    } else {
       pdfButton.style.display = "none";
    }
    //refix map rendering whihc breaks when I update the state
    console.log(scen2_idlist.length)
    if (scen2_idlist.length == 0) {
    document.getElementById("head-desc3").style.display = "none"
    var mc2 = document.getElementById("map-container2");
    mc2.style.display = "none"
    
    //resetHighlightScen1d();
    //resetHighlightScen2d();
  }

  }



Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  textTable: {
    margin: 3,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Oswald'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 25,
  },
  header: {
    backgroundColor: '#005F73',
    fontSize: 14,
    top: 4,
    bottom:4,
    textAlign: 'center',
    color: 'white',
    borderTop: 'none',
    fontFamily: 'Oswald'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  row1: {
    width: '45%',
  },
  row2: {
    width: '20%',
  },
  row3: {
    width: '10%',
  },
  row4: {
    width: '20%',
  },
  row1a: {
    width: '65%',
  },
  row2a: {
    width: '35%',
  },
});

function compareElements(a,b) {
if (a>b) {return ">"}
else if (b>a) {return "<"}
else {return "="}
}

function MyDocument(props) {
  //console.log(styles.body)
  if (scen1_idlist.length > 0 & scen2_idlist.length > 0) {
  return(
  <Document>
     <Page style={styles.body}>
          <Text style={styles.title}>User Defined Scenario Result</Text>
          <Text style={styles.author}>Produced by International Development Targeting Scenario Builder Tool</Text>
          <Text style={styles.subtitle}>
          The user selected two scenarios. The first scenario included {scen1_idlist.length} administrative unit(s) and has a population of approximately {numberWithCommas(scen1_population)} people. The second scenario included {scen2_idlist.length} administrative unit(s) and has a population of approximately {numberWithCommas(scen2_population)} people.  The following table shows summary statistics for our ten indicators of interest across the selected areas.
          </Text>
          <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
              <Text style={styles.row1}>Indicator</Text>
              <Text style={styles.row2}>Scenario 1</Text>
              <Text style={styles.row3}></Text>
              <Text style={styles.row4}>Scenario 4</Text>
              </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Population Estimate</Text>
          </Text> 
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(numberWithCommas((scen1_population).toFixed(0)))}</Text>
          </Text>   
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_population, scen2_population)}</Text>
          </Text>   
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(numberWithCommas((scen2_population).toFixed(0)))}</Text>
          </Text>        
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Number of Administrative Units</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_idlist.length)}</Text>
          </Text>          
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_idlist.length, scen2_idlist.length)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{scen2_idlist.length}</Text>
          </Text>   
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Prevalence of Poverty</Text>
          </Text> 
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_povest).toFixed(1)}%</Text>
          </Text>   
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_povest, scen2_povest)}</Text>
          </Text>   
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_povest).toFixed(1)}%</Text>
          </Text>        
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Hunger</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_hungest).toFixed(1)}%</Text>
          </Text>          
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_hungest, scen2_hungest)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_hungest).toFixed(1)}%</Text>
          </Text>   
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Prevalence of Stunting</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_stuntest).toFixed(1)}%</Text>
          </Text> 
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_stuntest, scen2_stuntest)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_stuntest).toFixed(1)}%</Text>
          </Text>         
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Prevalence of Wasting</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_wastest).toFixed(1)}%</Text>
          </Text>   
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_wastest, scen2_wastest)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_wastest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Under 5 Mortaility per 10,000</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_u5mortest).toFixed(1)}</Text>
          </Text>     
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_u5mortest, scen2_u5mortest)}</Text>
          </Text>     
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_u5mortest).toFixed(1)}</Text>
          </Text>  
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Conflict Events</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_conflictEventsEst).toFixed(0)}</Text>
          </Text>  
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_conflictEventsEst, scen2_conflictEventsEst)}</Text>
          </Text>  
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_conflictEventsEst).toFixed(0)}</Text>
          </Text>         
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Access to Basic Handwashing</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_accesstoHWest).toFixed(1)}%</Text>
          </Text>   
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_accesstoHWest, scen2_accesstoHWest)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_accesstoHWest).toFixed(1)}%</Text>
          </Text>       
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Percent of Women Literate</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_womensLitest).toFixed(1)}%</Text>
          </Text>
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_womensLitest, scen2_womensLitest)}</Text>
          </Text>  
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_womensLitest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Agricultural Potential</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_agPotentialEst).toFixed(0)}</Text>
          </Text> 
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_agPotentialEst, scen2_agPotentialEst)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_agPotentialEst).toFixed(0)}</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1}>
            <Text style={styles.textTable}>Avg. Travel Time To Nearest City</Text>
          </Text>
          <Text style={styles.row2}>
            <Text style={styles.textTable}>{(scen1_avgTravTimeEst).toFixed(1)} minutes</Text>
          </Text>  
          <Text style={styles.row3}>
            <Text style={styles.textTable}>{compareElements(scen1_avgTravTimeEst, scen2_avgTravTimeEst)}</Text>
          </Text> 
          <Text style={styles.row4}>
            <Text style={styles.textTable}>{(scen2_avgTravTimeEst).toFixed(1)} minutes</Text>
          </Text>         
          </View>
          </View>
          <ImageRPDF
            style={styles.image}
            src= {img1a}
          />
          <Text style={styles.subtitle}>
            List of Administrative Units Selected by the User:
          </Text>
          <Text style={styles.text}>
            {scen1_Admins.slice(2)}{scen2_Admins.slice(2)}
          </Text>
          <Text style={styles.subtitle}>
            Analytic Caveats:
          </Text>
          <Text style={styles.text}>
          1. For several datasets, data was only available at the first-order administrative level. For the purposes of this application, we assign each second-order administrative unit the value of the first order-administrative unit in the cases where data is not available.
          </Text>
          <Text style={styles.text}>
          2. Two datasets should not be compared across countries: Hunger and Agricultural potential as they may use different datasets and methods depending on the selected countries.
          </Text>
          <Text style={styles.text}>
          3. Summary values are population weighted averages based on Landscan 2022 population estimates for each administrative unit.
          </Text>
          <Text style={styles.subtitle}>
          Sources and Definitions:
          </Text>
          <Text style={styles.text}>
          Population: Sims, K., Reith, A., Bright, E., Kaufman, J., Pyle, J., Epting, J., Gonzales, J., Adams, D., Powell, E., Urban, M., & Rose, A. (2023). LandScan Global 2022 [Data set]. Oak Ridge National Laboratory. https://doi.org/10.48690/1529167
          </Text>
          <Text style={styles.text}>
          Administrative Boundaries: FieldMaps, geoBoundaries, U.S. Department of State, U.S. Geological Survey. (2024, January 2). Data. Fieldmaps.io. Retrieved March 23, 2024, from https://fieldmaps.io/data, geometries simplified for this application
          </Text>
          <Text style={styles.text}>
          Conflict Events - Count of Political Violence events per administrative district: ACLED, Raleigh, C., Kishi, R. & Linke, A. Political instability patterns are obscured by conflict dataset scope conditions, sources, and coding choices. Humanit Soc Sci Commun 10, 74 (2023). https://doi.org/10.1057/s41599-023-01559-4, acleddata.com
          </Text>
          <Text style={styles.text}>
          Avg. Travel Time To Cities - Derived from MAP travel time to cities dataset by calculating a Landscan population weighted average of the travel time to cities for each administrative district: Accessibility to Healthcare | MAP. (2018, January 10). Malaria Atlas Project. Retrieved March 23, 2024, from https://malariaatlas.org/project-resources/accessibility-to-healthcare/
          </Text>
          <Text style={styles.text}>
          Poverty - Poverty Headcount Ratio at US$ 2.15/day 2017 PPP (2019 line-up): Global Subnational Atlas of Poverty (version June 2023) [Data set]. World Bank Group
          </Text>
          <Text style={styles.text}>
          Stunting - Percentage of children stunted (below -2 SD of height for age according to the WHO standard): Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Wasting - Percentage of children wasted (below -2 SD of weight for height according to the WHO standard): Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Agricultural Potential - The Agricultural Potential component provides the maximum agricultural income smallholders in a region can attain if performing at maximum capacity (their own, as well as of the markets, productive infrastructure, and basic services surrounding them). Agricultural income potential is determined by both the biophysical factors that impact agricultural production and the economic factors that influence crop prices: Food and Agriculture Organization (FAO). (2024, February 2). HiH Agricultural Typologies. Agricultural Potential Datasets. Retrieved March 23, 2024, from https://data.apps.fao.org/?lang=en, datasets were retrieved for each relevant country.
          </Text>
          <Text style={styles.text}>
          Hunger - This application uses different sources for hunger: for Kenya, Tanzania and Malawi, we use Percent of People Experiencing IPC Phase 2 or Above (2023) from the IPC, for Liberia, Rwanda, Madagascar, Mozambique, and Zambia we use the Prevalence of Moderate or Severe Food Insecurity from FAO surveys using the Food Insecurity Experience Scale (FIES): The Integrated Food Security Phase Classification (IPC). (2024). IPC Country Analysis | IPC. IPC Country Analysis | IPC - Integrated Food Security Phase Classification. Retrieved March 23, 2024, from https://www.ipcinfo.org/ipc-country-analysis/en/?maptype=77106 or Cafiero, C., Gheri, F., Kepple, A.W., Rosero Moncayo, J. and Viviani, S. 2022. Access to food in 2021: Filling data gaps. Results of twenty national surveys using the Food Insecurity Experience Scale (FIES). Rome. https://doi.org/10.4060/cc0721en
          </Text>
          <Text style={styles.text}>
          Under 5 Mortality Ratio - Probability of dying before the fifth birthday in the five or ten years preceding the survey, per 1,000 live births. Estimates are given for ten year periods for all characteristics, but for five year periods only for the national total, by residence, and by sex.: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Women's Literacy - Percentage of women who are literate: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Access to Handwashing - Percentage of households with a basic handwashing facility, defined as a handwashing facility with soap and water available: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>);}
  else {
    {
      return(
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>User Defined Scenario Result</Text>
          <Text style={styles.author}>Produced by International Development Targeting Scenario Builder Tool</Text>
          <Text style={styles.subtitle}>
          This scenario selected {scen1_idlist.length + scen2_idlist.length} administrative unit(s) and has a population of approximately {numberWithCommas(scen1_population + scen2_population)} people. The following table shows summary statistics for our ten indicators of interest across the selected areas.
          </Text>
          <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
              <Text style={styles.row1a}>Indicator</Text>
              <Text style={styles.row2a}>User Selected Scenario</Text>
              </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Prevalence of Poverty</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_povest+scen2_povest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Hunger</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_hungest+scen2_hungest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Prevalence of Stunting</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_stuntest+scen2_stuntest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Prevalence of Wasting</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_wastest+scen2_wastest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Under 5 Mortaility per 10,000</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_u5mortest+scen2_u5mortest).toFixed(1)}</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Conflict Events</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_conflictEventsEst+scen2_conflictEventsEst).toFixed(0)}</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Access to Basic Handwashing</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_accesstoHWest+scen2_accesstoHWest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Percent of Women Literate</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_womensLitest+scen2_womensLitest).toFixed(1)}%</Text>
          </Text>          
          </View>
          <View style={[styles.row, {backgroundColor: "#f2f2f2"}]} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Agricultural Potential</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_agPotentialEst+scen2_agPotentialEst).toFixed(0)}</Text>
          </Text>          
          </View>
          <View style={styles.row} wrap={false}>
          <Text style={styles.row1a}>
            <Text style={styles.textTable}>Avg. Travel Time To Nearest City</Text>
          </Text>
          <Text style={styles.row2a}>
            <Text style={styles.textTable}>{(scen1_avgTravTimeEst+scen2_avgTravTimeEst).toFixed(1)} minutes</Text>
          </Text>          
          </View>
          </View>
          <ImageRPDF
            style={styles.image}
            src= {img1a}
          />
          <Text style={styles.subtitle}>
            List of Administrative Units Selected by the User:
          </Text>
          <Text style={styles.text}>
            {scen1_Admins.slice(2)}{scen2_Admins.slice(2)}
          </Text>
          <Text style={styles.subtitle}>
            Analytic Caveats:
          </Text>
          <Text style={styles.text}>
          1. For several datasets, data was only available at the first-order administrative level. For the purposes of this application, we assign each second-order administrative unit the value of the first order-administrative unit in the cases where data is not available.
          </Text>
          <Text style={styles.text}>
          2. Two datasets should not be compared across countries: Hunger and Agricultural potential as they may use different datasets and methods depending on the selected countries.
          </Text>
          <Text style={styles.text}>
          3. Summary values are population weighted averages based on Landscan 2022 population estimates for each administrative unit.
          </Text>
          <Text style={styles.subtitle}>
          Sources and Definitions:
          </Text>
          <Text style={styles.text}>
          Population: Sims, K., Reith, A., Bright, E., Kaufman, J., Pyle, J., Epting, J., Gonzales, J., Adams, D., Powell, E., Urban, M., & Rose, A. (2023). LandScan Global 2022 [Data set]. Oak Ridge National Laboratory. https://doi.org/10.48690/1529167
          </Text>
          <Text style={styles.text}>
          Administrative Boundaries: FieldMaps, geoBoundaries, U.S. Department of State, U.S. Geological Survey. (2024, January 2). Data. Fieldmaps.io. Retrieved March 23, 2024, from https://fieldmaps.io/data, geometries simplified for this application
          </Text>
          <Text style={styles.text}>
          Conflict Events - Count of Political Violence events per administrative district: ACLED, Raleigh, C., Kishi, R. & Linke, A. Political instability patterns are obscured by conflict dataset scope conditions, sources, and coding choices. Humanit Soc Sci Commun 10, 74 (2023). https://doi.org/10.1057/s41599-023-01559-4, acleddata.com
          </Text>
          <Text style={styles.text}>
          Avg. Travel Time To Cities - Derived from MAP travel time to cities dataset by calculating a Landscan population weighted average of the travel time to cities for each administrative district: Accessibility to Healthcare | MAP. (2018, January 10). Malaria Atlas Project. Retrieved March 23, 2024, from https://malariaatlas.org/project-resources/accessibility-to-healthcare/
          </Text>
          <Text style={styles.text}>
          Poverty - Poverty Headcount Ratio at US$ 2.15/day 2017 PPP (2019 line-up): Global Subnational Atlas of Poverty (version June 2023) [Data set]. World Bank Group
          </Text>
          <Text style={styles.text}>
          Stunting - Percentage of children stunted (below -2 SD of height for age according to the WHO standard): Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Wasting - Percentage of children wasted (below -2 SD of weight for height according to the WHO standard): Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Agricultural Potential - The Agricultural Potential component provides the maximum agricultural income smallholders in a region can attain if performing at maximum capacity (their own, as well as of the markets, productive infrastructure, and basic services surrounding them). Agricultural income potential is determined by both the biophysical factors that impact agricultural production and the economic factors that influence crop prices: Food and Agriculture Organization (FAO). (2024, February 2). HiH Agricultural Typologies. Agricultural Potential Datasets. Retrieved March 23, 2024, from https://data.apps.fao.org/?lang=en, datasets were retrieved for each relevant country.
          </Text>
          <Text style={styles.text}>
          Hunger - This application uses different sources for hunger: for Kenya, Tanzania and Malawi, we use Percent of People Experiencing IPC Phase 2 or Above (2023) from the IPC, for Liberia, Rwanda, Madagascar, Mozambique, and Zambia we use the Prevalence of Moderate or Severe Food Insecurity from FAO surveys using the Food Insecurity Experience Scale (FIES): The Integrated Food Security Phase Classification (IPC). (2024). IPC Country Analysis | IPC. IPC Country Analysis | IPC - Integrated Food Security Phase Classification. Retrieved March 23, 2024, from https://www.ipcinfo.org/ipc-country-analysis/en/?maptype=77106 or Cafiero, C., Gheri, F., Kepple, A.W., Rosero Moncayo, J. and Viviani, S. 2022. Access to food in 2021: Filling data gaps. Results of twenty national surveys using the Food Insecurity Experience Scale (FIES). Rome. https://doi.org/10.4060/cc0721en
          </Text>
          <Text style={styles.text}>
          Under 5 Mortality Ratio - Probability of dying before the fifth birthday in the five or ten years preceding the survey, per 1,000 live births. Estimates are given for ten year periods for all characteristics, but for five year periods only for the national total, by residence, and by sex.: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Women's Literacy - Percentage of women who are literate: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.text}>
          Access to Handwashing - Percentage of households with a basic handwashing facility, defined as a handwashing facility with soap and water available: Spatial Data Repository, The Demographic and Health Surveys Program. ICF International. Funded by the United States Agency for International Development (USAID). Available from spatialdata.dhsprogram.com. Accessed 15 February 2024
          </Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      </Document>);}
  }
  console.log(img1.src)
}


const addScenarioButtons = () => {
    var x = document.getElementById("scenario-div");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }}


  const addInfo = () => {
  var x = document.getElementById("info-div");
  x.innerHTML = "<span style='color:black;font-size:12px;font-family:Gill Sans,Gill Sans MT, Calibri, sans-serif;'><b>About</b><br>This tool allows international development practitioners to develop scenarios regarding where they will target international development programs. First, users can visualize several key development indicators across different geographies. Next, they can summarize those indicators across subsets of administrative areas in their countries of interest and print the results to share with colleagues. The goal is to ensure that development practitioners have easy access to, and are using, high quality quantitative data as a determinant in their decision making about where to invest their limited resources.  If you have questions please reach out to Kyle Alden at kyle.alden@gmail.com<br><br></span>" + defsSourcing
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
     console.log("I have an effect that triggers on scenarioDetails change")
     if (scen2_idlist == 0) {
      console.log("No Scen2 Admins")
      console.log(document.getElementById("map-container2").style.display)
      document.getElementById("map-container2").style.display = "none"
      document.getElementById("head-desc3").style.display = "none"
      if (scen1_idlist.length > 0) {
        console.log("I need to fix scenario 1 map, but need to wait until the SimpleMap1 is reinitiated")
        setTimeout(function(){
        resetHighlightScen1d()
        }, 5000)}
     }
     if (scen1_idlist == 0) {
      console.log("No Scen1 Admins")
      console.log(document.getElementById("map-container1").style.display)
      document.getElementById("map-container1").style.display = "none"
      document.getElementById("head-desc2").style.display = "none"
      if (scen2_idlist.length > 0) {
        console.log("I need to fix scenario 2 map, but need to wait until the SimpleMap1 is reinitiated")
        setTimeout(function(){
        resetHighlightScen2d()
        }, 5000)}
     }
     if (scen1_idlist.length > 0 & scen2_idlist.length > 0) {
      setTimeout(function(){
        resetHighlightScen1d()
        resetHighlightScen2d()
        }, 5000)}
    }, [scenarioDetails]);  

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    L.easyButton( "fa-map", () => {
      addScenarioButtons()
    }, 'Create Targeting Scenarios').addTo(map);

  }, [map]);

  const  ScenToFront = () => {
      if (map && popRef.current) {
        const mapC = map;
        console.log("Fronting Correct Scenario" + scenario)

        if (scenario == 1) {
        const popLayer = popRef.current;
        mapC.removeLayer(popLayer);
        mapC.addLayer(popLayer);}
        else if (scenario == 2) {
          const popLayer = scen2Ref.current;
          mapC.removeLayer(popLayer);
          mapC.addLayer(popLayer)}
       ;};
        }
       
  

  const  PointsToFront = () => {
    setTimeout(function(){
      if (map && popRef.current) {
        const mapC = map;
        console.log("I'm fronting2")
        const popLayer = popRef.current;
        //const feelLayer = feelRef.current;
        //mapC.removeLayer(feelLayer);
        //mapC.addLayer(feelLayer);
        var lc = document.getElementsByClassName('leaflet-control-layers');
        lc[0].style.visibility = 'hidden';
        mapC.removeLayer(popLayer);
        mapC.addLayer(popLayer);}
     },1000);
   }

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    L.easyButton("fa-bars", () => {
      addLegend()
    }, 'View Legend').addTo(map);

  }, [map]);

  useEffect(() => {
    if (!map) return;
    //const map = mapRef.current;
    console.log(map)
    L.easyButton("fa-info-circle", () => {
      addInfo()
    }, 'Review Application Details').addTo(map);

  }, [map]);


//trying SimpleMapScreenshotter
    const snapshotOptions = {
      hideElementsWithSelectors: [
        ".leaflet-control-container",
        ".leaflet-dont-include-pane",
        "#snapshot-button"
      ],
      hidden: true
    };
    //const screenshotter = new SimpleMapScreenshoter(snapshotOptions);
    //screenshotter.addTo(mapRef);
    // What happens when you clikc the "Snapshot Greek Border" button:
  
    const takeScreenShot2 = () => {
          // Get bounds of feature, pad ot a but too
      //const featureBounds = greekborder.getBounds().pad(0.1);
      const nw = LatLng((latCent(country)+2), (lonCent(country)+2))
      const se = LatLng((latCent(country)-2), (lonCent(country)-2))
      // Get pixel position on screen of top left and bottom right
      // of the bounds of the feature
      //const nw = featureBounds.getNorthWest();
      //const se = featureBounds.getSouthEast();
      const topLeft = mapRef.latLngToContainerPoint(nw);
      const bottomRight = mapRef.latLngToContainerPoint(se);

      // Get the resulting image size that contains the feature
      const imageSize = bottomRight.subtract(topLeft);

      // Set up screenshot function
      screenshotter
        .takeScreen("image")
        .then((image) => {
          // Create <img> element to render img data
          var img = new Image();

          // once the image loads, do the following:
          img.onload = () => {
            // Create canvas to process image data
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set canvas size to the size of your resultant image
            canvas.width = imageSize.x;
            canvas.height = imageSize.y;

            // Draw just the portion of the whole map image that contains
            // your feature to the canvas
            // from https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas
            ctx.drawImage(
              img,
              topLeft.x,
              topLeft.y,
              imageSize.x,
              imageSize.y,
              0,
              0,
              imageSize.x,
              imageSize.y
            );

            // Create URL for resultant png
            var imageurl = canvas.toDataURL("image/png");
            console.log(imageurl);

            const resultantImage = new Image();
            resultantImage.style = "border: 1px solid black";
            resultantImage.src = imageurl;

            document.body.appendChild(canvas);

            canvas.toBlob(function (blob) {
              // saveAs function installed as part of leaflet snapshot package
              saveAs(blob, "greek_border.png");
            });
          };

          // set the image source to what the snapshotter captured
          // img.onload will fire AFTER this
          img.src = image;
        })
        .catch((e) => {
          alert(e.toString());
        });
    };
  


  //attempt using react-screenshot
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    console.log(mapsRef);
    takeScreenShot(mapsRef.current).then(download);}

//using html2canvas
  const printDocument = () => {
    const input = document.getElementById('report-inner-div-map1');
    setTimeout(function(){
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("Scenario Builder Result.pdf");
      }), 1000})
    ;
  }

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });
  


      
  const easyPrinter2 = () => {
    const mr = mapRef.current
    var printPlugin = L.easyPrint({
      hidden: true,
      sizeModes: ['A4Portrait']
    }).addTo(mr); 
    printPlugin.printMap('A4Portrait', 'MyFileName.png');
  }



  //lets try the browser leaflet thing
  function BrowserPrint(props) {
    const map = useMap();
    useEffect(() => {
      const control = L.browserPrint({
       
      });
      map.addControl(control)
      return () => {
        map.removeControl(control);
      }
    }, [map]);}
  

  try{
    var country = document.getElementById('country').value()
    }catch(e){
    var country = 'all';
    }
  
  //hide the layers control
  const  HideLayersControl = () => {
  var lc = document.getElementsByClassName('leaflet-control-layers');
  lc[0].style.visibility = 'hidden';}


  const [center, setCenter] = useState({ lat: latCent(country), lng: lonCent(country) });
  const zoomLevel = zoomLevelVar(country);
  return (
    <>
    <div id="head-desc" style={{zIndex: 20000, position: "absolute", top: 1, left: 0, width: "100%"}}>
      <h1>Scenario Builder for Development Programs<br></br> 
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
      {/*The LayersControl tag help us organize our layers into baselayers and tilelayers*/}
      <TileLayer
            attribution='Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}"
            opacity={0.5} 
            maxZoom={21}/>   
      <Pane name="LabelPane" style={{zIndex:650}}> 
      <LayersControl.Overlay name="Labels" unchecked>
          <TileLayer
            ref={labelsRef}
            opacity={0.75}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url= "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            maxZoom={21}/>  
             <TileLayer
            ref={lineRef}
            opacity={0.5}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url= "https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.{ext}"
            ext =  'png'
            minZoom = {8}
            maxZoom={21}/>  
        </LayersControl.Overlay>
      </Pane>
      <LayersControl ref={layersRef} position="topright">
      <LayersControl.Overlay name="Countries - Base" checked>
          <LayerGroup id='countriesG' ref={countryRef} ><KcrestCountries /></LayerGroup>
        </LayersControl.Overlay>
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
          <FeatureGroup id='popG' ref={popRef}  ><KcrestFeaturesFront /></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Scenario 2" checked>
          <FeatureGroup id='popG' ref={scen2Ref}  ><KcrestScenario2 /></FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Countries - Base" unchecked>
          <LayerGroup id='countriesGhana' ref={countryRefGhana} ><GhanaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty" unchecked>
          <LayerGroup id='povGhana' ref={povRefGhana} ><PovertyGhana /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger" unchecked>
        <LayerGroup id='hungerGhana' ref={hungerRefGhana} ><HungerGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City" unchecked>
        <LayerGroup id='travGhana' ref={travRefGhana} ><TraveltimeGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential" unchecked>
        <LayerGroup id='agGhana' ref={agpotRefGhana} ><AgPotentialGhana /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary" unchecked>
          <LayerGroup id='stuntingGhana' ref={stuntingRefGhana} ><StuntingGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary" unchecked>
          <LayerGroup id='wastingGhana' ref={wastingRefGhana} ><WastingGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality" unchecked>
          <LayerGroup id='u5mortGhana' ref={u5mortRefGhana} ><Under5MortGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events" unchecked>
          <LayerGroup id='conflictGhana' ref={conflictRefGhana} ><ConflictGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy" unchecked>
          <LayerGroup id='literacyGhana' ref={literacyRefGhana} ><LiteracyGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station" unchecked>
          <LayerGroup id='handwashingGhana' ref={handwashingRefGhana} ><HandwashingGhana /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base" unchecked>
          <LayerGroup id='countriesLiberia' ref={countryRefLiberia} ><LiberiaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty" unchecked>
          <LayerGroup id='povLiberia' ref={povRefLiberia} ><PovertyLiberia /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger" unchecked>
        <LayerGroup id='hungerLiberia' ref={hungerRefLiberia} ><HungerLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City" unchecked>
        <LayerGroup id='travLiberia' ref={travRefLiberia} ><TraveltimeLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential" unchecked>
        <LayerGroup id='agLiberia' ref={agpotRefLiberia} ><AgPotentialLiberia /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary" unchecked>
          <LayerGroup id='stuntingLiberia' ref={stuntingRefLiberia} ><StuntingLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary" unchecked>
          <LayerGroup id='wastingLiberia' ref={wastingRefLiberia} ><WastingLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality" unchecked>
          <LayerGroup id='u5mortLiberia' ref={u5mortRefLiberia} ><Under5MortLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events" unchecked>
          <LayerGroup id='conflictLiberia' ref={conflictRefLiberia} ><ConflictLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy" unchecked>
          <LayerGroup id='literacyLiberia' ref={literacyRefLiberia} ><LiteracyLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station" unchecked>
          <LayerGroup id='handwashingLiberia' ref={handwashingRefLiberia} ><HandwashingLiberia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base" unchecked>
          <LayerGroup id='countriesSenegal' ref={countryRefSenegal} ><SenegalCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty" unchecked>
          <LayerGroup id='povSenegal' ref={povRefSenegal} ><PovertySenegal /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger" unchecked>
        <LayerGroup id='hungerSenegal' ref={hungerRefSenegal} ><HungerSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City" unchecked>
        <LayerGroup id='travSenegal' ref={travRefSenegal} ><TraveltimeSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential" unchecked>
        <LayerGroup id='agSenegal' ref={agpotRefSenegal} ><AgPotentialSenegal /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary" unchecked>
          <LayerGroup id='stuntingSenegal' ref={stuntingRefSenegal} ><StuntingSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary" unchecked>
          <LayerGroup id='wastingSenegal' ref={wastingRefSenegal} ><WastingSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality" unchecked>
          <LayerGroup id='u5mortSenegal' ref={u5mortRefSenegal} ><Under5MortSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events" unchecked>
          <LayerGroup id='conflictSenegal' ref={conflictRefSenegal} ><ConflictSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy" unchecked>
          <LayerGroup id='literacySenegal' ref={literacyRefSenegal} ><LiteracySenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station" unchecked>
          <LayerGroup id='handwashingSenegal' ref={handwashingRefSenegal} ><HandwashingSenegal /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Kenya" unchecked>
          <LayerGroup id='countriesKenya' ref={countryRefKenya} ><KenyaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Kenya" unchecked>
          <LayerGroup id='povKenya' ref={povRefKenya} ><PovertyKenya /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Kenya" unchecked>
        <LayerGroup id='hungerKenya' ref={hungerRefKenya} ><HungerKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Kenya" unchecked>
        <LayerGroup id='travKenya' ref={travRefKenya} ><TraveltimeKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Kenya" unchecked>
        <LayerGroup id='agKenya' ref={agpotRefKenya} ><AgPotentialKenya /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Kenya" unchecked>
          <LayerGroup id='stuntingKenya' ref={stuntingRefKenya} ><StuntingKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Kenya" unchecked>
          <LayerGroup id='wastingKenya' ref={wastingRefKenya} ><WastingKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Kenya" unchecked>
          <LayerGroup id='u5mortKenya' ref={u5mortRefKenya} ><Under5MortKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Kenya" unchecked>
          <LayerGroup id='conflictKenya' ref={conflictRefKenya} ><ConflictKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Kenya" unchecked>
          <LayerGroup id='literacyKenya' ref={literacyRefKenya} ><LiteracyKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Kenya" unchecked>
          <LayerGroup id='handwashingKenya' ref={handwashingRefKenya} ><HandwashingKenya /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Malawi" unchecked>
          <LayerGroup id='countriesMalawi' ref={countryRefMalawi} ><MalawiCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Malawi" unchecked>
          <LayerGroup id='povMalawi' ref={povRefMalawi} ><PovertyMalawi /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Malawi" unchecked>
        <LayerGroup id='hungerMalawi' ref={hungerRefMalawi} ><HungerMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Malawi" unchecked>
        <LayerGroup id='travMalawi' ref={travRefMalawi} ><TraveltimeMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Malawi" unchecked>
        <LayerGroup id='agMalawi' ref={agpotRefMalawi} ><AgPotentialMalawi /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Malawi" unchecked>
          <LayerGroup id='stuntingMalawi' ref={stuntingRefMalawi} ><StuntingMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Malawi" unchecked>
          <LayerGroup id='wastingMalawi' ref={wastingRefMalawi} ><WastingMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Malawi" unchecked>
          <LayerGroup id='u5mortMalawi' ref={u5mortRefMalawi} ><Under5MortMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Malawi" unchecked>
          <LayerGroup id='conflictMalawi' ref={conflictRefMalawi} ><ConflictMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Malawi" unchecked>
          <LayerGroup id='literacyMalawi' ref={literacyRefMalawi} ><LiteracyMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Malawi" unchecked>
          <LayerGroup id='handwashingMalawi' ref={handwashingRefMalawi} ><HandwashingMalawi /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Madagascar" unchecked>
          <LayerGroup id='countriesMadagascar' ref={countryRefMadagascar} ><MadagascarCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Madagascar" unchecked>
          <LayerGroup id='povMadagascar' ref={povRefMadagascar} ><PovertyMadagascar /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Madagascar" unchecked>
        <LayerGroup id='hungerMadagascar' ref={hungerRefMadagascar} ><HungerMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Madagascar" unchecked>
        <LayerGroup id='travMadagascar' ref={travRefMadagascar} ><TraveltimeMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Madagascar" unchecked>
        <LayerGroup id='agMadagascar' ref={agpotRefMadagascar} ><AgPotentialMadagascar /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Madagascar" unchecked>
          <LayerGroup id='stuntingMadagascar' ref={stuntingRefMadagascar} ><StuntingMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Madagascar" unchecked>
          <LayerGroup id='wastingMadagascar' ref={wastingRefMadagascar} ><WastingMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Madagascar" unchecked>
          <LayerGroup id='u5mortMadagascar' ref={u5mortRefMadagascar} ><Under5MortMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Madagascar" unchecked>
          <LayerGroup id='conflictMadagascar' ref={conflictRefMadagascar} ><ConflictMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Madagascar" unchecked>
          <LayerGroup id='literacyMadagascar' ref={literacyRefMadagascar} ><LiteracyMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Madagascar" unchecked>
          <LayerGroup id='handwashingMadagascar' ref={handwashingRefMadagascar} ><HandwashingMadagascar /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Mozambique" unchecked>
          <LayerGroup id='countriesMozambique' ref={countryRefMozambique} ><MozambiqueCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Mozambique" unchecked>
          <LayerGroup id='povMozambique' ref={povRefMozambique} ><PovertyMozambique /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Mozambique" unchecked>
        <LayerGroup id='hungerMozambique' ref={hungerRefMozambique} ><HungerMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Mozambique" unchecked>
        <LayerGroup id='travMozambique' ref={travRefMozambique} ><TraveltimeMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Mozambique" unchecked>
        <LayerGroup id='agMozambique' ref={agpotRefMozambique} ><AgPotentialMozambique /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Mozambique" unchecked>
          <LayerGroup id='stuntingMozambique' ref={stuntingRefMozambique} ><StuntingMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Mozambique" unchecked>
          <LayerGroup id='wastingMozambique' ref={wastingRefMozambique} ><WastingMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Mozambique" unchecked>
          <LayerGroup id='u5mortMozambique' ref={u5mortRefMozambique} ><Under5MortMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Mozambique" unchecked>
          <LayerGroup id='conflictMozambique' ref={conflictRefMozambique} ><ConflictMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Mozambique" unchecked>
          <LayerGroup id='literacyMozambique' ref={literacyRefMozambique} ><LiteracyMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Mozambique" unchecked>
          <LayerGroup id='handwashingMozambique' ref={handwashingRefMozambique} ><HandwashingMozambique /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Rwanda" unchecked>
          <LayerGroup id='countriesRwanda' ref={countryRefRwanda} ><RwandaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Rwanda" unchecked>
          <LayerGroup id='povRwanda' ref={povRefRwanda} ><PovertyRwanda /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Rwanda" unchecked>
        <LayerGroup id='hungerRwanda' ref={hungerRefRwanda} ><HungerRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Rwanda" unchecked>
        <LayerGroup id='travRwanda' ref={travRefRwanda} ><TraveltimeRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Rwanda" unchecked>
        <LayerGroup id='agRwanda' ref={agpotRefRwanda} ><AgPotentialRwanda /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Rwanda" unchecked>
          <LayerGroup id='stuntingRwanda' ref={stuntingRefRwanda} ><StuntingRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Rwanda" unchecked>
          <LayerGroup id='wastingRwanda' ref={wastingRefRwanda} ><WastingRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Rwanda" unchecked>
          <LayerGroup id='u5mortRwanda' ref={u5mortRefRwanda} ><Under5MortRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Rwanda" unchecked>
          <LayerGroup id='conflictRwanda' ref={conflictRefRwanda} ><ConflictRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Rwanda" unchecked>
          <LayerGroup id='literacyRwanda' ref={literacyRefRwanda} ><LiteracyRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Rwanda" unchecked>
          <LayerGroup id='handwashingRwanda' ref={handwashingRefRwanda} ><HandwashingRwanda /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Tanzania" unchecked>
          <LayerGroup id='countriesTanzania' ref={countryRefTanzania} ><TanzaniaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Tanzania" unchecked>
          <LayerGroup id='povTanzania' ref={povRefTanzania} ><PovertyTanzania /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Tanzania" unchecked>
        <LayerGroup id='hungerTanzania' ref={hungerRefTanzania} ><HungerTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Tanzania" unchecked>
        <LayerGroup id='travTanzania' ref={travRefTanzania} ><TraveltimeTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Tanzania" unchecked>
        <LayerGroup id='agTanzania' ref={agpotRefTanzania} ><AgPotentialTanzania /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Tanzania" unchecked>
          <LayerGroup id='stuntingTanzania' ref={stuntingRefTanzania} ><StuntingTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Tanzania" unchecked>
          <LayerGroup id='wastingTanzania' ref={wastingRefTanzania} ><WastingTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Tanzania" unchecked>
          <LayerGroup id='u5mortTanzania' ref={u5mortRefTanzania} ><Under5MortTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Tanzania" unchecked>
          <LayerGroup id='conflictTanzania' ref={conflictRefTanzania} ><ConflictTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Tanzania" unchecked>
          <LayerGroup id='literacyTanzania' ref={literacyRefTanzania} ><LiteracyTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Tanzania" unchecked>
          <LayerGroup id='handwashingTanzania' ref={handwashingRefTanzania} ><HandwashingTanzania /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Countries - Base Zambia" unchecked>
          <LayerGroup id='countriesZambia' ref={countryRefZambia} ><ZambiaCountry /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Poverty Zambia" unchecked>
          <LayerGroup id='povZambia' ref={povRefZambia} ><PovertyZambia /></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Hunger Zambia" unchecked>
        <LayerGroup id='hungerZambia' ref={hungerRefZambia} ><HungerZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Avg. Travel Time to Nearest City Zambia" unchecked>
        <LayerGroup id='travZambia' ref={travRefZambia} ><TraveltimeZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Agricultural Potential Zambia" unchecked>
        <LayerGroup id='agZambia' ref={agpotRefZambia} ><AgPotentialZambia /></LayerGroup>
          </LayersControl.Overlay>
        <LayersControl.Overlay name="Stunting Summary Zambia" unchecked>
          <LayerGroup id='stuntingZambia' ref={stuntingRefZambia} ><StuntingZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wasting Summary Zambia" unchecked>
          <LayerGroup id='wastingZambia' ref={wastingRefZambia} ><WastingZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Under 5 Mortality Zambia" unchecked>
          <LayerGroup id='u5mortZambia' ref={u5mortRefZambia} ><Under5MortZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Conflict Events Zambia" unchecked>
          <LayerGroup id='conflictZambia' ref={conflictRefZambia} ><ConflictZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Women's Literacy Zambia" unchecked>
          <LayerGroup id='literacyZambia' ref={literacyRefZambia} ><LiteracyZambia /></LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Access to Basic Handwashing Station Zambia" unchecked>
          <LayerGroup id='handwashingZambia' ref={handwashingRefZambia} ><HandwashingZambia /></LayerGroup>
          </LayersControl.Overlay>
      </LayersControl>
      <PointsToFront/>
      <Search provider={new OpenStreetMapProvider({ })} />
    </MapContainer>
    <div id="report-div" style={{display:"none"}}><button id="close" class="button close" onClick={showReport}>x</button><div id="report-inner-div" ref={reportRef} ></div>
    <div id="report-inner-div-map1" ref={mapsRef}><SimpleMap1></SimpleMap1><SimpleMap2></SimpleMap2></div>
    <div id="reportSourcing"></div>
    <div id="get-PDF-report"><button class="button button20" onClick={showUpdatePDF} type="button">Create PDF Output</button><br></br><br></br></div>
    <div id="downloadPDF-report" style={{display:"none"}}>
   <PDFDownloadLink
  document={<MyDocument data={scenarioDetails}/>}
  fileName="movielist.pdf"
  style={{
    backgroundColor: "#363636",
    padding: "8px 12px",
    marginLeft: "5px",
    marginRight: "5px",
    color: "#4a4a4a",
    fontFamily: 'Gill Sans, Gill Sans MT',
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  {({ blob, url, loading, error }) =>
    loading ? "Loading document..." : "Download Pdf"
  }
</PDFDownloadLink></div></div> 
    <div id="tooltip2" ><text class="p1">Hover over any location to see details.</text></div>
    <div id="info-div" style={{display:"none"}}><button id="close" class="button close" onClick={addInfo}>x</button><text class="p1">{"\n"}{"\n "}</text></div> 
    <div id="bottom-desc" style={{zIndex: 19999, position: "absolute", bottom: 36, left: 1, width: "100%", textAlign: "center"}}>
      <div id= "scenario-div" style={{display:"none"}} >
    <button class="button button14"  onClick={scenario1} type="button">Create Scenario 1</button>   
    <button class="button button15"  onClick={scenario2} type="button">Create Scenario 2</button> 
    <button class="button button19"  onClick={AreaSelect} type="button">Add Admins by Hovering</button> 
    <button class="button button16"  onClick={resetHighlight} type="button">Clear Current Scenario</button> 
    <button class="button button17"  onClick={showReport} type="button">Run Analysis</button> 
      </div>
    <button class="button button10"  onClick={togglePov} type="button">Poverty</button>   
    <button class="button button3"  onClick={toggleHunger} type="button">Hunger</button> 
    <button class="button button4"  onClick={toggleStunting} type="button">Stunting</button> 
    <button class="button button5"  onClick={toggleWasting} type="button">Wasting</button> 
    <button class="button button6"  onClick={toggleU5Mort} type="button">Under 5 Mortality</button> 
    <button class="button button7"  onClick={toggleHandwashing} type="button">Access to Handwashing</button> 
    <button class="button button8"  onClick={toggleLiteracy} type="button">Women's Literacy</button> 
    <button class="button button9"  onClick={toggleConflict} type="button">Conflict Events</button> 
    <button class="button button11"  onClick={toggleAgpot} type="button">Agricultural Potential</button> 
    <button class="button button12"  onClick={toggleTrav} type="button">Avg. Travel Time to Cities</button> 
    <button class="button button18"  onClick={toggleLabels} type="button">Labels</button> </div>
    <div id="legend" style={{display:"none"}}><button id="close" class="button close" onClick={addLegend}>x</button><b>Legend</b><br></br><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #9B2226,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Poverty</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #3C4F76,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Hunger</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #005F73,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Stunting</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #0A9396,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Wasting</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #94D2BD,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Under 5 Mortality</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #b8a004,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Access to Basic Handwashing Station</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #EE9B00,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Women's Literacy</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #BB3E03,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Count of Conflict Events</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #354d36,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Agricultural Potential</span2><br></br>
    <i style={{backgroundImage: "linear-gradient(to left, #66507d,#FFFFFF)"}}></i><span2>&nbsp;&nbsp;Avg. Travel Time to Cities</span2><br></br>
    <i style={{background: "gray"}}></i><span2>&nbsp;&nbsp;No Data Available</span2><br></br>
    </div>
    </>
  );
  
};
export default LeafletMap;

