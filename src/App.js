import React from 'react';
import './styles.css';
import Map from './Map';
import { fetchCustomersFromSharePoint, saveRouteToSharePoint } from './SharePointAPI';
import RoutePlanner from './RoutePlanner';

function App() {
    const [customers, setCustomers] = React.useState([]);
    const [optimizedRoute, setOptimizedRoute] = React.useState(null);

    React.useEffect(() => {
        async function loadCustomers() {
            const data = await fetchCustomersFromSharePoint();
            setCustomers(data);
        }
        loadCustomers();
    }, []);

    const handleRouteSave = async (route, date) => {
        const success = await saveRouteToSharePoint(route, date);
        if (success) {
            alert('Route erfolgreich gespeichert!');
        } else {
            alert('Fehler beim Speichern der Route.');
        }
    };

    return (
        <div>
            <h1>Routenplaner</h1>
            <Map customers={customers} setOptimizedRoute={setOptimizedRoute} />
            <RoutePlanner
                route={optimizedRoute}
                onSaveRoute={handleRouteSave}
            />
        </div>
    );
}

export default App;
