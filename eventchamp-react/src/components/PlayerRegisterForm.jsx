import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { PlayerService } from '../services/PlayerService';

export const PlayerRegisterForm=()=> {
  const [formData, setFormData] = useState({
    gameType: '',
    firstName: '',
    secondPlayerName: '',
    age: '',
    contact: '',
    instaId: '',
    aadharNo: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    // Validate Aadhar number
    // const aadharPattern = /^\d{12}$/;
    const aadharPattern = /^\d{12}$/
    const aadharPattern2=/^\d{4}\s\d{4}\s\d{4}$/;
    if (!(aadharPattern.test(formData.aadharNo)|| aadharPattern2.test(formData.aadharNo))) {
      alert('Aadhar number must be a 12-digit numeric value.');
        return
    }
    PlayerService(formData)
  }

  return (
    <Container className="">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ backgroundColor: '#ffffff' }}>
            <h4 className="mb-4 text-center" style={{ color: '#333' }}>Game Registration Form</h4>

            <Form.Group controlId="gameType" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Game Type </Form.Label>
              <Form.Control 
                as="select" 
                name="gameType" 
                value={formData.gameType} 
                onChange={handleChange} 
                required
                style={{ color: '#555', borderColor: '#ddd' }}
              >
                <option value="">Select game type</option>
                <option value="Singles">Singles</option>
                <option value="Doubles">Doubles</option>
                {/* Add more game types as needed */}
              </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>First Name </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter first name" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="secondPlayerName" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Second Player Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter second player name" 
                name="secondPlayerName" 
                value={formData.secondPlayerName} 
                onChange={handleChange} 
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>

            <Form.Group controlId="age" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Age </Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter age" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                min={5}
                max={85}
                required
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>

            <Form.Group controlId="contact" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Contact </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter contact number" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange} 
                required
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>

            <Form.Group controlId="instaId" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Instagram ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Instagram ID" 
                name="instaId" 
                value={formData.instaId} 
                onChange={handleChange} 
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>

            <Form.Group controlId="aadharNo" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: '#555' }}>Aadhar Number </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Aadhar number" 
                name="aadharNo" 
                value={formData.aadharNo} 
                onChange={handleChange} 
                required
                style={{ color: '#555', borderColor: '#ddd' }}
              />
            </Form.Group>
            <br></br>

            <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#007bff', borderColor: '#007bff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}