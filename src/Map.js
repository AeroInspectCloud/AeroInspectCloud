import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = '<YOUR_MAPBOX_ACCESS_TOKEN>';

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
