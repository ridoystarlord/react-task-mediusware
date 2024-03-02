import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ContactDetails from "./ContactDetails";

const AllContactsModal = ({ show, setShow }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentContactData, setCurrentContactData] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [showEven, setShowEven] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleClose = () => setShow(false);

  const getAllContacts = async () => {
    const response = await axios.get(
      "https://contact.mediusware.com/api/contacts/?page_size=600"
    );
    setAllContacts(response.data.results);
    setRefetch(false);
  };

  const handleOnlyEven = (e) => {
    if (e.target.checked) {
      setAllContacts(allContacts.filter((contact, i) => contact?.id % 2 === 0));
    } else {
      setRefetch(true);
    }
    setShowEven(e.target.checked);
  };

  const handleShowDetails = (data) => {
    setCurrentContactData(data);
    setShowDetails(true);
  };

  useEffect(() => {
    getAllContacts();
  }, [refetch]);

  return (
    <>
      <ContactDetails
        show={showDetails}
        setShow={setShowDetails}
        data={currentContactData}
        setData={setCurrentContactData}
      />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>All Contacts</Modal.Title>
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
                </tr>
              </thead>
              <tbody>
                {[...allContacts].map((contact) => {
                  return (
                    <tr
                      key={contact?.id}
                      onClick={() => handleShowDetails(contact)}
                    >
                      <td>{contact?.id}</td>
                      <td>{contact?.country?.name}</td>
                      <td>{contact?.phone}</td>
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
    </>
  );
};

export default AllContactsModal;
