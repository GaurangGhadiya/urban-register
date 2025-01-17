import MainLayout from '@/layout/MainLayout'
import React, { useEffect, useState } from 'react'
import style from "./varification.module.css"
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { getWard } from '@/network/actions/getWard'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import { isAlphanumericKey } from '@/utils/regex'
import SubmitButton from '@/components/SubmitBtn'
import { MdSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useLoading } from '@/utils/LoadingContext'
import { getDistrict } from '@/network/actions/getDistrict'
import { getFamilyList } from '@/network/actions/getFamilyList'
import { PiClockUserBold } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";

import { useRouter } from 'next/router'
import getDefaultData from '@/utils/getDefaultData'
import { getVerificationReport } from '@/network/actions/getVerificationReport'
import withAuth from '@/utils/withAuth'

const Verification = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const route = useRouter()
  // const defaultData = getDefaultData()

  const { loading, startLoading, stopLoading } = useLoading();
  const districtList = useSelector((state) => state.getDistrict?.data)
  const getVerificationReportCount = useSelector((state) => state.getVerificationReport?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyList?.data)
  const [formData, setFormData] = useState({
    district: null,
    municipal: null,
    ward: null,
    status : "pending"
  })
  const [defaultData, setDefaultData] = useState({})

  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      let test = await getDefaultData()
      setDefaultData(test)
    }
    getData()
  }, [])

  useEffect(() => {
    if(defaultData?.district && !formData?.district){
      dispatch(getMunicipalities({ districtCode: defaultData?.district?.toString() } , startLoading, stopLoading ))
      setFormData({...formData, district : defaultData?.district })
    }
  }, [defaultData])
  useEffect(() => {
    if(defaultData?.municipal && formData?.district){
      dispatch(getWard({ municipalId: defaultData?.municipal?.toString() }, startLoading, stopLoading ))
      setFormData({...formData, municipal : defaultData?.municipal })
    }
  }, [formData?.district])
  useEffect(() => {
    if(defaultData?.ward && formData?.municipal){
      setFormData({...formData, ward : defaultData?.ward })
    }
  }, [formData?.municipal])

  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))

  }, [])

  useEffect(() => {
    if (formData?.district && formData?.ward && formData?.municipal) {

      dispatch(getFamilyList({ ...formData, searchByParivar: selectedFamilyHead }, startLoading, stopLoading))
      dispatch(getVerificationReport(formData, startLoading, stopLoading))
    }
  }, [formData])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handlePageChange = (event, value) => {
    setPage(value)
    dispatch(getFamilyList({ ...formData, searchByParivar : selectedFamilyHead, page: value - 1 }, startLoading, stopLoading))

  }

  const handleSearch = () => {
    // if(formData?.district!="" && formData?.municipal!="" && formData?.ward!="" && selectedFamilyHead != null){
    if (formData?.district && formData?.ward && formData?.municipal) {
      dispatch(getFamilyList({ ...formData, searchByParivar: selectedFamilyHead }, startLoading, stopLoading))
    }
    // }else{
    //   toast.error("Please select all fields")
    // }
  }

  return (
    <MainLayout>
           <div className={style.heading} style={{ marginBottom: "10px",}}>Verification Dashboard</div>
           <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value }, startLoading, stopLoading)) }}
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value }, startLoading, stopLoading)) }}
            />

          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectWard')}
              name="ward"
              options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
              value={formData?.ward}
              disabled={formData?.district != "" && formData?.municipal != "" ? false : true}
              onChange={handleChange}
            />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <SelectDropdown
            title={"Pending / Verified"}
            name="status"
            options={[{ value: "pending", label: "Pending" }, { value: "verified", label: "Verified" }] || []}
            value={formData?.status}
            onChange={(e) => { handleChange(e) }}
          />


        </Grid>
          <Grid item xs={12} sm={4} md={4}>
          <InputFieldWithIcon
          title={t('searchByParivarIdorRationNo')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="hof"
          value={selectedFamilyHead}
          disabled={formData?.district != "" && formData?.municipal != ""  && formData?.ward != "" ? false : true}
          requried
                        onChange={(e) => setSelectedFamilyHead(e.target.value)}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
        />

        </Grid>

          <Grid item xs={12} sm={4} md={4} mt={3}>
            <SubmitButton label={"Search"} icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSearch}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={3} md={3}>
            </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Box className={style.main}>
               <div>
               <p className={style.pending} style={{color : "#CC8800"}}>Pending</p>
               <h1 style={{color : "#CC8800"}}>{getVerificationReportCount?.[0]?.pending}</h1>
               </div>
               <PiClockUserBold size={30} color='#CC8800'/>

            </Box>
            </Grid>
          <Grid item xs={12} sm={3} md={3}>
          <Box className={style.main}>
        <div>
        <p className={style.pending} style={{color : "#1B5E20"}}>Verified</p>
        <h1 style={{color : "#1B5E20"}}>{getVerificationReportCount?.[0]?.verified}</h1>
        </div>
        <MdOutlineVerified size={30} color='#1B5E20'/>

            </Box>
            </Grid>
          <Grid item xs={12} sm={3} md={3}>
            </Grid>
          </Grid>

        {getFamilyListData?.content?.length > 0  ? <div className={style.tablewrapper} >
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>Him Parivar No.</th>
                <th className={style.th}>Head of Family	</th>
                <th className={style.th}>Ration No.	</th>
                <th className={style.th}>Total Members	</th>
                {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                <th className={style.th}>District</th>
                <th className={style.th}>Municipal</th>
                <th className={style.th}>Ward	</th>
              </tr>
            </thead>
          <tbody>{getFamilyListData?.content?.filter(k => k?.totalMembers > 0)?.map(v => (
              <tr className={style.tr}>
                <td className={style.td}><div className={style.btns}>
                  <p style={{ color: v?.verifiedBy == null ?"blue" : "", cursor: "pointer" }} onClick={() => {v?.verifiedBy == null ? route.push(`/verification-details?id=${v?.family_id}`) : {}}} >{v?.himParivarId}</p>
                  {/* <VerifyBtn title={"Verify"} onClick={() => { }} /> */}

                </div></td>
                <td className={style.td}>{v?.headMemberName}	</td>
                <td className={style.td}>{v?.rationCardNo}	</td>
                <td className={style.td}>{v?.totalMembers}</td>
                {/* <td className={style.td}>{v?.socialCategory}</td> */}
                <td className={style.td}>{v?.district}</td>
                <td className={style.td}>{v?.municipalName}</td>
                <td className={style.td}>{v?.wardName}	</td>
              </tr>
            ))}




            </tbody>
          </table>


        </div> :  <Box textAlign={"center"} mt={5}>No Family Found</Box>
}
        {getFamilyListData?.content?.length > 0 &&<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography></Typography>

          <Stack spacing={2} >
            <Pagination color="primary" onChange={handlePageChange} count={getFamilyListData?.totalPages} page={page} />

          </Stack>
          <Typography>Total Family: {getFamilyListData?.totalElements}</Typography>
        </Box>}
    </MainLayout>
  )
}

// export default Verification
export default withAuth(Verification)
