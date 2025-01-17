import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import style from "./Header.module.css";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import LoginDialog from "../Dialogs/login";
import { getImagePath } from "@/utils/CustomImagePath";



const Header = () => {
 


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ height: 60, background: "white", position : "relative" }} >
        <Toolbar>
          <Box mr={2} style={{ marginBottom: 5 }}>
            <div className={style.logo}>
              <Image
                src={getImagePath("/hp.png")}
                width="45"
                height="45"
                alt="Himachal Pradesh Logo"
              />
            </div>
          </Box>
          <Typography component="div" sx={{ flexGrow: 1, marginBottom: 1 ,color :"#813600", fontWeight : "600"}}>
            Himachal Pradesh Panchayati Raj
          </Typography>

                <Button sx={{ color: "#813600" , textTransform : "capitalize", fontWeight : "600"}} onClick={handleClickOpen}>
                   Login
                </Button>
          
        </Toolbar>
      </AppBar>
    </Box>
    <LoginDialog handleClose={handleClose} open={open}/>
   
    </>
  );
};

export default Header;
