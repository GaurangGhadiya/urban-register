import React from 'react';
import style from "./Dropdown.module.css"
const SelectDropdown = ({ options, value, onChange,icon, title ,requried,topStyle={}, ...rest}) => {
  return (
    <div style={topStyle}>
    <p className={style.title}>{title}{requried && <span className="requried"> *</span>}</p>
    <div className={style.inputField}>
      <select value={value} onChange={onChange} className={style.input} placeholder="select..." {...rest}>
      <option  value="" disabled selected hidden >Select...</option>
      {options?.map(option => (
        <option key={option.value} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
    </div>
  </div>


   
  );
};

export default SelectDropdown;