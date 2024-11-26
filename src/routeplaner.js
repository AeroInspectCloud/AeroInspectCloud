import React, { useState } from 'react';

function RoutePlanner({ route, onSaveRoute }) {
    const [date, setDate] = useState('');

    const handleSave = () => {
        if (!route) {
            alert('Keine Route zum Speichern!');
            return;
        }
        if (!date) {
            alert('Bitte ein Datum auswählen!');
            return;
        }
        onSaveRoute(route, date);
    };

    return (
        <div>
            <h2>Route planen</h2>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <button onClick={handleSave}>Route speichern</button>
        </div>
    );
}

export default RoutePlanner;
