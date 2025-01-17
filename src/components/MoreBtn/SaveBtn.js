import React from 'react'
import style from './morebtn.module.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoIosSave } from "react-icons/io";


const SaveBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <IoIosSave size={18} style={{marginTop : "5px", marginRight : "7px", color:"#28A745 "}}/>
            </div>
            <div  {...rest} className={style.more} style={{color : "#28A745"}}>
                {title || "Save"}
            </div>
                   </div>
    )
}

export default SaveBtn
