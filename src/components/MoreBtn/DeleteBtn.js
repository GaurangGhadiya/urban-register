import React from 'react'
import style from './morebtn.module.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const DeleteBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <MdDelete size={18} style={{marginTop : "5px", marginRight : "7px", color:"#A04040 "}}/>
            </div>
            <div  {...rest} className={style.more} style={{color : "#A04040"}}>
                {title || "Delete"}
            </div>
                   </div>
    )
}

export default DeleteBtn
