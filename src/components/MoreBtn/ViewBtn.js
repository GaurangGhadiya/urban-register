import React from 'react'
import style from './morebtn.module.css'
import { FaEye } from "react-icons/fa";


const ViewBtn = ({title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <FaEye size={18} style={{marginTop : "5px", marginRight : "7px", color:"#28A745 "}}/>
            </div>
            <div  {...rest} className={style.more} style={{color : "#28A745"}}>
                {title || "View"}
            </div>
                   </div>
    )

}

export default ViewBtn
