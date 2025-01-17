import React, { useEffect, useState } from 'react'
import style from './Header.module.css'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { MdArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getCookieValues, removeCookie } from '@/utils/cookies';
import { useRouter } from 'next/router';
import Script from 'next/script';
import ParichayModal from './ParichayModal';


const HeaderThree = () => {
  // const userData = useSelector((state) => state.authDetails?.data);
  const router = useRouter()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const userData = getCookieValues("userData") || null
  const [test, settest] = useState(false)
  const [openParichay, setOpenParichay] = useState(false)

  const handleClose1 = () => {
    setOpenParichay(false)
  }

  useEffect(() => {
    settest(true)
}, [])

  const handleSearch = (e) => {
    // dispatch()
    setSearch(e.target.value)
  }


  const logout =async () => {
   await removeCookie("userData");
    router.push("/")
    // setTimeout(() => {

    //   window.location.pathname = "/urbanregister"
    // }, 1000);
  }
  return (
    test &&  <Box sx={{ flexGrow: 1 }}>
      <Script src="https://himstaging2.hp.gov.in/nodeapi/iframe/sso-iframe.js" defer=""></Script>
      <Box className={style.threeAppBar} >
        <Toolbar style={{minHeight : "50px"}} className={style.mediaToolbar}>
            {/* <div className={style.threeOuter}>
                <div className={style.inputOuter}>
                    <input className={style.input} type='text' placeholder='Search - Keyword, Phrase' value={search} onChange={handleSearch}/>
                    <button className={style.search}>Search</button>
                </div>

            </div> */}
          <Typography component="div" className={style.none} sx={{ flexGrow: 1, marginBottom: 1 ,color :"#813600", fontWeight : "600"}}>
            {/* Himachal Pradesh Panchayati Raj */}
          </Typography>


           <>
            {/* <Typography component="div" className={style.threeRightLogin} style={{borderLeft : "none"}} onClick={() => getIframeSSO('10000080','login','Citizen')} >
          Citizen Login
          </Typography> */}
          <Typography component="a" className={style.threeRightLogin} style={{color : "white"}}
          // href={"https://sso.hp.gov.in/official/site/login?onboardingapp=${process.env.NEXT_PUBLIC_ONBOARDING_APP}"}
              // onClick={() => router.push("/registration")}
              onClick={() => {
                setOpenParichay(true);
              }}
          >
          Officer Login
          </Typography></>
           {/* :
            <Typography component="div" className={style.threeRightLogin} onClick={() => logout() }>
            Logout
           </Typography>
          }  */}





        </Toolbar>
      </Box>
      <ParichayModal open={openParichay} handleClose={handleClose1} />

    </Box>
  )
}

export default HeaderThree
