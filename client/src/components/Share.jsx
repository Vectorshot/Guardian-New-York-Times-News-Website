import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../CSS/style.css";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { MdShare } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import e from "express";
// import e from "express";

// export default class Share extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         show:false
//     };
//   }

//   handleClose=()=>{
//       this.setState({
//           show:false
//       })
//   }

//   render() {
//     return (
//       <div>
//         <Modal show={this.state.show} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={this.handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={this.handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

function Share(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {/* <span style={{display:"inline"}}> */}
        <MdShare
          className="News_ICON"
          style={{ display: "inline", margin: "auto" }}
          onClick={handleShow}
        />
      {/* </span> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{props.title_of_result}</Modal.Title> */}
    <p>{props.title_of_result}</p>
        </Modal.Header>
        <Modal.Body>
          
          <Container>
            <Row><p className="modal_line">Share via</p></Row>
            <Row>
              <Col lg={4} md={4} xs={4}>
                {/* <code></code> */}
                <div className="button_share">
                <FacebookShareButton url={props.source}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton></div>
              </Col>
              <Col lg={4} md={4} xs={4}>
                <div className="button_share">
                <TwitterShareButton url={props.source}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton></div>
              </Col>
              <Col lg={4} md={4} xs={4}>
                <div className="button_share">
                <EmailShareButton url={props.source}>
                  <EmailIcon size={32} round />
                </EmailShareButton></div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <div className="share_button_group"> */}

        {/* </div> */}
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> 
        </Modal.Footer> */}
      </Modal>
    </span>
  );
}

export default Share;
