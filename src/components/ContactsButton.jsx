import React from "react";

export const ContactsButton = ({
  handleShowAllContacts,
  handleShowUsContacts,
  handleClose,
}) => {
  return (
    <div className=" d-flex gap-2">
      <button
        style={{
          backgroundColor: "#46139f",
          color: "#ffffff",
          borderRadius: "5px",
        }}
        onClick={handleShowAllContacts}
      >
        All Contacts
      </button>
      <button
        style={{
          backgroundColor: "#ff7f50",
          color: "#ffffff",
          borderRadius: "5px",
        }}
        onClick={handleShowUsContacts}
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
  );
};
