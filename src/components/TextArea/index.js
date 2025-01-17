
import React from "react";

import style from "./textarea.module.css";

const TextArea = ({ title,subTitle, icon, placeholder, requried, ...rest }) => {
  return (
    <div>
      <p className={style.title}>{title}<span className={style.subtitle}> {subTitle}</span>{requried && <span className="requried"> *</span>}</p>
      <div className={style.inputField}>
        {/* <div className={style.icon}>{icon && icon}</div> */}
        <textarea rows="3" cols="50" className={style.input} maxLength={250} placeholder={placeholder} {...rest} />
      </div>
    </div>
  );
};

export default TextArea;
