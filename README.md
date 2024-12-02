# AERO INSPECT - Routenplanung

Dieses Projekt ermöglicht die Planung optimierter Routen basierend auf SharePoint-Daten. 

## Verzeichnisstruktur

```
project-root/
├── index.html           # Haupt-HTML-Datei
├── assets/              # Verzeichnis für statische Ressourcen
│   ├── css/             # CSS-Dateien
│   │   └── styles.css   # Stile für das Projekt
│   ├── js/              # JavaScript-Dateien
│   │   ├── map.js       # Mapbox-Logik
│   │   ├── auth.js      # MSAL-Authentifizierung
│   │   └── routes.js    # Routenoptimierung und Datenhandling
│   └── images/          # Optionale Bilder oder Icons
├── README.md            # Projektbeschreibung
└── .gitignore           # Dateien oder Verzeichnisse, die Git ignorieren soll
```

## Voraussetzungen

- [Mapbox Access Token](https://www.mapbox.com/)
- [Microsoft MSAL](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)

## Installation

1. Klonen Sie dieses Repository.
2. Öffnen Sie die `index.html` im Browser.
3. Führen Sie die Schritte für MSAL-Login aus.
