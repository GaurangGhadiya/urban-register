import Layout from '@/layout'
import React from 'react'
import style from "./addVerify.module.css"
import { Grid } from '@mui/material'
import withAuth from '@/utils/withAuth'

const AddVerify = () => {
  return (
    <Layout>
        <div className={style.outer}>
           <div className={style.headline}>
           <strong><p>Note(नोट):- Click on any of the buttons below to proceed with your task. (अपने कार्य को आगे बढ़ाने के लिए नीचे दिए गए किसी भी बटन पर क्लिक करें।)</p></strong>

           </div>

           <Grid container spacing={3} mt={3}>
           <Grid item xs={2} ></Grid>
              <Grid item xs={4} >
                <div className={style.card}>

                <h3 className={style.cardHeader}>
                    <b>e-Parivar</b>
                </h3>
                <div className={style.cardBody}>
                    <p className={style.title}>Open e-Parivar</p>
                    <p className={style.subTitle}>(इ-परिवार खोलें)</p>
                </div>
                </div>
                </Grid>
              <Grid item xs={4} >
                <div className={style.card}>
                <div className={style.cardHeader}></div>

                    <div className={style.cardBody}></div>
                    
                </div>
                </Grid>
                <Grid item xs={2} ></Grid>

                </Grid>
        </div>
    </Layout>
  )
}

// export default AddVerify
export default withAuth(AddVerify)

