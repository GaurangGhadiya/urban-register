'use client';
import MainLayout from '@/layout/MainLayout'
import React, { useState } from 'react'
import style from "./registration.module.css"
import { Box, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';
import AddMember from './AddMember';
import AddParivarRation from './AddParivarRation';
import StepperView from './stepperView';
import { useLoading } from '@/utils/LoadingContext';
import withAuth from '@/utils/withAuth';

const Registration = () => {
   const [state, setState] = useState("1")
   const [stateForNewFlow, setstateForNewFlow] = useState("1")
   const {loading} = useLoading()

   const { t } = useTranslation("translation");

    const [tab, setTab] = useState("1")
    const [withOrWithoutRation, setWithOrWithoutRation] = useState("1")
    // if(loading) return <Box display={"flex"} justifyContent={"center"}><CircularProgress /></Box>

  return (
    <MainLayout>
      {(state =="1" && stateForNewFlow == "1") && <Grid container spacing={5} >
                    <Grid item md={1.5}></Grid>
                    <Grid item xs={12} md={4.5}>
                    <div className={style.card} onClick={() => setTab("1")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="1"} onChange={() => setTab("1")}/></div>
                        <div>{t('addParivar')}</div>
                        <Image src={getImagePath("/family.png")} height={50} width={50} style={{marginLeft : "20px"}} />
                       </div>
                    </div>

                    </Grid>
                    <Grid item xs={12} md={4.5}>
                    <div className={style.card} onClick={() => setTab("2")}>
                       <div className={style.cardBody}>
                       <div><input type="checkbox" className={style.checkbox} checked={tab =="2"} onChange={() => setTab("2")}/></div>
                        <div>{t('addMember')}</div>
                        <Image src={getImagePath("/person.png")} height={50} width={50} style={{marginLeft : "20px"}}/>

                       </div>
                    </div>



                    </Grid>
                    <Grid item md={1.5}></Grid>
                    </Grid>}

                {tab =="1" && state =="1" && stateForNewFlow =="1" &&   <Grid container spacing={5} mt={1} mb={1}>
                    <Grid item md={12} style={{paddingTop : 10}}>
                    <FormControl>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue={withOrWithoutRation}
    onChange={(e) => setWithOrWithoutRation(e.target.value)}
    name="radio-1-group"
row
 >
    <FormControlLabel value="1" control={<Radio />} label="Add Parivar (Using Ration Card)" />
    <FormControlLabel value="2" control={<Radio />} label="Add Parivar (Without Ration Card)" />
  </RadioGroup>
</FormControl>
                    </Grid>
                    </Grid>}


      {tab == "1" && withOrWithoutRation == "1" && <AddParivarRation setState={setstateForNewFlow} state={stateForNewFlow} setWithOrWithoutRation={setWithOrWithoutRation} />}
      {tab == "1" && withOrWithoutRation == "2" && <StepperView withOrWithoutRation={withOrWithoutRation} />}
     {/* {tab == "1" && withOrWithoutRation == "2" && <AddParivar setState={setState} state={state} />} */}
     {tab == "2" && <AddMember setState={setState} state={state} />}

    </MainLayout>
  )
}

export default withAuth(Registration)
// export default Registration
