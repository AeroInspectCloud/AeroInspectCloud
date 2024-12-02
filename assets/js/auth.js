const msalConfig = {
    auth: {
        clientId: "73aa213c-f324-456a-bb09-dc0b6e9faac0",
        authority: "https://login.microsoftonline.com/4a97cea8-8cc4-4d4c-8edc-3d59b870450f",
        redirectUri: "https://aeroinspectcloud.github.io"
    }
};

const loginRequest = {
    scopes: ["https://microsoft.sharepoint.com/Sites.Read.All"]
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

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
