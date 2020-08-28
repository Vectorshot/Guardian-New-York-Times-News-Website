import React from "react";
import { Modal } from "react-bootstrap";

export default class Shareicon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false
    };
  }


//   handleClose = () => setShow(false);
//   handleShow = () => setShow(true);

  render() {
    return (
      <div>
        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}
