import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState ,forwardRef} from 'react';
import {  Form,Row,Col, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';
import {  FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { Loading } from './Loading';



const PlayerSlotting=()=> {
    const navigate=useNavigate()
    const [show, setShow] = useState(true);
    const [enableSubmit,setEnableSubmit] = useState(false)
    const [formData,setFormData]=useState({gameType:'Singles',from:new Date(),to:new Date(),players:{}});
    const handleClose = () => navigate('/');
    const[loading,setLoading]=useState(false)
    const [progress,setProgress] = useState(0)
    // const handleShow = () => setShow(true);
    const handleSubmit=async (e)=>{
        setLoading(true);
        e.preventDefault();
        // console.log(`http://localhost:4900/playerslotting/${formData.gameType}/${formData.from}/${formData.to}`)
        const finalFromDate=new Date(formData.from)
        finalFromDate.setHours(0,0,0)
        const finalToDate=new Date(formData.to)
        finalToDate.setHours(23,59,59)
        console.log(`http://localhost:4900/playerslotting/${formData.gameType}/${finalFromDate}/${finalToDate}`)
        axios.get(`http://localhost:4900/playerslotting/${formData.gameType}/${finalFromDate}/${finalToDate}`).then(response=>{
            // console.log(response.data)
            setFormData({...formData,'players':response.data.player})
            setShow(false)
        }).catch(err=>{
            // console.log(err.response.status)
            if (err.response.status===404) 
                alert(err.response.data.message)})
    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData)
    }
    const handleFromDateChange=(date)=>{
        setFormData({...formData,'from':new Date(date)})
    }
    const handleToDateChange=(date)=>{
        setFormData({...formData,'to':new Date(date)})
    }
    useEffect(()=>{
        // perform date validation on both datepickers
        const fromdate=new Date(formData.from);
        const todate=new Date(formData.to);
        if(fromdate<=todate){
            setEnableSubmit(true)
            setProgress(10)
        }
        else{
            setEnableSubmit(false)
        }
    },[formData.from, formData.to])
    useEffect(()=>{
        console.log('generateSlottings')
        // while(progress!==100)
        setLoading(false)
    },[formData.players,progress])
    const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
        <InputGroup>
          <Form.Control
            type="text"
            value={value}  // Displays the selected date
            onClick={onClick}  // Opens datepicker on click
            readOnly  // Prevents manual input; only through datepicker
            ref={ref}
            placeholder="Select a date"  // Placeholder for the input
            required
          />
          <InputGroup.Text onClick={onClick} style={{ cursor: 'pointer' }}>
            <FaCalendarAlt />  {/* Calendar Icon */}
          </InputGroup.Text>
        </InputGroup>
      ));
  
    return (
      <>{show?<>
      <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Players Slotting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">Game Type</Form.Label>
          <Form.Control 
                as="select" 
                name="gameType" 
                value={formData.gameType} 
                onChange={handleChange} 
                autoFocus
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
        <DatePicker name="from" selected={formData.from}  dateFormat="dd-MM-YYYY" className='border border-1 border-rounded w-100'  onChange={(date)=>handleFromDateChange(date)} customInput={<CustomDateInput />} required/>
                </Col>
                <Col>
        <DatePicker name="to" selected={formData.to}  dateFormat="dd-MM-YYYY" className='border border-1 border-rounded w-100'  onChange={(date)=>handleToDateChange(date)} customInput={<CustomDateInput />} required/>
                </Col>

                
            </Row>
        </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {enableSubmit?
            <>
            <Button type="submit" variant="primary" onClick={handleSubmit} >
              Submit
            </Button>
            </>:
            <>
            <Button type="submit" variant="primary" onClick={handleSubmit} disabled>
              Submit
            </Button>
            </>}
          </Modal.Footer>
        </Modal>
        </>:
        <>
        {/* this is the content generated dynamically */}
        <Loading show={loading} progress={progress}/>
        {formData.players.map((data,index)=>{
            return <div key={index}>
            <span>{data.firstPlayerName}</span>
            {data.secondPlayerName?<span>{data.secondPlayerName}</span>:null}
            </div>
        })}
        </>}
        
      </>
    );
}

export {PlayerSlotting}