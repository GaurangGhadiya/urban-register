import React from 'react'
import style from './login.module.css'

import { FaEye } from "react-icons/fa";
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SubmitButton from '@/components/SubmitBtn';
import { AiFillBank } from "react-icons/ai";
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';


const LoginModal = ({handleChangeLogin,loginData,handleSubmitLogIn, setModalFlag}) => {
  return (
    <div className={style.cardBody} style={{minWidth : "400px"}}>
    <div className={style.logo}>
      <Image
        src={getImagePath("/hp.png")}
        width={100}
        height={100}
        alt="Himachal Pradesh logo"
        className={style.logo}
      />
    </div>
    <h5 className={style.title}>Parivar Register Login</h5>

    <div className={style.inputField}>
      <InputFieldWithIcon
        title="Enter UserID"
        name="userID"
        icon={<AiFillBank size={20} />}
        placeholder="UserId"
        type="text"
        onChange={handleChangeLogin}
        value={loginData?.userID}
      />
    </div>
    <div className={style.inputField}>
      <InputFieldWithIcon
        title="Enter Password"
        name="password"
        icon={<FaEye size={20} />}
        placeholder="Password"
        type="password"
        onChange={handleChangeLogin}
        value={loginData?.password}
      />
    </div>

    <div className={style.btns}>
      <SubmitButton
        label="Sign in"
        onClick={handleSubmitLogIn}
        style={{ width: "100%" }}
      />
      {/* <CancelBtn
        label="Back to Home"
        onClick={() => {}}
        style={{ width: "48%" }}
      /> */}
    </div>

    <hr className={style.divider} />

    <p
      onClick={() => setModalFlag("2")}
      className={style.headline}
    >
      Don't have an account? Signup
    </p>
  </div>
  )
}

export default LoginModal
