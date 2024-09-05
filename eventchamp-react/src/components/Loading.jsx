import React from "react";
import {  Modal, ProgressBar  } from "react-bootstrap";
const Loading = ({show,progress}) => {
  return (<>
  <Modal
    show={show}
    centered
    backdrop="static"
    keyboard={false}
    className=""
  >   
    <Modal.Body className="text-end">
      <ProgressBar animated now={progress}  className="border border-0 text-center p-0" role="status">
        {/* <span className="text-center w-100"><strong>Loading...</strong></span> */}
      </ProgressBar>
      <span className="mx-auto">{progress}%</span>

    </Modal.Body>
  </Modal>
  </>
  )
};

export { Loading };
