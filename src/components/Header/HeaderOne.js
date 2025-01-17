import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import style from './Header.module.css'
import { getImagePath } from '@/utils/CustomImagePath'

const HeaderOne = () => {
  return (
    <>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar className={style.AppBar} >
        <Toolbar style={{height : "30px !important", minHeight : "30px"}}>
          <Box mr={2}  display={"flex"}>
            <div className={style.logo}>
            <Image
                src={getImagePath("/facebook.png")}
                width="16"
                height="16"
                alt="Himachal Pradesh Logo"
              />
            </div>
            <div className={style.logo2}>
              <Image
                src={getImagePath("/twitter.png")}
                width="16"
                height="16"
                alt="Himachal Pradesh Logo"
                
              />
            </div>
          </Box>
          <Typography  component="div" sx={{ flexGrow: 1, marginBottom: 1 ,color :"#813600", fontWeight : "600"}}>
            {/* Himachal Pradesh Panchayati Raj */}
          </Typography>

          <Typography className={style.rightSkip} component="div" >
            Skip to main contant
          </Typography>
          <Typography className={style.right} component="div" >
            Sign In
          </Typography>
          <Typography className={style.right} component="div" >
            Register
          </Typography>
          <Typography className={style.rightMulti} component="div" >
            <span className={style.inner}>-A</span>
            <span className={style.inner}>A</span>
            <span className={style.inner}>+A</span>
          </Typography>
          <Typography className={style.right1} component="div" >
            A
          </Typography>
          <Typography className={style.right2} component="div" >
            A
          </Typography>
          <Typography className={style.right3} component="div" >
          हिन्दी
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default HeaderOne
