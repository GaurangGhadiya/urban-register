import React from "react";
import style from "./CancelBtn.module.css";

const CancelBtn = ({ label, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest} className={style.cancel}>
      {label}
    </button>
  );
};

export default CancelBtn;
