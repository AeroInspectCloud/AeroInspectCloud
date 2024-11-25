const userListEndpoint = "https://aeroinspect.sharepoint.com/sites/AeroInspectCloud/_api/web/lists/getbytitle('Benutzerverwaltung')/items";

// Benutzer erstellen
const createUser = async (username, password) => {
    const customerListName = `CustomerList_${username}`;
    const routeListName = `RouteList_${username}`;

    // Kunden- und Routenlisten erstellen
    await createSharePointList(customerListName);
    await createSharePointList(routeListName);

    // Benutzer in der Benutzerliste speichern
    const response = await fetch(userListEndpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json;odata=verbose",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Title: username,
            Passwort: password,
            Kundenliste: customerListName,
            Routenliste: routeListName,
        }),
    });

    if (!response.ok) {
        throw new Error("Fehler beim Erstellen des Benutzers");
    }

    alert(`Benutzer ${username} erfolgreich erstellt!`);
};

// SharePoint-Liste erstellen
const createSharePointList = async (listName) => {
    const createListEndpoint = "https://<your-tenant>.sharepoint.com/sites/<site-name>/_api/web/lists";

    const response = await fetch(createListEndpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json;odata=verbose",
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            __metadata: { type: "SP.List" },
            Title: listName,
            BaseTemplate: 100, // Generische Liste
        }),
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Erstellen der Liste ${listName}`);
    }
};
