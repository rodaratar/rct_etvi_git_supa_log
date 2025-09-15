// MapView
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import './MapView.css';

import L from 'leaflet';

import { useAuth } from './AuthContext';

// src/components/Mapa.jsx
import { useEffect, useState } from 'react';

const MapView = () => {

  const { user } = useAuth();

  if (!user) return <p>Cargando mapa...</p>;

  // Crear ícono personalizado
  const customIcon = L.icon({
    iconUrl: import.meta.env.BASE_URL + 'icons/l3.png', // Ruta desde la carpeta public
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  // Función que agrega un popup a cada feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.magnitud) {
      layer.bindPopup(`<b>${feature.properties.magnitud}</b>`);
    }
  };

  const [geoData, setGeoData] = useState(null);

   useEffect(() => {
    //fetch('/geojson/IGP_1.geojson')
  fetch('https://ygdoofsevlrtfrgshifj.supabase.co/rest/v1/geojson_eventos', {
    headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZG9vZnNldmxydGZyZ3NoaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzAwMDIsImV4cCI6MjA3MTc0NjAwMn0.l7pWMPejmO_yRAdg-mMMBezBNQABU0Zwk4P6d9iivvA',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZG9vZnNldmxydGZyZ3NoaWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzAwMDIsImV4cCI6MjA3MTc0NjAwMn0.l7pWMPejmO_yRAdg-mMMBezBNQABU0Zwk4P6d9iivvA',
    'Content-Type': 'application/json',
  }
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log('GeoJSON recibido:', data);

      // Asegúrate que accedes correctamente al objeto geojson
      const geoJsonData = {
        type: 'FeatureCollection',
        features: data[0]?.geojson?.features || [],
      };

      setGeoData(geoJsonData);
    })
    .catch((error) => console.error('Error al cargar GeoJSON:', error));
}, []);


  return (
    <div className='leaflet-container'>
      <MapContainer zoom={13} center={[-10.61, -75.02]}>

        <LayersControl position="topright">
          <LayersControl.Overlay name="Calles">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Geojson">
  {geoData && geoData.features.length > 0 && (
    <GeoJSON
      data={geoData}
      pointToLayer={(feature, latlng) => {
        return L.marker(latlng, { icon: customIcon });
      }}
      onEachFeature={onEachFeature}
    />
  )}
</LayersControl.Overlay>


          <LayersControl.Overlay name="Marker with popup">
            <Circle
              center={[-10.61, -75.02]}
              pathOptions={{ color: 'orange', fillColor: 'orange' }}
              radius={1000}
            >
              <Popup>
                <b>Este es un círculo</b><br />
                Coordenadas: [-10.61, -75.02]<br />
                Radio: 1km
              </Popup>
            </Circle>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="UnPunto">
            <Circle
              center={[-10.74, -75.99]}
              pathOptions={{ color: 'black', fillColor: 'black' }}
              radius={10000}
            />
          </LayersControl.Overlay>


          <LayersControl.Overlay name="VariosPuntos">
            <LayerGroup>
              <Circle
                center={[-10.88, -75.93]}
                pathOptions={{ fillColor: 'blue' }}
                radius={1000}
              />
              <Circle
                center={[-10.73, -75.89]}
                pathOptions={{ fillColor: 'red' }}
                radius={10000}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[-10.77, -75.23]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={1000}
                />
              </LayerGroup>
            </LayerGroup>


          </LayersControl.Overlay>

        </LayersControl>

      </MapContainer>
    </div>
  )
}

export default MapView;