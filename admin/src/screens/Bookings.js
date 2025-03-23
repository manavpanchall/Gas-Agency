import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const { data } = await axios.get('/api/bookings/getallbookings');
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && <Loader />}
                {error && <Error message="Failed to fetch bookings" />}
                {!loading && !error && (
                    <table className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Cylinder</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.cylinder}</td>
                                    <td>{booking.totalAmount}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Bookings;