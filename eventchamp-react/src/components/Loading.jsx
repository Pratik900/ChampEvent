import React from "react";
import {  Modal, Spinner,Button  } from "react-bootstrap";
const Loading = ({show}) => {
  return (<>
  <Modal
    show={show}
    centered
    backdrop="static"
    keyboard={false}
    className="p-0"
  >   
    <Modal.Body className="text-end p-0 text-center w-0 bg-primary rounded" style={{backgroundColor:'transparent'}}>

      <Button variant="primary p-3 text-center" disabled>
        <Spinner
        className="text-center"
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
          <span className="h4">
            &nbsp;Loading...
            </span>
          
      </Button>

    </Modal.Body>
  </Modal>
  </>
  )
};

export { Loading };
