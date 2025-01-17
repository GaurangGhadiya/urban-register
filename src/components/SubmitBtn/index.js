import React from "react";
import style from "./Submit.module.css";

const SubmitButton = ({ label, onClick,type,icon, ...rest }) => {
  return (
    <div onClick={onClick} style={{backgroundColor : type =="cancel" ? "#A04040": ""}} {...rest} className={style.signin}>
     <div>{icon && icon}</div>
      <div>{label}</div>
    </div>
  );
};

export default SubmitButton;
