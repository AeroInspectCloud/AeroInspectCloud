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
        alert("Authentifizierung fehlgeschlagen. Weiterleitung zur Anmeldung...");
        authenticate(); // Auth erneut starten
    }
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

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Benutzerliste");
        }

        const data = await response.json();
        const user = data.d.results.find(
            item => item.Title === username && item.Passwort === password
        );

        if (!user) {
            alert("Ungültiger Benutzername oder Passwort.");
            return null;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    } catch (error) {
        console.error("Fehler bei der Authentifizierung:", error.message);
        alert("Fehler beim Login. Bitte versuche es erneut.");
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
                alert("Anmeldung erfolgreich!");
                window.location.href = "customers.html"; // Weiterleitung zur Hauptseite
            }
        });
    }
});