// src/hooks/useGeoJson.js
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Ajusta la ruta según dónde esté supabaseClient.js ../supabaseClient';

export const useGeoJson = () => {
    const [geoData, setGeoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGeoData = async () => {
            const { data, error } = await supabase
                .from('geojson_eventos')
                .select('*');

            if (error) {
                console.error('Error al cargar GeoJSON:', error);
                setError(error);
                setLoading(false);
                return;
            }

            const geoJsonData = {
                type: 'FeatureCollection',
                features: data[0]?.geojson?.features || [],
            };

            setGeoData(geoJsonData);
            setLoading(false);
        };

        fetchGeoData();
    }, []);

    return { geoData, loading, error };
};

