import { AppBar, Box, Button, Divider, Grid, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import style from './Header.module.css'
import { LuMenuSquare } from "react-icons/lu";
import MenuData from './MenuData';
import { getImagePath } from '@/utils/CustomImagePath';


const HeaderTwo = () => {
  const [openMenu, setOpenMenu] = useState(false);


  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Box className={style.twoAppBar} style={{ zIndex: 1 }} >
          <Toolbar style={{ margin: "0px 0px 7px 0px" , paddingTop : "7px"}}>
            <Box mr={2} style={{ marginBottom: 5 }}>
              <div className={style.logo}>
                <Image
                  src={getImagePath("/HPGovt.png")}
                  width="80"
                  height="60"
                  alt="Himachal Pradesh Logo"
                  className={style.hpLogo}
                />
              </div>
            </Box>
            <Typography component="div" sx={{ flexGrow: 1, marginBottom: 1 }}>
              <div className={style.twoHead}>

                Family Register
              </div>
              <div className={style.twoDesc}>
                Urban Development Department
              </div>
            </Typography>

            {MenuData?.map(v => (
              <Typography className={style.twoRight} component="div" >
                <div className={style.mainImg}>
                  <div className={style.outerImg}>
                    <Image
                      src={getImagePath(v?.icon)}
                      width="40"
                      height="40"
                      alt="Himachal Pradesh Logo"
                    />
                  </div>
                </div>
                <span className={style.twoTitle}>{v?.title}</span>
              {v?.menu &&   <div className={style.menu} style={{ width: "25vw", ...v?.style }}>
                  <Grid container spacing={1} >
                    {v?.menu?.map(k => <Grid item xs={12}>
                      <p className={style.item}>{k}</p></Grid>
                    )}

                  </Grid>

                </div>}
              </Typography>
            ))}


            {/* <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src={getImagePath("/nav1.png")}
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>Topics</span>
              <div className={style.menu} style={{width : "40vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Agriculture</p>
                    <p className={style.item}>Communications & IT</p>
                    <p className={style.item}>Environment & Forest</p>
                    <p className={style.item}>Foreign Affairs</p>
                    <p className={style.item}>Home Affairs </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Art & Culture</p>
                    <p className={style.item}>Defence</p>
                    <p className={style.item}>Finance & Taxes</p>
                    <p className={style.item}>Administration</p>
                    <p className={style.item}>Housing</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Commerce</p>
                    <p className={style.item}>Education</p>
                    <p className={style.item}>Food & Public </p>
                    <p className={style.item}>Health & Family</p>
                    <p className={style.item}>Industries</p>

                  </Grid>
                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src={getImagePath("/nav2.png")}
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>Services</span>

            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src={getImagePath("/nav3.png")}
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}> My Goverment</span>
              <div className={style.menu} style={{width : "40vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Constitution of India</p>
                    <p className={style.item}>Publications</p>
                    <p className={style.item}>Schemes</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Government Directory</p>
                    <p className={style.item}>Who's Who</p>
                    <p className={style.item}>Documents</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>Indian Parliament</p>
                    <p className={style.item}>Acts</p>

                  </Grid>
                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src={getImagePath("/nav4.png")}
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>People Groups</span>
              <div className={style.menu} style={{width : "12vw"}}>
                <Grid container spacing={5} >
                  <Grid item xs={12}>
                    <p className={style.item}>Community</p>
                    <p className={style.item}>Life Cycle</p>
                  </Grid>

                </Grid>

              </div>
            </Typography>

            <Typography className={style.twoRight} component="div" >
              <div className={style.mainImg}>
                <div className={style.outerImg}>
                  <Image
                    src={getImagePath("/nav5.png")}
                    width="40"
                    height="40"
                    alt="Himachal Pradesh Logo"
                  />
                </div>
              </div>
              <span className={style.twoTitle}>India At A Glance</span>
              <div className={style.menu} style={{width : "40vw", right : "40%"}}>
                <Grid container spacing={5} >
                  <Grid item xs={4}>
                    <p className={style.item}>Profiles</p>
                    <p className={style.item}>National Symbols</p>
                    <p className={style.item}>People and Lifestyle</p>
                    <p className={style.item}>Where to Stay</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>States of India</p>
                    <p className={style.item}>Culture & Heritage</p>
                    <p className={style.item}>Places to Visit</p>
                    <p className={style.item}>Modals of Travel</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.item}>My India My Pride</p>
                    <p className={style.item}>Districs of India</p>
                    <p className={style.item}>Nature Wonders </p>
                    <p className={style.item}>Travel Agents</p>

                  </Grid>
                </Grid>

              </div>
            </Typography> */}

            <div className={style.hamburger}>
              <div className={style.menuIcon}>
                <LuMenuSquare size={30} color="black" style={{ cursor: "pointer" }} onClick={toggleMenu} />
              </div>

              {openMenu && <div className={style.hamburgerMenu}>
                <p onClick={toggleMenu} className={style.hamburgerMenuName}>Home</p>
                <p onClick={toggleMenu} className={style.hamburgerMenuName}>Notification</p>
                {/* <p onClick={toggleMenu} className={style.hamburgerMenuName}>My Goverment</p>
                <p onClick={toggleMenu} className={style.hamburgerMenuName}>People Groups</p>
                <p onClick={toggleMenu} className={style.hamburgerMenuName} >India at a Glance</p> */}
              </div>}
            </div>

          </Toolbar>
        </Box>
      </Box>
    </>
  )
}

export default HeaderTwo
