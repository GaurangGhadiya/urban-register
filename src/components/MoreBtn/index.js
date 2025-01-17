import React from 'react'
import style from './morebtn.module.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const MoreBtn = ({ title, onClick, ...rest }) => {
    return (
        <div className={style.outer}  onClick={onClick}>
            <div>      <FaArrowCircleLeft size={18} style={{marginTop : "5px", marginRight : "7px"}}/>
            </div>
            <div  {...rest} className={style.more}>
                {title || "More"}
            </div>
        </div>
    )
}

export default MoreBtn
