import React, { useEffect, useState } from 'react'
import style from './home.module.css'
import { Grid } from '@mui/material'
import Image from 'next/image'
import { getImagePath } from '@/utils/CustomImagePath';
import { useDispatch, useSelector } from 'react-redux';
import { getSurvayAnalysis } from '@/network/actions/survayAnaysis';

let featureData = [
    {
        image: "/family.png",
        title: "Total Families (Survay Conducted)",
        count: "7625K",
        // desc: "The BOCW Act, 1996",
        color: "#F99F45"
    },
    {
        image: "/fe1.png",
        title: "Member Surveyed",
        count: "223.80K",
        // desc: "The BOCW Act, 1996",
        color: "#2092EC"
    },
    {
        image: "/a2.png",
        title: "Active MC/NP",
        count: "3912.41K",
        // desc: "The BOCW Act, 1996",
        color: "#8F30C2"
    },
    {
        image: "/v2.png",
        title: "Total Verified Family",
        count: "19.47K",
        // desc: "The BOCW Act, 1996",
        color: "#3E8EFB",
        last: true
    }
];
const Counting = () => {
    const [count, setCount] = useState([])
    const dispatch = useDispatch()
    const data = useSelector(state => state.survayAnalysis?.data?.data)
    useEffect(() => {
      dispatch(getSurvayAnalysis())
    }, [])
    useEffect(() => {
      let arr = [
        {
            image: "/family.png",
            title: "Total Families (Survay Conducted)",
            count: data?.surveyInfoList?.[0]?.headerValueCount,
            // desc: "The BOCW Act, 1996",
            color: "#F99F45"
        },
        {
            image: "/fe1.png",
            title: "Member Surveyed",
            count: data?.surveyInfoList?.[1]?.headerValueCount,
            // desc: "The BOCW Act, 1996",
            color: "#2092EC"
        },
        {
            image: "/a2.png",
            title: "Active MC/NP",
            count: data?.surveyInfoList?.[2]?.headerValueCount,
            // desc: "The BOCW Act, 1996",
            color: "#8F30C2"
        },
        {
            image: "/v2.png",
            title: "Total Verified Family",
            count: data?.verificationInfoList?.[1]?.headerValueCount,
            // desc: "The BOCW Act, 1996",
            color: "#3E8EFB",
            last: true
        }
      ]
      setCount(arr)
    }, [data])
    
  return (
    <div className={style.countingMain}>
                    <h3 className={style.services} style={{paddingTop : 0}}>Survey Analysis</h3>

            <Grid container spacing={3} mb={5}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={3}>
                        {count?.map(v => (
                            <Grid item xs={12} sm={4} md={3}>
                            <div className={v?.last ?style.countingCard1 :style.countingCard}>
                                <div className={style.countingCardBody}>
                                    <div className={style.countingCardImg}>
                                    <Image src={getImagePath(v?.image)} height={70} width={70} />
                                    <h3 className={style.countingCardCount} style={{color : v?.color}}>{v?.count}</h3>
                                    </div>
                                    <h3 className={style.countingCardTitle}>{v?.title}</h3>
                                    <p className={style.countingCardDesc}>{v?.desc}</p>
                                </div>
                            </div>
                        </Grid>
                        ))}
                        
                    </Grid>
                </Grid>

                <Grid item xs={1}></Grid>


            </Grid>
    </div>
  )
}

export default Counting
