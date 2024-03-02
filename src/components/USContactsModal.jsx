import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const USContactsModal = ({ show, setShow }) => {
  const [usContacts, setUsContacts] = useState([]);
  const [showEven, setShowEven] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleClose = () => setShow(false);

  const getAllContacts = async () => {
    const response = await axios.get(
      "https://contact.mediusware.com/api/country-contacts/United%20States/?page_size=24"
    );
    setUsContacts(response.data.results);
    setRefetch(false);
  };

  const handleOnlyEven = (e) => {
    if (e.target.checked) {
      setUsContacts(usContacts.filter((_, i) => i % 2 === 0));
    } else {
      setRefetch(true);
    }
    setShowEven(e.target.checked);
  };

  useEffect(() => {
    getAllContacts();
  }, [refetch]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>US Contacts</Modal.Title>
        <div className=" d-flex gap-2">
          <Button variant="primary" onClick={handleClose}>
            All Contacts
          </Button>
          <Button variant="warning" onClick={handleClose}>
            US Contacts
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="h-[500px]">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {[...usContacts].map((contact) => {
                return (
                  <tr key={contact?.id}>
                    <td>{contact?.id}</td>
                    <td>{contact?.country?.name}</td>
                    <td>{contact?.phone}</td>
                    <td>@mdo</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-2">
          <input
            type="checkbox"
            name=""
            id="even"
            checked={showEven}
            onChange={handleOnlyEven}
          />
          <label htmlFor="even">Only Even</label>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default USContactsModal;
