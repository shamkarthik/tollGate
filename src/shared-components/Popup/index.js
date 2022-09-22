import React from "react";
import "./Popup.css";

const PopUp = ({ setPopUp, heading, children }) => {
  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setPopUp });
    }
    return child;
  });
  return (
    <div className="PopUp">
      <button className="popup-close" onClick={() => setPopUp(false)}>
        x
      </button>
      <div className="popup-content-container">
        <h1>{heading}</h1>
      </div>
      <div className="popup-content-container">{childrenWithProps}</div>
    </div>
  );
};

export default PopUp;
