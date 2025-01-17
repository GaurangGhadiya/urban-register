'use client';
import MainLayout from '@/layout/MainLayout'
import { verifyToken } from '@/network/actions/verityToken';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './dashboard.module.css'
import { MdFamilyRestroom, MdOutlineTransferWithinAStation, MdOutlineVerified, MdSafetyDivider } from 'react-icons/md';
import { PiClockUserBold } from 'react-icons/pi';
import { FaPeopleArrows } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import withAuth from '@/utils/withAuth';
import getDefaultData from '@/utils/getDefaultData';
import { dashboardCount } from '@/network/actions/dashboardCount';
import { useLoading } from '@/utils/LoadingContext';
import { getGenderReport } from '@/network/actions/getGenderReport';
import Chart5 from './Chart5';
import { getCookieValues } from '@/utils/cookies';

const Dashboard = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('token')
  // const defaultData = getDefaultData()
  const { loading, startLoading, stopLoading } = useLoading();

  const dashboardCountData = useSelector(store => store.dashboardCount.data?.[0])
  const getGenderReportData = useSelector(store => store.getGenderReport.data)
  const [defaultData, setDefaultData] = useState({})


  useEffect(() => {
    const getData = async () => {
      let test = await getDefaultData()
      setDefaultData(test)
    }
    getData()
  }, [])
  const validateToken = async () => {
    let body = {
      token: search || "",
      secret_key: process.env.NEXT_PUBLIC_SECRET_KEY,
      service_id: process.env.NEXT_PUBLIC_SERVICE_ID
    }
    if (search) {
      dispatch(verifyToken(body, router))

    }
  }
  useLayoutEffect(() => {

    validateToken()
  }, [search]);

  const getcounts = async () => {
    let cookiesData = await getCookieValues("userData")
    if (cookiesData) {

      let body = {
        district_id: cookiesData?.district_code?.toString(),
        ward_id: cookiesData?.ward_id?.toString(), municipality_id: cookiesData?.municipality_id?.toString()
      }
      dispatch(dashboardCount(body, startLoading, stopLoading))
    }
  }

  useEffect(() => {
    getcounts()
  }, [])


  return (
    <MainLayout>
      <Grid container spacing={3}>
        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#c280d2' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.totalFamilies || 0}</div>
                  <div className={styles.countTitle}>Total Families</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(194, 128, 210, .19) 7.29%, rgba(194, 128, 210, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <MdFamilyRestroom color='#c280d2' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#43b9b2' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.verified || 0}</div>
                  <div className={styles.countTitle}> Verified Families</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(67, 185, 178, .19) 7.29%, rgba(67, 185, 178, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <MdOutlineVerified color='#43b9b2' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#F8285A' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.pending || 0}</div>
                  <div className={styles.countTitle}> Pending Families</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(255, 238, 243, 1) 7.29%, rgba(67, 185, 178, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <PiClockUserBold color='#F8285A' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#fd7e40' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.totalMembers || 0}</div>
                  <div className={styles.countTitle}>Total Members</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(253, 126, 64, .19) 7.29%, rgba(253, 126, 64, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <FaPeopleGroup color='#fd7e40' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#c280d2' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.totalTransfered || 0}</div>
                  <div className={styles.countTitle}>Total Transferred Members</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(194, 128, 210, .19) 7.29%, rgba(194, 128, 210, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <MdOutlineTransferWithinAStation color='#c280d2' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sx={12} sm={4} >
          <div className={styles.card} style={{ borderColor: '#43b9b2' }}>
            <div className={styles.cardBody}>
              <div className={styles.contant}>
                <div>
                  <div className={styles.count}>{dashboardCountData?.totalSeparated || 0}</div>
                  <div className={styles.countTitle}>Total Separate Families</div>
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(67, 185, 178, .19) 7.29%, rgba(67, 185, 178, 0))',
                  padding: '10px', borderRadius: '5px'

                }}>
                  <FaPeopleArrows color='#43b9b2' size={28} />

                </div>
              </div>
            </div>
          </div>
        </Grid>


      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item sx={12} md={4}>
          <div className={styles.card} >
            <div className={styles.cardBody}>

              <Chart5 dashboardCountData={dashboardCountData} />
            </div>
          </div>
        </Grid>
        <Grid item sx={12} md={4}>
          <div className={styles.card} >
            <div className={styles.cardBody}>

              <Chart2 dashboardCountData={dashboardCountData} />
            </div>
          </div>
        </Grid>
        <Grid item sx={12} md={4}>
          <div className={styles.card} >
            <div className={styles.cardBody}>

              <Chart3 dashboardCountData={dashboardCountData} />
            </div>
          </div>
        </Grid>
        <Grid item sx={12} md={6}>
          <div className={styles.card} >
            <div className={styles.cardBody}>

              <Chart4 dashboardCountData={dashboardCountData}/>
            </div>
          </div>
        </Grid>
        <Grid item sx={12} md={6}>
          <div className={styles.card} >
            <div className={styles.cardBody}>

              <Chart1 getGenderReportData={dashboardCountData} />
            </div>
          </div>
        </Grid>
      </Grid>

    </MainLayout>
  )
}

// export default Dashboard
export default withAuth(Dashboard)
