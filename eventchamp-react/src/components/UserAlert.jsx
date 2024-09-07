import React, {  useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const UserAlert = (prop) => {
  const [show1, setShow1] = useState(prop.show);

  const toggleShow = () => setShow1(!show1);


  return (
    <>
      {/* <Button onClick={toggleShow} className="mb-2">
        Show Toast
      </Button> */}

      <ToastContainer position="top-end" className="p-3">
        <Toast show={show1} onClose={toggleShow} animation={true} delay={5000} bg={prop.color} autohide>
          <Toast.Header className='mx-auto border border '>
            <strong className="me-auto " style={{ textAlign: 'justify' }}>{prop.message}</strong>
            {/* <small>Just now</small> */}
          </Toast.Header>
          <Toast.Body className='d-none'>
            {/* {prop.message} */}
            <>
            </>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export  {UserAlert};