import { Backdrop, Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => 999999999999 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"85vh"}><CircularProgress /></Box> */}
    </>
  )
}

export default Loader
