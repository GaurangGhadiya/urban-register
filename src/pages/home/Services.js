import React from 'react'
import style from './home.module.css'
import { Grid } from '@mui/material';
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';

let featureData = [
    {
        image: "/fe1.png",
        title: "Family Registration",
        desc : "Registration & Updation of family as per Urban Development Department rules."
    },
    {
        image: "/ekyc.png",
        title: "Family Member eKYC",
        desc : "Varification of member using Aadhaar eKYC."
    },
    {
        image: "/copy.png",
        title: "Copy of Parivar",
        desc : "Get digital copy of parivar with all the verifyed members."
    },
    {
        image: "/family.png",
        title: "Update Family",
        desc : "Updation of family and members on real time basis."
    },
    {
        image: "/m5.png",
        title: "Migrate Family",
        desc : "Migrate family with in any Urban Development Department jurisdiction."
    },
    {
        image: "/rashan.png",
        title: "Update Ration Card",
        desc : "Verify ration card on the basis of PDS records."
    },
    {
        image: "/dashboard2.png",
        title: "Dashboard & Reports",
        desc : "Easily download reports."
    },
    {
        image: "/login.png",
        title: "Him access Enabled",
        desc : "Easy login with Him access."
    },
];

const Services = () => {
    return (
        <>
            <h2 className={style.services} >Our Services</h2>
            <Grid container spacing={3} mb={5}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={3}>
                        {featureData?.map(v => (
                            <Grid item xs={12} sm={4} md={3}>
                            <div className={style.serviceCard}>
                                <div className={style.serviceCardBody}>
                                    <Image src={getImagePath(v?.image)} height={80} width={80} />
                                    <h3 className={style.serviceCardTitle}>{v?.title}</h3>
                                    <p className={style.serviceCardDesc}>{v?.desc}</p>
                                </div>
                            </div>
                        </Grid>
                        ))}
                        
                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>
        </>
    )
}

export default Services
