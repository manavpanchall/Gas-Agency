import React, { useState, useEffect } from "react";
import axios from "axios";
import Cylinder from "../components/Cylinder";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cylinders, setCylinders] = useState([]); // Initialize as an empty array
  const [originalCylinders, setOriginalCylinders] = useState([]);
  const [searchkey, setSearchkey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cylinders/getallcylinders`, {
          validateStatus: (status) => status < 500,
        });
        console.log("API Response:", data); // Log the API response

        // Ensure data is an array
        if (Array.isArray(data)) {
          setCylinders(data);
          setOriginalCylinders(data);
        } else {
          setCylinders([]); // Set to empty array if data is not an array
          setOriginalCylinders([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cylinders:', error.response ? error.response.data : error.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterBySearch() {
    if (searchkey.trim() === '') {
      setCylinders(originalCylinders);
    } else {
      const tempCylinders = originalCylinders.filter((cylinder) =>
        cylinder.name.toLowerCase().includes(searchkey.toLowerCase())
      );
      setCylinders(tempCylinders);
    }
  }

  function filterByType(selectedType) {
    setType(selectedType);
    if (selectedType !== 'all') {
      const tempCylinders = originalCylinders.filter(
        (cylinder) => cylinder.type.toLowerCase() === selectedType.toLowerCase()
      );
      setCylinders(tempCylinders);
    } else {
      setCylinders(originalCylinders);
    }
  }

  return (
    <div className="container">
      <div className='row mt-5 bs'>
        <div className='col md-5'>
          <input
            type="text"
            className="form-control"
            placeholder="Search cylinders"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-5'>
          <select className='form-control' value={type} onChange={(e) => filterByType(e.target.value)}>
            <option value="all">All</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error message="Failed to fetch cylinders" />
        ) : Array.isArray(cylinders) && cylinders.length > 0 ? (
          cylinders.map((cylinder) => (
            <div className="col-md-9 mt-3" key={cylinder._id}>
              <Cylinder cylinder={cylinder} />
            </div>
          ))
        ) : (
          <p>No cylinders found.</p>
        )}
      </div>
    </div>
  );
}

export default Homescreen;