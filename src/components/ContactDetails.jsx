import React from "react";
import { Button, Modal } from "react-bootstrap";

const ContactDetails = ({ show, data, setShow, setData }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setData(null);
        setShow(false);
      }}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Phone</h4>
        <p>{data?.phone}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setData(null);
            setShow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetails;
