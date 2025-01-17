import React, { useState } from 'react'
import style from './login.module.css'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SubmitButton from '@/components/SubmitBtn';
import CancelBtn from '@/components/CancelBtn';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Grid } from '@mui/material';
import SelectDropdown from '@/components/SelectDropdown';


import { MdClose, MdDriveFileRenameOutline } from "react-icons/md";
import LoginModal from './loginModal';
import SignUpMpdal from './signUpMpdal';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      // padding: theme.spacing(2),
      border :"none"
    },
    '& .MuiDialogActions-root': {
      // padding: theme.spacing(1),
      border :"none"
    },
  }));

const LoginDialog = ({handleClose, open}) => {
    const router = useRouter();
    const [modalFlag, setModalFlag] = useState("1");
    const [loginData, setLoginData] = useState({
        userID: "",
        password: "",
      });
      const [signUpData, setSignUpData] = useState({
        district : "",
        block: "",
        panchayat: "",
        aadhaar: "",
        name:"",
        designation: "",
        department : "",
        mobileNumber: "",
        userName:""
    
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
      };
    
      const handleSubmit = () => {
      };
    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
      };
    
      const handleSubmitLogIn = () => {
      };
  return (
    <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    maxWidth={modalFlag == "1" ? "md" : "lg"}
  >
   
   <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
            zIndex: 999
          }}
        >
         <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
         <MdClose color='white' size={18}/>
         </Box>
        </IconButton>
    <DialogContent dividers>
    <div className={style.card}>
        {modalFlag == "1" ? 
       <LoginModal handleChangeLogin={handleChangeLogin} loginData={loginData} handleSubmitLogIn={handleSubmitLogIn} setModalFlag={setModalFlag}/>
     :  
       <SignUpMpdal handleChange={handleChange} handleSubmit={handleSubmit} signUpData={signUpData} setModalFlag={setModalFlag}/>
    }
      </div>
    </DialogContent>
 
  </BootstrapDialog>
  )
}

export default LoginDialog
