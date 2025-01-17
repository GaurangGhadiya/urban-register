import React from 'react'
import style from './login.module.css'
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import CancelBtn from '@/components/CancelBtn'
import { RiHomeOfficeFill } from "react-icons/ri";
import { SiHiveBlockchain } from "react-icons/si";
import { HiBuildingOffice } from "react-icons/hi2";
import { IoIosDocument } from "react-icons/io";
import { MdAddHomeWork } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import Image from 'next/image'
import { getImagePath } from '@/utils/CustomImagePath'


const SignUpMpdal = ({handleChange, handleSubmit,signUpData,setModalFlag}) => {
  return (
    <div className={style.cardBody} style={{minWidth : "800px"}}>
    <div className={style.logo}>
      <Image
        src={getImagePath("/hp.png")}
        width={100}
        height={100}
        alt="Himachal Pradesh logo"
        className={style.logo}
      />
    </div>
    <h5 className={style.title}>Parivar Register Signup</h5>

    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <SelectDropdown
            title="Select District"
            name="district"
            icon={<RiHomeOfficeFill size={20} />}
            options={[
              { value: "shimla", label: "Shimla" },
            ]}
            value={signUpData?.district}
            onChange={handleChange}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <SelectDropdown
            title="Select Block"
            name="block"
            icon={<SiHiveBlockchain size={20} />}
            options={[
              { value: "A", label: "Block - A" },
              { value: "B", label: "Block - B" },
            ]}
            value={signUpData?.block}
            onChange={handleChange}
            disabled
          />
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <SelectDropdown
            title="Select Panchayat"
            name="panchayat"
            icon={<HiBuildingOffice size={20} />}
            options={[
              { value: "Himachal Pradesh", label: "Himachal Pradesh" },
            ]}
            value={signUpData?.panchayat}
            onChange={handleChange}
            disabled
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <InputFieldWithIcon
            title="Enter Aadhaar"
            icon={<IoIosDocument size={20} />}
            placeholder=""
            type="text"
            name="aadhaar"
            value={signUpData?.aadhaar}
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <InputFieldWithIcon
            title="Enter Name"
            icon={<MdDriveFileRenameOutline size={20} />}
            placeholder=""
            type="text"
            name="name"
            value={signUpData?.name}
            onChange={handleChange}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <SelectDropdown
            title="Select Designation"
            icon={<MdAddHomeWork size={20} />}
            options={[
              { value: "develoepr", label: "Developer" },
              { value: "consultant", label: "Consultant" },
            ]}
            name="designation"
            value={signUpData?.Designation}
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <SelectDropdown
            title="Select Department"
            icon={<AiFillBank size={20} />}
            options={[
              { value: "react js", label: "ReactJs" },
              { value: "node js", label: "NodeJs" },
            ]}
            value={signUpData?.department}
            name="department"
            onChange={handleChange}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <InputFieldWithIcon
            title="Enter Mobile Numer"
            icon={<BsFillTelephoneFill size={20} />}
            placeholder=""
            type="number"
            onKeyDown={(e) =>  e.key == "e" ? e.preventDefault() : null}
            name="mobileNumber"
            value={signUpData?.mobileNumber}
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className={style.inputField}>
          <InputFieldWithIcon
            title="Enter Username"
            icon={<FaUser size={20} />}
            placeholder=""
            type="text"
            name="userName"
            value={signUpData?.userName}
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>

    <div className={style.btns}>
      <SubmitButton
        label="Sign up"
        onClick={handleSubmit}
        style={{ width: "15%" }}
      />{" "}
      &nbsp;&nbsp;&nbsp;
      <CancelBtn
        label="Cancel"
        onClick={() => setModalFlag("1")}
        style={{ width: "15%" }}
      />
    </div>

    <hr className={style.divider} />

    <p onClick={() => setModalFlag("1")} className={style.headline}>
      Already have an account? Login
    </p>
  </div>
  )
}

export default SignUpMpdal
