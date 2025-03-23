import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

function AddCylinder() {
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

        const newCylinder = {
            name,
            price,
            weight,
            bodyweight,
            description,
            type,
            phone,
            imageurls: [imageurl1, imageurl2, imageurl3],
        };

        try {
            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/cylinders/addcylinder`, newCylinder);
            setLoading(false);
            Swal.fire('Congrats', 'New Cylinder Added Successfully', 'success').then(() => {
                window.location.href = '/admin/dashboard';
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire('Oops', 'Something went wrong', 'error');
        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                {loading && <Loader />}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Body Weight"
                    value={bodyweight}
                    onChange={(e) => setBodyweight(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cylinder Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 1"
                    value={imageurl1}
                    onChange={(e) => setImageurl1(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 2"
                    value={imageurl2}
                    onChange={(e) => setImageurl2(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL 3"
                    value={imageurl3}
                    onChange={(e) => setImageurl3(e.target.value)}
                />
                <div className="text-right">
                    <button className="btn btn-primary mt-3" onClick={addCylinder}>
                        Add Cylinder
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCylinder;