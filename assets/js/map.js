mapboxgl.accessToken = 'pk.eyJ1IjoiYWVyb2luc3BlY3QiLCJhIjoiY20zZDI5ZW1rMjV2dzJqc2U2cHZ0Y2I5ciJ9.ocXZqAz8Uyz0nkPD6ILZ5A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [10.0, 50.0],
    zoom: 5
});

let markers = [];
let selectedMarkers = [];
