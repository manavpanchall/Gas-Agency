import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cylinder({ cylinder }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row-bs bs'>
      <div className="col-md-4">
        <img src={cylinder.imageurls[0]} className='smallimg' alt={cylinder.name} />
      </div>
      <div className="col-md-8">
        <h1>{cylinder.name}</h1>
        <b>
          <p>Price : {cylinder.price}</p>
          <p>Weight : {cylinder.weight}</p>
          <p>Bodyweight : {cylinder.bodyweight}</p>
          <p>Type : {cylinder.type}</p>
        </b>

        <div style={{ float: 'right' }}>
          <Link to={`/book/${cylinder._id}`}>
            <Button className='btn btn-primary m-2'>Book Now</Button>
          </Link>
          <button className="btn btn-primary" onClick={handleShow}>View details</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Header>
          <Modal.Title>{cylinder.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {cylinder.imageurls.map(url => (
              <Carousel.Item key={url}>
                <img className="d-block w-100" src={url} alt="Cylinder image" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{cylinder.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cylinder;