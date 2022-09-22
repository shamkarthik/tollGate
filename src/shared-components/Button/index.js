import React from "react";
import "./Button.css";

const Button = ({ id, isDisabled, clickHandler, type, value, hidden }) => {
  const btnEnableDisable = !isDisabled ? "btn-enable" : "btn-disabled";

  return (
    <button
      id={id}
      className={`btn ${btnEnableDisable}`}
      onClick={clickHandler}
      type={type}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: "button",

  disabled: false,
};

export default Button;
