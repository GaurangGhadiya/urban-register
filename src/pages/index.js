'use client'
import { useEffect, useState } from "react";
import HomePage from "./home";
import { Box } from "@mui/material";
import { getCookieValues } from "@/utils/cookies";
import Dashboard from "./dashboard";

// const NoSSR = dynamic(() => import('./home'), {ssr : false})

export default function Home() {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    getVal()

  }, [])

  const getVal = async () => {
    let getValu = await getCookieValues('userData')
    if (getValu) { setIsAuth(true) }
  }

  if (!isAuth) {
    return <HomePage />
  }

  return (
     <>
      <Box className="backdrop" />
          <div id="iframeContainer" className="iframe-container" style={{height : "90%"}}></div>
      <Dashboard />
    </>
  );
}
