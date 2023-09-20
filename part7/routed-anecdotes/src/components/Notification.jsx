import React from "react";

const Notification = ({ message }) => {
  const style = {
    display: message ? "block" : "none",
    padding: "10px",
    border: "1px solid #4CAF50",
    backgroundColor: "#D4EDDA",
    color: "#155724",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
