// components/InputFieldWithIcon.js

import React from "react";

import style from "./InputField.module.css";

const InputFieldWithIcon = ({ title,subTitle, icon, placeholder, requried,topStyle={},maxLength, ...rest }) => {
  return (
    <div style={topStyle}>
      <p className={style.title}>{title}<span className={style.subtitle}> {subTitle}</span>{requried && <span className="requried"> *</span>}</p>
      <div className={style.inputField}>
        {/* <div className={style.icon}>{icon && icon}</div> */}
        <input className={style.input} placeholder={placeholder} maxLength={maxLength ? maxLength : 30}  {...rest} />
      </div>
    </div>
  );
};

export default InputFieldWithIcon;
