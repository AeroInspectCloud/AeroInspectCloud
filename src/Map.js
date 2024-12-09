import React, { useState } from 'react';
import Map from './Map';
import { getOptimizedRoute } from './api';
import './index.css';

const App = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  const handleOptimizeRoute = async () => {
    const route = await getOptimizedRoute(waypoints);
    setOptimizedRoute(route);
  };

  return (
    <div>
      <button onClick={handleOptimizeRoute} className="optimize-button">
        Route optimieren
      </button>
      <Map waypoints={waypoints} setWaypoints={setWaypoints} />
      {optimizedRoute.length > 0 && (
        <div>
          <h3>Optimierte Route:</h3>
          <pre>{JSON.stringify(optimizedRoute, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
