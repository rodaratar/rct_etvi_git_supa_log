// PlotlyBarScatter
import Plot from 'react-plotly.js';
import './PlotlyBarScatter.css';

// src/components/Grafico.jsx
import { useEffect, useState } from 'react';

import { useGeoJson } from './useGeoJson'; // Ruta del hook ../hooks/useGeoJson';


const BarScatter = () => {

    const { geoData, loading, error } = useGeoJson();

  if (loading) return <div>Cargando datos del gráfico...</div>;
  if (error) return <div>Error al cargar datos: {error.message}</div>;
  if (!geoData || geoData.features.length === 0) return <div>Sin datos</div>;


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