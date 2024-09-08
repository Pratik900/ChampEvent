import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState ,forwardRef} from 'react';
import {  Form,Row,Col, InputGroup, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom';
import {  FaCalendarAlt } from 'react-icons/fa';
import { Loading } from '../Common/Loading';
import { PlayerSlottingService } from '../../services/PlayerService';
import {UserAlert} from '../Common/UserAlert';
import { SinglesSlotting } from './SinglesSlotting';



const PlayerSlotting=()=> {
    const navigate=useNavigate()
    const location=useLocation()
    const [show, setShow] = useState(true);
    const [enableSubmit,setEnableSubmit] = useState(false)
    const[showAlert,setShowAlert]=useState(false)
    const [alertMessage,setAlertMessage] = useState('')
    const[showUserAlert,setShowUserAlert]=useState(false)
    const [userAlertMessage,setUserAlertMessage] = useState('')
    const[userAlertColor,setUserAlertColor] = useState('primary')
    const [formData,setFormData]=useState({gameType:'Singles',from:new Date(),to:new Date(),players:{}});
    const handleClose = () => navigate('/');
    const[loading,setLoading]=useState(false)
    // const handleShow = () => setShow(true);
    const handleSubmit=async (e)=>{
        // console.log("submitted")
        // console.log(formData)
        setShow(false)
        setLoading(true);
        e.preventDefault();

    try{
        const response=await PlayerSlottingService(formData)
        console.log(response)
        if(!response.data.player===undefined){
            setLoading(false)
            setShow(true)
            }
            setFormData({...formData,'players':response.data.player})
    }
    catch(err){
        if(err.response===undefined){
            setUserAlertMessage('Please try again after some time.')
            setUserAlertColor('danger')
            setShowUserAlert(true)
            setLoading(false)
            setShow(true)
        }
        else if (err.response.status===404) 
            alert(err.response.data.message)

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
    // useEffect(()=>{
    //     // perform date validation on both datepickers
    //     const fromdate=new Date(formData.from);
    //     const todate=new Date(formData.to);
    //     if(fromdate<=todate){
    //         setEnableSubmit(true)
    //         setAlertMessage('')
    //         setShowAlert(false)
    //         // setProgress(10)
    //       }
    //       else{
    //         // setEnableSubmit(false)
    //         // setAlertMessage(<><strong>FROM</strong> date must be greater than <strong>TO</strong> date</>)
    //         // setShowAlert(true)
    //         console.log("reached")
    //         setUserAlertColor('warning')
    //         setUserAlertMessage(<><strong>FROM</strong> date must be greater than <strong>TO</strong> date</>)
    //         setShowUserAlert(true)
    //     }
    // },[formData.from, formData.to])

    useEffect(()=>{
      const fromdate=new Date(formData.from);
        const todate=new Date(formData.to);
        if(formData.players!==undefined && formData.players.length>0){
            setShowUserAlert(false)
            // setUserAlertMessage('Data fetched successfully!')
            // setUserAlertColor('success')
            setLoading(false)
            // if(formData.gameType==='Singles')
            // navigate('/playerslotting/singlesslotting',{state:{message:"Singles Slottings generated"},replace:true})
            // else if(formData.gameType==='Doubles')
            //   navigate('/playerslotting/doublesslotting',{state:{message:"Doubles Slottings generated"},replace:true})
            // else
            // navigate('/',{state:{message:"Error in slots generation"},replace:true})
        }
        else if (formData.players===undefined){
            setFormData({...formData,'players':{}})
            setShowUserAlert(true)
            setUserAlertMessage("No Entries Found.")
            setUserAlertColor('danger')
            setLoading(false)
            // sleep(3000)
            setShow(true)
        }
        else if(fromdate>todate){
          setLoading(false)
            console.log("reached")
            // setEnableSubmit(false)
            setUserAlertColor('warning')
            setUserAlertMessage(<><strong>FROM</strong> date must be less than or equal to <strong>TO</strong> date</>)
            setShowUserAlert(true)
        }
        else if (fromdate<=todate){
          setEnableSubmit(true)
        }
        else
        setLoading(true)
        // loadingAnimation()
        // while(progress!==100)
    },[formData,navigate])
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
      <>
      {show?<>
        <UserAlert  show ={showUserAlert} color={userAlertColor} message={userAlertMessage}></UserAlert>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
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
            <Row>
                <Col>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
                </Col>
                <Col>
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
                </Col>
            </Row>
            <Row className='w-100'>
                <Col>
            {/* <Alert key='alert' variant='danger' className='p-2 text-center' show={showAlert}>{alertMessage}</Alert> */}
                </Col>
            </Row>
          </Modal.Footer>
        </Modal>
        </>:
        <>
        {/* this is the content generated dynamically */}
        {loading?<><Loading show={loading}/></>:formData.gameType==="Singles"?<>{navigate("/playerslotting/singlesslotting")}</>:formData.gameType==="Doubles"?<>{navigate("/playerslotting/doublesslotting")}</>:<>{navigate("/",{replace:true,state:null})}</>
        // <>
        //     {formData.players.map((data,index)=>{
        //         return <div key={index}>
        //         <span>{data.firstPlayerName}</span>
        //         {data.secondPlayerName?<span>{data.secondPlayerName}</span>:null}
        //         </div>
        //     })}
        // </>
        }
        </>}
        
      </>
    );
}

export {PlayerSlotting}