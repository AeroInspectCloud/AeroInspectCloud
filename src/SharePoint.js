export async function fetchCustomersFromSharePoint() {
    const accessToken = '<YOUR_ACCESS_TOKEN>';
    const response = await fetch('https://graph.microsoft.com/v1.0/sites/<SITE_ID>/lists/<LIST_ID>/items', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    return data.value.map(item => ({
        id: item.id,
        name: item.fields.Title,
        address: item.fields.Address,
    }));
}

export async function saveRouteToSharePoint(route, date) {
    const accessToken = '<YOUR_ACCESS_TOKEN>';
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
