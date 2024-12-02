async function optimizeRoute() {
    if (selectedMarkers.length < 2) {
        console.error('Mindestens zwei Marker sind erforderlich, um eine Route zu optimieren.');
        return;
    }

    const coordinates = selectedMarkers.map(marker => marker.getLngLat());
    const coordsString = coordinates.map(coord => `${coord.lng},${coord.lat}`).join(";");

    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordsString}?source=first&destination=last&roundtrip=false&geometries=geojson&access_token=${mapboxgl.accessToken}`;
    console.log('API-Aufruf:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.trips || data.trips.length === 0) {
            console.error('Keine gültige Route erhalten:', data);
            alert('Routing fehlgeschlagen. Prüfen Sie die Koordinaten.');
            return;
        }

        const optimizedRouteData = data.trips[0];
        console.log('Optimierte Route:', optimizedRouteData);

        if (!optimizedRouteData.geometry || optimizedRouteData.geometry.coordinates.length === 0) {
            console.error('Ungültige Geometriedaten:', optimizedRouteData.geometry);
            return;
        }

        const routeGeoJSON = {
            type: "Feature",
            geometry: optimizedRouteData.geometry
        };

        if (map.getSource("route")) {
            map.getSource("route").setData(routeGeoJSON);
        } else {
            map.addSource("route", {
                type: "geojson",
                data: routeGeoJSON
            });
            map.addLayer({
                id: "route",
                type: "line",
                source: "route",
                paint: {
                    "line-color": "#0078d4",
                    "line-width": 5
                }
            });
        }
    } catch (error) {
        console.error('Fehler bei der Routenoptimierung:', error);
        alert('Fehler bei der Routenoptimierung. Prüfen Sie die Konsole.');
    }
}
