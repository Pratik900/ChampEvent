import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Container, Form,Row,Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';



const PlayerSlotting=()=> {
    const navigate=useNavigate()
    const [show, setShow] = useState(true);
    const [formData,setFormData]=useState({gameType:'',from:'',to:''});
    const handleClose = () => navigate('/');
    const handleShow = () => setShow(true);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });}
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">Game Type</Form.Label>
          <Form.Control 
                as="select" 
                name="gameType" 
                value={'Singles'} 
                onChange={handleChange} 
                required
                // style={{ color: '#555', borderColor: '#ddd' }}
              >
                <option value="Singles">Singles</option>
                <option value="Doubles">Doubles</option>
                {/* Add more game types as needed */}
              </Form.Control>
        </Form.Group>
        <Form.Group>
            <Row>
                <Col>
            <Form.Label htmlFor='from'>From</Form.Label>
                </Col>
                <Col>
            <Form.Label htmlFor='to'>To</Form.Label>
                </Col>
            </Row>
            <Row>
                <Col>
            <Form.Control as='text' name='from' value="" required>

        <DatePicker className='border border-0 w-100' required/>
            </Form.Control>
                </Col>
                <Col>
            <Form.Control as='text' name='to' value ="" required>

        <DatePicker className='border border-0' required/>
            </Form.Control>
                </Col>
            </Row>
        </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export {PlayerSlotting}