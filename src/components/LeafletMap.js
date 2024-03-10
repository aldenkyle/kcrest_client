import { React, useState, useEffect, useRef, cloneElement,forwardRef, useMemo, useCallback,   } from "react";
import { MapContainer, TileLayer, LayersControl, GeoJSON, Popup, CircleMarker,useMap,FeatureGroup, useMapEvent,LayerGroup,Tooltip,Rectangle } from "react-leaflet";
import { useEventHandlers } from '@react-leaflet/core'
import { BuildScenarioOne} from "./maputils";
//import "leaflet/dist/leaflet.css";
import L from 'leaflet';
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
  var ttdiv = document.getElementById('tooltip2')
  ttdiv.innerHTML = "<b>"+ adm0 + " | " + adm1+ " | " + adm2 + "</b><br>Est. Population 2022 (Landscan): <span style='color:black;font-weight:bold'>"+ popP + "</span><br>Prevalence of Poverty ($2.15/day, GSAP): <span style='color:#9B2226;font-weight:bold'>"+ povertyP + "%</span><br>Prevalence of Stunting (DHS): <span style='color:#005F73;font-weight:bold'>"+ stuntingP + "%</span><br> Hunger: <span style='color:#3C4F76;font-weight:bold'>"+ hungerP + "%</span><br>Prevalence of Wasting (DHS): <span style='color:#0A9396;font-weight:bold'>"+ wastingP + "%</span><br>Under 5 Mortality per 100,000 (DHS): <span style='color:#94D2BD;font-weight:bold'>"+ under5mortP + "</span><br> Count of Violence Events (ACLED): <span style='color:#BB3E03;font-weight:bold'>"+ conflictP + "</span><br>Access to Basic Handwashing (DHS): <span style='color:#b8a004;font-weight:bold'>"+ accesstoHWP + "%</span><br>Percent of Women Literate (DHS): <span style='color:#EE9B00;font-weight:bold'>"+ literacWP + "%</span><br>Avg. Minutes in Travel Time to a City: <span style='color:#66507d;font-weight:bold'>"+ travTimeP + "</span><br>Potential Agricultural Growth (FAO): <span style='color:#354d36;font-weight:bold'>"+ agPotP + "</span>"
}



function ToolTipControl({ position }) {
  const parentMap = useMap()

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
    <div id="tooltip2" ><text class="p1">Hover over any location to see details.</text></div> 
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
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
      weight: .3,
      opacity: .3,
      fillcolor: 'red',
      fillOpacity: 0,
      color: '#dcdee0',
      smoothFactor:.1
  };
}
 //set up a bunch of vars!
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


