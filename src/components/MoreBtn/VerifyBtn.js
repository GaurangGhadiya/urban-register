import React from 'react'
import style from './morebtn.module.css'
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";


const VerifyBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <FaPencil size={18} style={{marginTop : "5px", marginRight : "7px", color:"#A04040 "}}/>
            </div>
            <div  {...rest} className={style.more} style={{color : "#A04040"}}>
                {title || "Verify"}
            </div>
                   </div>
    )
}

export default VerifyBtn
