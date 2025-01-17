import React from 'react'
import style from './morebtn.module.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const CloseBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <IoMdClose size={18} style={{marginTop : "5px", marginRight : "7px", color:"#A04040 "}}/>
            </div>
            <div  {...rest} className={style.more} style={{color : "#A04040"}}>
                {title || "Close"}
            </div>
                   </div>
    )
}

export default CloseBtn
