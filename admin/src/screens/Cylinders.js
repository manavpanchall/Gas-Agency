import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Cylinders() {
    const [cylinders, setCylinders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCylinders() {
            try {
                const { data } = await axios.get('/api/cylinders/getallcylinders');
                setCylinders(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCylinders();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Cylinders</h1>
                {loading && <Loader />}
                {error && <Error message="Failed to fetch cylinders" />}
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>Cylinder Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cylinders.map((cylinder) => (
                            <tr key={cylinder._id}>
                                <td>{cylinder._id}</td>
                                <td>{cylinder.name}</td>
                                <td>{cylinder.type}</td>
                                <td>{cylinder.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Cylinders; // Ensure this is exported as default