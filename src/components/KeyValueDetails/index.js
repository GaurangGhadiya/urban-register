import React from 'react'
import style from './keyvalue.module.css'
const KeyValueDetails = ({title, value}) => {
  return (
    <div>
      <div className={style.title}>{title}</div>
      <div className={style.value}>{value}</div>
    </div>
  )
}

export default KeyValueDetails
