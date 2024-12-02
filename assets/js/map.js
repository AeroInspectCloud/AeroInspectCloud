mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyb2luc3BlY3QiLCJhIjoiY20zZDI5ZW1rMjV2dzJqc2U2cHZ0Y2I5ciJ9.ocXZqAz8Uyz0nkPD6ILZ5A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [10.0, 50.0],
    zoom: 5
});

let markers = [];
        let selectedMarkers = [];
        let optimizedRouteData = null;

        // Login
        document.getElementById("login-button").addEventListener("click", async () => {
            try {
                const account = msalInstance.getAllAccounts()[0];
                if (!account) {
                    await msalInstance.loginPopup(loginRequest);
                }
                document.getElementById("fetch-data-button").disabled = false;
                alert("Erfolgreich angemeldet!");
            } catch (error) {
                console.error("Login-Fehler:", error);
                alert("Login fehlgeschlagen.");
            }
        });

        // SharePoint-Daten laden
        document.getElementById("fetch-data-button").addEventListener("click", async () => {
            try {
                const account = msalInstance.getAllAccounts()[0];
                const tokenResponse = await msalInstance.acquireTokenSilent({
                    ...loginRequest,
                    account
                });
                const response = await fetch(listEndpoint, {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                        Accept: "application/json;odata=verbose"
                    }
                });
                if (!response.ok) throw new Error("Fehler beim Laden der Daten");

                const data = await response.json();
                const customers = data.d.results;

                customers.forEach(customer => {
    const lng = parseFloat(customer.L_x00e4_ngengrad.replace(',', '.'));
    const lat = parseFloat(customer.Breitengrad.replace(',', '.'));

    if (isNaN(lng) || isNaN(lat)) {
        console.warn(`Ungültige Koordinaten: ${customer.Kundenname}, Lng=${lng}, Lat=${lat}`);
        return;
    }

    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundColor = "red";

    const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${customer.Kundenname}</strong>`))
        .addTo(map);

    console.log(`Marker hinzugefügt für ${customer.Kundenname}: Lng=${lng}, Lat=${lat}`);

    marker.getElement().addEventListener('click', () => {
        if (!selectedMarkers.includes(marker)) {
            selectedMarkers.push(marker);
            marker.getElement().style.backgroundColor = "green";
        } else {
            selectedMarkers = selectedMarkers.filter(m => m !== marker);
            marker.getElement().style.backgroundColor = "red";
        }
        optimizeRoute();
    });

    markers.push(marker);
});


                document.getElementById("route-details-button").disabled = false;
                alert("Daten erfolgreich geladen!");
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        });
