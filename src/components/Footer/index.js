import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <AppBar
        style={{position: "relative", background: "#813600" }}
        // position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography align="center" style={{ fontSize: 16, flex: 1,margin : 0 }} mb={3}>
            Site designed, developed & hosted by Department of Digital
            Technologies & Governance, Himachal Pradesh
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
