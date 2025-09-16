// PlotlyBarScatter
import Plot from 'react-plotly.js';
import './PlotlyBarScatter.css';

import { supabase } from './supabaseClient';

// src/components/Grafico.jsx
import { useEffect, useState } from 'react';


const BarScatter = () => {

    const [geoData, setGeoData] = useState(null);



useEffect(() => {
  const fetchGeoData = async () => {
    const { data, error } = await supabase
      .from('geojson_eventos')
      .select('*');

    if (error) {
      console.error('Error al cargar GeoJSON:', error);
      return;
    }

    const geoJsonData = {
      type: 'FeatureCollection',
      features: data[0]?.geojson?.features || [],
    };

    setGeoData(geoJsonData);
  };

  fetchGeoData();
}, []);


    if (!geoData) return <div>Cargando datos...</div>;

    const valores = geoData.features.map((f) => f.properties.magnitud); // Ajusta según tus atributos

    return (
        <div className='PlotlyBarScatter'>
            <Plot
                data={[
                    {
                        x: valores,
                        y: valores,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    {
                        type: 'bar',
                        x: valores,
                        y: valores,
                    },
                ]}
                layout={{
                    title: 'Gráfico combinado',
                    autosize: true,
                    margin: { t: 40, l: 40, r: 20, b: 40 },
                }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler={true}
                config={{ responsive: true }}
            />
        </div>
    );
};

export default BarScatter;