export function highlightFeature(e) {
  if (scenario == 1) {
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
    scen1_agPotentialEst = scen1_agPotentialEst - e.sourceTarget.feature.properties.agpotentia
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
  else {
  var layer = e.target;
  console.log(e)

  layer.setStyle({
      weight: 2,
      color: 'black',
      dashArray: '',
      fillOpacity: 0.8
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
  scen1_agPotentialEst = scen1_agPotentialEst + e.sourceTarget.feature.properties.agpotentia
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
}}
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
    scen2_agPotentialEst = scen2_agPotentialEst - e.sourceTarget.feature.properties.agpotentia
    scen2_avgTravTimeEst = 100*((((scen2_avgTravTimeEst/100) * scen2_pop_initial) - ((e.sourceTarget.feature.properties.timeperper/100) * e.sourceTarget.feature.properties.pop_ls_1))/(scen2_population+1))
    admincomb = e.sourceTarget.feature.properties.adm0_name +"|"+e.sourceTarget.feature.properties.adm1_name+"|"+e.sourceTarget.feature.properties.adm2_name
    scen2_Admins = scen2_Admins.replace(admincomb, "")
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
  }
  else {
  var layer = e.target;
  console.log(e)

  layer.setStyle({
      weight: 3,
      color: 'white',
      dashArray: '',
      fillOpacity:0.7
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
  scen2_agPotentialEst = scen2_agPotentialEst + e.sourceTarget.feature.properties.agpotentia
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
}}
}


function onEachFeature(feature, layer) {
  layer.on({
      click: highlightFeature,
      mouseover: addTooltip,
      mouseout: onMouseOut2
  });
}



const urlToQuery = () => {
  var cntry = document.getElementById('country').value;
  var urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/all";
  if (cntry == 'Ghana')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/ghana" }
  else if (cntry == 'Senegal')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/senegal" }
  else if (cntry == 'Liberia')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/liberia" }
  else if (cntry == 'Kenya')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/kenya" }
  else if (cntry == 'Rwanda')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda" }
  else if (cntry == 'Tanzania')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania" }
  else if (cntry == 'Mozambique')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique" }
  else if (cntry == 'Malawi')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/malawi" }
  else if (cntry == 'Madagascar')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar" }
  else if (cntry == 'Zambia')
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/zambia" }
  else
  {urlQ = "https://kcrest-server-38b9724c4a82.herokuapp.com/all" }
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
      const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/all");

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
      const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/all");

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
      const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/all");

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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/ghana");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/liberia");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/senegal");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/kenya");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/malawi");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/madagascar");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/mozambique");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/rwanda");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/tanzania");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
        try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
      const jsonData = await response.json();
      setData(jsonData[0].json_build_object);
    } catch (err) {console.error(err.message);}};
  useEffect(() => { getData();  }, []);
  if (data) {
    return  <GeoJSON data={data}  style={(feature) => {
      const wasting = feature.properties.wasting_1;
      // console.log(fcount)
        return {
          color: "#005F73",
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
      try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
    try {const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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
        const response = await fetch("https://kcrest-server-38b9724c4a82.herokuapp.com/zambia");
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

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const feelRef = useRef()
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
  const agpotRef = useRef();
  const [agpotState, setAgpotState] = useState(false);
  const [clickState, setClickState] = useState(false);
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
  
  const toggle=(clickState)=>{
      setClickState(!clickState)};

  const toggleInfo=()=>{
        setInfoState(!infoState)};


        
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
    ScenToFront()
    }
  
  function scenario2() {
    scenario = 2
    ScenToFront()
    //task: bring right layer to front!
  }



const showReport = () => {
    //open and close report
    console.log("Report was clicked")
    var x = document.getElementById("report-div");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
   //add stuff to report
   var y = document.getElementById("report-inner-div");
   y.innerHTML = ""
   if (scen1_idlist.length > 0 & scen2_idlist.length > 0) {
    y.innerHTML = y.innerHTML + "User has selected " + noAdminsSelected + " administrative units!" 
  }
    else if (scenario == 1) {
    y.innerHTML = "<br><u><b>Scenario 1 Details</u></b><br>This scenario selected " + scen1_idlist.length + " administrative unit(s) and has a population of approximately "+ numberWithCommas(scen1_population) +" people. The following table shows summary statistics for our ten indicators of interest across the selected areas.<br><br>" 
    var tablestuff = [['Prevalence of Poverty (GSAP)', scen1_povest.toFixed(1)],["Hunger", scen1_hungest.toFixed(1)],["Prevalence of Stunting", scen1_stuntest.toFixed(1)],["Prevalence of Wasting", scen1_wastest.toFixed(1)],["Under 5 Mortality", scen1_u5mortest.toFixed(1)],["Conflict Events", scen1_conflictEventsEst], ["Access to Basic Handwashing", scen1_accesstoHWest.toFixed(1)], ["Percent of Women Literate", scen1_womensLitest.toFixed(1)], ["Agricultural Potential", scen1_agPotentialEst], ["Avg. Travel Time to Nearest City", scen1_avgTravTimeEst.toFixed(1)]]
    var thtml = '<table>'
    for (var i = 0; i < tablestuff.length; i++) {
      thtml += '<tr><td>' + tablestuff[i][0] + '</td><td>' + tablestuff[i][1] + '</td></tr>';
    }
    thtml += '</table>'
    y.innerHTML += thtml
    y.innerHTML += "<br><u><b>Additional Details</u></b><br> The administrative unit(s) included in this scenario include: " + scen1_Admins.slice(2) + "."
    }
    else if (scenario == 2) {
      y.innerHTML = "<br><u><b>Scenario 2 Details</u></b><br>This scenario selected " + scen2_idlist.length + " administrative unit(s) and has a population of approximately "+ numberWithCommas(scen2_population) +" people. The following table shows summary statistics for our ten indicators of interest across the selected areas.<br><br>" 
      var tablestuff = [['Prevalence of Poverty (GSAP)', scen2_povest.toFixed(1)],["Hunger", scen2_hungest.toFixed(1)],["Prevalence of Stunting", scen2_stuntest.toFixed(1)],["Prevalence of Wasting", scen2_wastest.toFixed(1)],["Under 5 Mortality", scen2_u5mortest.toFixed(1)],["Conflict Events", scen2_conflictEventsEst], ["Access to Basic Handwashing", scen2_accesstoHWest.toFixed(1)], ["Percent of Women Literate", scen2_womensLitest.toFixed(1)], ["Agricultural Potential", scen2_agPotentialEst], ["Avg. Travel Time to Nearest City", scen2_avgTravTimeEst.toFixed(1)]]
      var thtml = '<table>'
      for (var i = 0; i < tablestuff.length; i++) {
        thtml += '<tr><td>' + tablestuff[i][0] + '</td><td>' + tablestuff[i][1] + '</td></tr>';
      }
      thtml += '</table>'
      y.innerHTML += thtml
      y.innerHTML += "<br><u><b>Additional Details</u></b><br> The administrative unit(s) included in this scenario include: " + scen2_Admins.slice(2) + "."
      }
      else if (scenario == 0) {
        y.innerHTML = "<br><u><b>No scenarios have been developed, click Create Scenario 1 to start building a targeting scenario</u></b>"
        }
    console.log(x)
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
    L.easyButton( "fa-map-marker", () => {
      addScenarioButtons()
    }).addTo(map);

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
    <div id="report-div" style={{display:"none"}}><button id="close" class="button close" onClick={showReport}>x</button><div id="report-inner-div"></div></div> 
    <div id="tooltip2" ><text class="p1">Hover over any location to see details.</text></div>
    <div id="info-div" style={{display:"none"}}><button id="close" class="button close" onClick={addInfo}>x</button><text class="p1">{"\n"}This tool allows international development practitioners to develop scenarios regarding where they will target international development programs. The tool will also allow users to visualize several key development indicators and summarize them across subsets of administrative areas in their countries of interest. Finally, it will allow users to save scenarios so that they can retrieve those scenarios and review them multiple times. The goal is to ensure that development practitioners have easy access to, and are using, high quality quantitative data as a determinant in their decision making about where to invest their limited resources.  If you have questions please reach out to Kyle Alden at kyle.alden@gmail.com{"\n "}</text></div> 
    <div id="bottom-desc" style={{zIndex: 19999, position: "absolute", bottom: 36, left: 1, width: "100%", textAlign: "center"}}>
      <div id= "scenario-div" style={{display:"none"}} >
    <button class="button button14"  onClick={scenario1} type="button">Create Scenario 1</button>   
    <button class="button button15"  onClick={scenario2} type="button">Create Scenario 2</button> 
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
    <i style={{background:"#gray"}}></i><span2>No Data Available</span2><br></br>
    </div>
    </>
  );
  
};
export default LeafletMap;

