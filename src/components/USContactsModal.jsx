import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ContactDetails from "./ContactDetails";

const USContactsModal = ({ show, setShow }) => {
  const [usContacts, setUsContacts] = useState([]);
  const [showEven, setShowEven] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleClose = () => setShow(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentContactData, setCurrentContactData] = useState(null);

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
          <Modal.Title>US Contacts</Modal.Title>
          <div className=" d-flex gap-2">
            <button
              style={{
                backgroundColor: "#46139f",
                color: "#ffffff",
                borderRadius: "5px",
              }}
              onClick={handleClose}
            >
              All Contacts
            </button>
            <button
              style={{
                backgroundColor: "#ff7f50",
                color: "#ffffff",
                borderRadius: "5px",
              }}
              onClick={handleClose}
            >
              US Contacts
            </button>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "1px solid #46139f",
                borderRadius: "5px",
              }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="h-[500px]">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Country Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {[...usContacts].map((contact) => {
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

export default USContactsModal;
