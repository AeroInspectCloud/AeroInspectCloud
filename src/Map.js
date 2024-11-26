import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyb2luc3BlY3QiLCJhIjoiY20zZDI5ZW1rMjV2dzJqc2U2cHZ0Y2I5ciJ9.ocXZqAz8Uyz0nkPD6ILZ5A';

function Map({ customers, setOptimizedRoute }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // Map bereits initialisiert
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.0, 50.0],
            zoom: 5,
        });
    }, []);

    useEffect(() => {
        if (!map.current) return;

        // Marker für Kunden hinzufügen
        customers.forEach(customer => {
            new mapboxgl.Marker()
                .setLngLat([customer.longitude, customer.latitude])
                .setPopup(new mapboxgl.Popup().setText(customer.name))
                .addTo(map.current);
        });
    }, [customers]);

    const planRoute = async () => {
        // Beispiel: Routing mit festen Punkten
        const route = await fetchOptimizedRoute(customers);
        setOptimizedRoute(route);
    };

    return (
        <div>
            <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
            <button onClick={planRoute}>Route optimieren</button>
        </div>
    );
}

export default Map;
