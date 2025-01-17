import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import style from "./layout.module.css"
import { useRouter } from 'next/router'
import { Box, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import Loader from '@/utils/Loader'
import { IoMenu } from "react-icons/io5";
import { useLoading } from '@/utils/LoadingContext'
import { MdAccountCircle } from 'react-icons/md'
import i18n from '../../i18n'
import { clearAllCookies, getCookieValues, removeCookie } from '@/utils/cookies'
import axios from 'axios'
import { logoutFunction } from '@/network/apiData'

const MainLayout = ({ children }) => {
  const router = useRouter()
  const { loading } = useLoading();
  // const userData = getCookieValues("userData") || null
  const [userData, setUserData] = useState(false)
  const [test, settest] = useState(false)
  const [loading1, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const getCookies = async () => {
    const data = await getCookieValues("userData")
    setUserData(data)
  }
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSidebarOpen(window.innerWidth< 768 ? false :true)
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    settest(true)
    getCookies()

  }, [])

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguae = () => {
    let cLanguage = i18n.language
    if (cLanguage == "en") {
        i18n.changeLanguage("hi")
    } else {
        i18n.changeLanguage("en")
    }
    handleClose()
}

  const logout = async () => {
  logoutFunction()

  // await clearAllCookies();
  // await removeCookie('userData')

  // const logoutURL = `https://sso.hp.gov.in/official/site/logout?onboardingapp=${process.env.NEXT_PUBLIC_ONBOARDING_APP}&user_name=${userData?.email || userData?.username}`;
  // window.location.href = logoutURL

  // handleClose()


}


  return (
    test && <>

      <div className={style.container}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {/* Main content */}

        <div
          //  className={style.mainContent}
          className={`content ${isSidebarOpen ? 'content-shift' : ''}`}>

         <header style={{
            background: "white", margin: "-20px", marginBottom: "20px", height: "40px", backgroundColor: "#FBFCFE",
            borderBottom: "1px solid #D7DBDC", display: "flex", alignItems: "center"
          }}>
            {windowWidth < 768 &&<div style={{ marginLeft: "10px" ,marginTop : '3px'}}>
              <IoMenu size={22} cursor={"pointer"} onClick={toggleSidebar} />

            </div>}
            <div style={{display : "flex", justifyContent : "end", width : "100%", alignItems : "center"}}>
            {/* <p style={{fontSize : "16px"}}>{userData?.user_id || userData?.username}</p> */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  <MdAccountCircle color='#2579C4' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                style={{marginTop : "20px"}}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{userData?.email || userData?.username}</MenuItem>
                <MenuItem onClick={changeLanguae}>Change Language to {i18n.language == "en" ? "Hindi" : "English"}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>

          </header>
{loading && <Loader />}
          {loading1 ? <Loader /> : children}

          {/* {children} */}
        </div>
      </div>
    </>
  )
}

export default MainLayout
