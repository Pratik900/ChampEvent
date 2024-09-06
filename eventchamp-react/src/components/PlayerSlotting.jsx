import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState ,forwardRef} from 'react';
import {  Form,Row,Col, InputGroup, Alert, Toast, ToastContainer } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';
import {  FaCalendarAlt } from 'react-icons/fa';
import { Loading } from './Loading';
import { PlayerSlottingService } from '../services/PlayerService';



const PlayerSlotting=()=> {
    const navigate=useNavigate()
    const [show, setShow] = useState(true);
    const [status,setStatus] = useState(false);
    const [enableSubmit,setEnableSubmit] = useState(false)
    const[showAlert,setShowAlert]=useState(false)
    const [alertData,setAlertData] = useState('')
    const [formData,setFormData]=useState({gameType:'Singles',from:new Date(),to:new Date(),players:{}});
    const handleClose = () => navigate('/');
    const[loading,setLoading]=useState(false)

    const sleep=(ms)=> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit=async (e)=>{
        setShow(false)
        setLoading(true);
        e.preventDefault();

        const finalFromDate=new Date(formData.from)
        finalFromDate.setHours(0,0,0)
        const finalToDate=new Date(formData.to)
        finalToDate.setHours(23,59,59)

        const response = await PlayerSlottingService(formData,finalFromDate,finalToDate);
        console.log(response)

        if(response.data === 'Player found')
          console.log("200")
          console.log(response.player)
          setLoading(false);
          setFormData(response.player)

        if(response.status === 204)
        {
          console.log(response);
          setFormData(response.data)
          setLoading(false)
          setStatus(true)
          await sleep(3000)
          navigate('/')
        }

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
        const fromdate=new Date(formData.from);
        const todate=new Date(formData.to);
        if(fromdate<=todate){
            setEnableSubmit(true)
            setAlertData('')
            setShowAlert(false)
        }
        else{
            setEnableSubmit(false)
            setAlertData(<><strong>FROM</strong> date must be greater than <strong>TO</strong> date</>)
            setShowAlert(true)
        }
    },[formData.from, formData.to])

    // useEffect(()=>{
    //     console.log('generateSlottings')
    //     if(formData.players.length>0)
    //         setLoading(false)
    //     else if(Response.status === 204)
    //         setStatus(true)
    //     else
    //       setLoading(true)
    // },[formData.players])

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
            <FaCalendarAlt /> 
          </InputGroup.Text>
        </InputGroup>
      ));
  
    return (
      <>
        {show ? (
          <>
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
                        <Form.Label htmlFor="from">From</Form.Label>
                      </Col>
                      <Col>
                        <Form.Label htmlFor="to">To</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <DatePicker
                          name="from"
                          selected={formData.from}
                          dateFormat="dd-MM-YYYY"
                          className="border border-1 border-rounded w-100"
                          onChange={(date) => handleFromDateChange(date)}
                          customInput={<CustomDateInput />}
                          required
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          name="to"
                          selected={formData.to}
                          dateFormat="dd-MM-YYYY"
                          className="border border-1 border-rounded w-100"
                          onChange={(date) => handleToDateChange(date)}
                          customInput={<CustomDateInput />}
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Col>
                  <Col>
                    {enableSubmit ? (
                      <>
                        <Button
                          type="submit"
                          variant="primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          variant="primary"
                          onClick={handleSubmit}
                          disabled
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
                <Row className="w-100">
                  <Col>
                    <Alert
                      key="alert"
                      variant="danger"
                      className="p-2 text-center"
                      show={showAlert}
                    >
                      {alertData}
                    </Alert>
                  </Col>
                </Row>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            {/* this is the content generated dynamically */}
            {loading ? (<Loading show={loading} />) : status ? 
            (
              <>
              <ToastContainer position="top-end" className="p-3 "></ToastContainer>
                <Toast >
                  <Toast.Body >No Data Found</Toast.Body>
                </Toast>
                <ToastContainer/>
              </>
            ) : (
              <>
                {formData.map((data) => {
                  return (
                    <div key={data._id}>
                      <span>{data.firstPlayerName}</span>
                      {data.secondPlayerName ? (
                        <span>{data.secondPlayerName}</span>
                      ) : null}
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </>
    );
}

export {PlayerSlotting}