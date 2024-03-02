import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ContactDetails from "./ContactDetails";
import { API_BASE_URL } from "../config";

const USContactsModal = ({ show, setShow, setAllShow }) => {
  const [usContacts, setUsContacts] = useState([]);
  const [showEven, setShowEven] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentContactData, setCurrentContactData] = useState(null);
  const [filter, setFilter] = useState("");

  const handleClose = () => setShow(false);
  const getUSContacts = async () => {
    const urlParams = new URLSearchParams({
      search: filter,
      page: 1,
    }).toString();
    const response = await axios.get(
      `${API_BASE_URL}/country-contacts/United%20States/?${urlParams}`
    );
    setUsContacts(response.data.results);
    setRefetch(false);
  };

  const handleOnlyEven = (e) => {
    if (e.target.checked) {
      setUsContacts(usContacts.filter((contact, i) => contact?.id % 2 === 0));
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
    getUSContacts();
  }, [refetch, filter]);

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
              onClick={() => {
                setAllShow(true);
                setShow(false);
              }}
            >
              All Contacts
            </button>
            <button
              style={{
                backgroundColor: "#ff7f50",
                color: "#ffffff",
                borderRadius: "5px",
              }}
              onClick={() => {
                setShow(false);
                setAllShow(true);
              }}
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
          <div>
            <Form>
              <Form.Control
                type="text"
                placeholder="Filter Contacts"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Form>
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
