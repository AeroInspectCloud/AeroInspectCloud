import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = '<pk.eyJ1IjoiYWVyb2luc3BlY3QiLCJhIjoiY20zZDI5ZW1rMjV2dzJqc2U2cHZ0Y2I5ciJ9.ocXZqAz8Uyz0nkPD6ILZ5A>';

function Map() {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [10.0, 50.0],
                zoom: 5,
            });
            setMap(mapInstance);
        };

        if (!map) initializeMap();
    }, [map]);

    return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

export default Map;
