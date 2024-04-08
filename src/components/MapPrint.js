// MapPrint.js
import L from 'leaflet';
import 'leaflet-easyprint';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


export function MapPrint(props) {
  const map = useMap();
  useEffect(() => {
    const control = L.easyPrint({
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'myMap',
        exportOnly: true,
    });
    map.addControl(control)
    return () => {
      map.removeControl(control);
    }
  }, [map]);


  return null;
}
