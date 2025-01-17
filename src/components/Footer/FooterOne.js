import React from 'react'
import style from './footer.module.css'

const FooterOne = () => {
  return (
    <div className={style.footerOne}>
      <p style={{lineHeight : "20px"}}>
        <small>
        © 2024 Site Maintain by Department of Digital
            Technologies & Governance, Himachal Pradesh<br /> All Rights Reserved.
        </small>
      </p>
    </div>
  )
}

export default FooterOne
