const tenantId = "4a97cea8-8cc4-4d4c-8edc-3d59b870450f"; // Dein Tenant ID
const clientId = "73aa213c-f324-456a-bb09-dc0b6e9faac0"; // Deine Client-ID
const redirectUri = "https://aeroinspectcloud.github.io/AeroInspectCloud/"; // URI für Redirect nach Auth
const scope = "https://aeroinspect.sharepoint.com/.default"; // Standard-SharePoint-Scope

let accessToken = "";

// Authentifizierung starten
const authenticate = async () => {
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize` +
        `?client_id=${clientId}` +
        `&response_type=token` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl; // Weiterleitung zur Auth-Seite
};

// Access Token abrufen
const extractTokenFromUrl = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    accessToken = params.get("access_token");

    if (!accessToken) {
        showPopup("Fehler", "Authentifizierung fehlgeschlagen. Weiterleitung zur Anmeldung...");
        authenticate(); // Auth erneut starten
    } else {
        console.log("Access Token erfolgreich extrahiert:", accessToken);
    }
};

// Funktion zum Anzeigen des Popups
const showPopup = (title, message) => {
    const existingPopup = document.getElementById("popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.borderRadius = "8px";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";
    popup.style.width = "300px";

    popup.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
        <button id="close-popup" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">OK</button>
    `;

    document.body.appendChild(popup);

    const closeButton = document.getElementById("close-popup");
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });
};

// Benutzer authentifizieren
const authenticateUser = async (username, password) => {
    const userListEndpoint = "https://aeroinspect.sharepoint.com/_api/web/lists/getbytitle('Benutzerverwaltung')/items";

    try {
        const response = await fetch(userListEndpoint, {
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        console.log("HTTP-Statuscode:", response.status); // Statuscode der Anfrage

        if (response.status === 401) {
            showPopup("Fehler", "Nicht autorisiert. Überprüfen Sie Ihre Berechtigungen.");
            return null;
        }

        if (!response.ok) {
            throw new Error(`Fehler beim Abrufen der Benutzerliste (Statuscode: ${response.status})`);
        }

        const data = await response.json();
        console.log("Erhaltene Daten:", data); // Debug-Ausgabe der Daten

        const user = data.d.results.find(
            item => item.Title === username && item.Passwort === password
        );

        if (!user) {
            showPopup("Fehler", "Ungültiger Benutzername oder Passwort.");
            return null;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    } catch (error) {
        console.error("Fehler bei der Authentifizierung:", error.message);
        showPopup("Fehler", `Fehler beim Login. Details: ${error.message}`);
        return null;
    }
};

// Event-Listener für Login-Formular
document.addEventListener("DOMContentLoaded", () => {
    extractTokenFromUrl();

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = await authenticateUser(username, password);
            if (user) {
                showPopup("Erfolg", "Anmeldung erfolgreich!");
                setTimeout(() => {
                    window.location.href = "customers.html"; // Weiterleitung zur Hauptseite
                }, 2000);
            }
        });
    }
});
