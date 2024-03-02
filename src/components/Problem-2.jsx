import React, { useState } from "react";
import AllContactsModal from "./AllContactsModal";
import USContactsModal from "./USContactsModal";

const Problem2 = () => {
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUSContactsModal, setShowUSContactsModal] = useState(false);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={(e) => setShowAllContactsModal(true)}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={(e) => setShowUSContactsModal(true)}
          >
            US Contacts
          </button>
        </div>
      </div>
      <AllContactsModal
        show={showAllContactsModal}
        setShow={setShowAllContactsModal}
      />
      <USContactsModal
        show={showUSContactsModal}
        setShow={setShowUSContactsModal}
      />
    </div>
  );
};

export default Problem2;
