import React, { useState, useEffect } from 'react';
import { Tabs, Tag } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    const items = [
        {
            key: "1",
            label: "My Profile",
            children: (
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs">
                            <h1>My Profile</h1>
                            <h1>Name: {user?.name}</h1>
                            <h1>Email: {user?.email}</h1>
                            <h1>isAdmin: {user?.isAdmin ? 'YES' : 'NO'}</h1>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "2",
            label: "My Bookings",
            children: <MyBookings user={user} />,
        },
    ];

    return (
        <div className="ml-3 mt-3">
            <Tabs items={items} />
        </div>
    );
}

export default Profilescreen;

export function MyBookings({ user }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings/getbookingsbyuserid`, { userid: user._id });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        if (user && user._id) {
            fetchBookings();
        }
    }, [user]);

    const cancelBooking = async (bookingId) => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings/cancelbooking`, { bookingId });

            if (response.data.success) {
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
                    )
                );
                Swal.fire('Success', 'Booking cancelled successfully', 'success');
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error.response ? error.response.data : error.message);
            Swal.fire('Error', 'Failed to cancel booking', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching bookings: {error.message}</div>;

    return (
        <div className='row'>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div className='col-md-6' key={booking._id}>
                        <div className='booking-card bs'>
                            <h1>{booking.cylinder}</h1>
                            <p><b>BookingId:</b> {booking._id}</p>
                            <p><b>Weight:</b> {booking.weight}</p>
                            <p><b>Body Weight:</b> {booking.bodyweight}</p>
                            <p><b>Total Amount:</b> {booking.totalAmount}</p>
                            <p><b>Total Cylinder:</b> {booking.totalcylinder}</p>
                            <p><b>Transaction Id:</b> {booking.transactionId}</p>
                            <p>
                                <b>Status:</b>{' '}
                                <Tag color={booking.status === 'cancelled' ? 'red' : 'green'}>
                                    {booking.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'}
                                </Tag>
                            </p>
                            {booking.status !== 'cancelled' && (
                                <button className='btn btn-primary' onClick={() => cancelBooking(booking._id)}>
                                    CANCEL BOOKING
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
}