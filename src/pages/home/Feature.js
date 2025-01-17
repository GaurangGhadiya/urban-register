import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import style from "./home.module.css";
import { getImagePath } from '@/utils/CustomImagePath';


let featureData = [
    {
      image: "/fe1.png",
      title: "Family Registration",
    },
    {
      image: "/ekyc.png",
      title: "Family Member eKYC",
    },
    {
      image: "/copy.jpg",
      title: "Copy of Parivar",
    },
    {
      image: "/family.jpg",
      title: "Update Family",
    },
    {
      image: "/member.png",
      title: "Update Member",
    },
    {
      image: "/rashan.png",
      title: "Update Ration Card",
    },
  ];

const Feature = () => {
  return (
    <div className={style.features}>
          {/* <h1 className={style.feat}>Features</h1> */}

          <Grid container spacing={3}>
              
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
              <Grid container spacing={5}>
                {featureData?.map((v) => (
              <Grid item xs={3} >
                  <div className={style.card}>
                    <div className={style.cardBody}>
                      <div className={style.cardImg}>
                      <Image src={getImagePath(v?.image)} height={100} width={100} style={{borderRadius :"50%"}}/>
                      </div>
                      <h5 className={style.cardTitle}>{v?.title}</h5>
                    </div>
                  </div>
                </Grid>
                 ))}
                
</Grid>

              </Grid>

             
             
            </Grid>
        </div>
  )
}

export default Feature
