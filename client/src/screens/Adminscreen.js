import React, { useState, useEffect } from 'react';
import { Result, Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';

function Adminscreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
            window.location.href = '/home';
        }
    }, []);
    const items = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings />,
        },
        {
            key: '2',
            label: 'Cylinders',
            children: <Cylinders />,
        },
        {
            key: '3',
            label: 'Add Cylinder',
            children: <Addcylinder />,
        },
        {
            key: '4',
            label: 'Users',
            children: <Users />,
        },
    ];

    return (
        <div className='ml-3 mt-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs items={items} />
        </div>
    );
}

export default Adminscreen;



// Bookings list component


export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const { data } = await axios.get('/api/bookings/getallbookings');
                console.log('Fetched bookings:', data);
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
        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && <Loader />}
                {error && <Error message={error.message} />}

                {!loading && !error && (
                    <table className='table table-bordered table-dark'>
                        <thead className='bs'>
                            <tr>
                                <th>Booking Id</th>
                                <th>User Id</th>
                                <th>Cylinder</th>
                                <th>Weight</th>
                                <th>Body Weight</th>
                                <th>Status</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        
                                        <td>{booking._id}</td>
                                        <td>{booking.userid}</td>
                                        <td>{booking.cylinderid}</td>
                                        <td>{booking.weight}</td>
                                        <td>{booking.bodyweight}</td>
                                        <td>{booking.status}</td>
                                        <td>{booking.totalAmount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="" className="text-center">No bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}




// Cylinders list component

export function Cylinders() {
    const [cylinders, setCylinders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCylinders() {
            try {
                const { data } = await axios.get('/api/cylinders/getallcylinders');
                console.log('Fetched cylinders:', data); // Log the data to inspect it
                setCylinders(data);
            } catch (error) {
                console.error('Error fetching cylinders:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCylinders();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Cylinders</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Cylinder Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cylinders.length > 0 ? (
                            cylinders.map((cylinder) => (
                                <tr key={cylinder._id}>
                                    <td>{cylinder._id}</td>
                                    <td>{cylinder.name}</td>
                                    <td>{cylinder.type}</td>
                                    <td>{cylinder.weight}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No cylinders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {error && <Error message="Failed to fetch cylinders" />}

            </div>
        </div>
    );
}




// Users list component

export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const { data } = await axios.get('/api/users/getallUsers');
                setusers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && <Loader />}
                {error && <Error message={error.message} />}
                {!loading && !error && (
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}


// Add Cylinder component



export function Addcylinder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [bodyweight, setBodyweight] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [phone, setPhone] = useState('');
    const [imageurl1, setImageurl1] = useState('');
    const [imageurl2, setImageurl2] = useState('');
    const [imageurl3, setImageurl3] = useState('');

    async function addCylinder() {

        if (isNaN(price) || isNaN(weight) || isNaN(bodyweight) || isNaN(phone)) {
            Swal.fire('Error', 'Please enter valid numbers for price, weight, body weight, and phone', 'error');
            return;
        }
        const newcylinder = {
            name,
            price,
            weight,
            bodyweight,
            description,
            type,
            phone,
            imageurls: [imageurl1, imageurl2, imageurl3]
        };
        console.log(newcylinder);
        try {
            setLoading(true);
            const result = await (await axios.post('/api/cylinders/addcylinder', newcylinder)).data
            console.log(result);
            setLoading(false)
            Swal.fire('Congrats', "Your New Cylinder Added Successfully", 'success').then(result => {
                window.location.href = '/home'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div className='row'>

            <div className='col-md-5'>
                {loading && <Loader />}
                <input
                    type='text'
                    className='form-control'
                    placeholder='Cylinder Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Cylinder Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Cylinder Weight'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Cylinder bodyweight'
                    value={bodyweight}
                    onChange={(e) => setBodyweight(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Cylinder Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className='col-md-5'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='type'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image url 1'
                    value={imageurl1}
                    onChange={(e) => setImageurl1(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image url 2'
                    value={imageurl2}
                    onChange={(e) => setImageurl2(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image url 3'
                    value={imageurl3}
                    onChange={(e) => setImageurl3(e.target.value)}
                />
                <div className='text-right'>
                    <button className='btn btn-primary mt-3' onClick={addCylinder}>Add Cylinder</button>
                </div>
            </div>
        </div>
    );
}







