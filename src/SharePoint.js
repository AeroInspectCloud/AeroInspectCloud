export async function fetchCustomersFromSharePoint() {
    const accessToken = await getAccessToken();
    const response = await fetch('https://graph.microsoft.com/v1.0/sites/<SITE_ID>/lists/<LIST_ID>/items', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.value.map(item => ({
        id: item.id,
        name: item.fields.Title,
        latitude: item.fields.Latitude,
        longitude: item.fields.Longitude,
    }));
}

export async function saveRouteToSharePoint(route, date) {
    const accessToken = await getAccessToken();
    const response = await fetch('https://graph.microsoft.com/v1.0/sites/<SITE_ID>/lists/<LIST_ID>/items', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: {
                Title: `Route on ${date}`,
                RouteData: JSON.stringify(route),
                Date: date,
            },
        }),
    });
    return response.ok;
}

async function getAccessToken() {
    const response = await fetch('https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: '<CLIENT_ID>',
            client_secret: '<CLIENT_SECRET>',
            scope: 'https://graph.microsoft.com/.default',
            grant_type: 'client_credentials',
        }),
    });
    const data = await response.json();
    return data.access_token;
}
