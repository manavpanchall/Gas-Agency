import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CylindersScreen() {
    const [cylinders, setCylinders] = useState([]);

    useEffect(() => {
        async function fetchCylinders() {
            try {
                const result = await axios.get('/api/cylinders/getallcylinders');
                setCylinders(result.data);
            } catch (error) {
                console.log('Error fetching cylinders:', error);
            }
        }

        fetchCylinders();
    }, []);

    return (
        <div>
            <h2>Cylinders</h2>
            <ul>
                {cylinders.map(cylinder => (
                    <li key={cylinder._id}>{cylinder.name} - {cylinder.capacity}L - ${cylinder.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default CylindersScreen;