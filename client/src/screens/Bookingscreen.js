import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

function Bookingscreen() {
  const { cylinderid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cylinder, setCylinder] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  // Fetch cylinder data
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/cylinders/getcylinderbyid`, {
          cylinderid: cylinderid,
        });
        if (isMounted) {
          setCylinder(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching cylinder:', error.response ? error.response.data : error.message);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  }, [cylinderid]); // Only depend on cylinderid

  // Handle payment
  const handlePayment = async () => {
    if (!cylinder) {
      Swal.fire('Error', 'Cylinder data is not available', 'error');
      return;
    }

    const totalAmount = quantity * cylinder.price;

    try {
      const order = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-order`, {
        amount: totalAmount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'Gas Agency System',
        description: 'Cylinder Booking',
        order_id: order.data.id,
        handler: function (response) {
          bookCylinder(response.razorpay_payment_id);
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Payment Failed', 'error');
    }
  };

  // Book cylinder after payment
  const bookCylinder = async (paymentId) => {
    const bookingDetails = {
      cylinder,
      userid: currentUser._id,
      totalAmount: quantity * cylinder.price,
      totalcylinder: quantity,
      weight: cylinder.weight,
      bodyweight: cylinder.bodyweight,
      transactionId: paymentId,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings/bookcylinder`, bookingDetails);
      Swal.fire('Success', 'Booking confirmed!', 'success').then(() => {
        navigate('/profile'); // Redirect to profile after successful booking
      });
    } catch (error) {
      console.error('Error booking cylinder:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'Booking Failed', 'error');
    }
  };

  // Handle quantity increment/decrement
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Render loading, error, or booking page
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to fetch cylinder details" />;
  }

  if (!cylinder) {
    return <div>No cylinder data available</div>;
  }

  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5 bs">
        <div className="col-md-5">
          <h1>{cylinder.name}</h1>
          <img src={cylinder.imageurls[0]} className="bigimg" alt="Cylinder" />
        </div>

        <div className="col-md-5">
          <div style={{ textAlign: 'right' }}>
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name: {currentUser.name}</p>
              <p>Weight: {cylinder.weight}</p>
              <p>Bodyweight: {cylinder.bodyweight}</p>
              <p>Price: {cylinder.price}</p>
            </b>
          </div>

          <div style={{ textAlign: 'right' }}>
            <b>
              <h1>Payment Details</h1>
              <hr />
              <p>Total Cylinder:</p>
              <div className="input-group mb-3" style={{ maxWidth: '200px', margin: '0 auto' }}>
                <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement}>
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={quantity}
                  readOnly
                  id="quantity"
                  name="quantity"
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>
                  +
                </button>
              </div>
              <p>Total Amount: {quantity * cylinder.price}</p>
            </b>
          </div>

          <div style={{ float: 'right' }}>
            <button className="btn btn-primary" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingscreen;