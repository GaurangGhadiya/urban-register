import React from 'react'
import style from './fileUpload.module.css'

const FileUpload = ({title, subTitle,requried, ...rest}) => {
  return (
    <div>
    <p className={style.title}>{title}<span className={style.subtitle}> {subTitle}</span>{requried && <span className="requried"> *</span>}</p>
    <div className={style.inputField}>
      {/* <div className={style.icon}>{icon && icon}</div> */}
      <input className={style.input} type='file'{...rest} />
    </div>
  </div>
  )
}

export default FileUpload
