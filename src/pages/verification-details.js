import MainLayout from '@/layout/MainLayout'
import React, { useEffect, useState } from 'react'
import style from "./verification/varification.module.css"
import styleNakal from "./parivarNakal/parivarnakal.module.css"
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useLoading } from '@/utils/LoadingContext';
import { getFamilyById } from '@/network/actions/getFamilyById';
import MoreBtn from '@/components/MoreBtn';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import { Box, Grid, Typography } from '@mui/material';
import { getparivarnakal } from '@/network/actions/getparivarnakal';
import { MdEdit, MdEditNote, MdOutlineFileDownload, MdRotateLeft, MdRotateRight, MdVerified } from 'react-icons/md';
import SubmitButton from '@/components/SubmitBtn';
import formatDate from '@/utils/formatDate';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import Image from 'next/image';
import { getFamilyUpdationList } from '@/network/actions/getFamilyUpdationList';
import toast from 'react-hot-toast';
import VerifyConfirmation from '@/components/Dialogs/Verify';
import { getCookieValues } from '@/utils/cookies';
import { VerifyFamily } from '@/network/actions/VerifyFamily';

const VerificationDetails = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const route = useRouter()
  const { loading, startLoading, stopLoading } = useLoading();
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || {})
  const getparivarnakalList = useSelector((state) => state.getparivarnakal?.data?.[0])
  const getFamilyUpdationListData = useSelector((state) => state.getFamilyUpdationList?.data || [])

  const [isFamilyMore, setIsFamilyMore] = React.useState(false)
  const [openVerify, setOpenVerify] = useState(false)
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (route?.query?.id) {
      dispatch(getFamilyById(+route?.query?.id, startLoading, stopLoading))
      dispatch(getFamilyUpdationList({family_id : route?.query?.id}, route))
    }
  }, [route])


  useEffect(() => {
    if (getFamilyByIdData?.himParivarId) dispatch(getparivarnakal({ searchByParivar: getFamilyByIdData?.himParivarId }, startLoading, stopLoading))
  }, [getFamilyByIdData?.himParivarId])

  const openModalVerify = () => {
    setOpenVerify(true)
  }
  const closeModalVerify = () => {
    setOpenVerify(false)
    setRemarks("")
  }

  const handleVerify =async () => {
    if(remarks){
      const userData = await getCookieValues("userData") || null
      const body = {
        user_id : userData?.user_id || 0,
        family_id : route?.query?.id || 0
      }
      const extra = () => {
        closeModalVerify()
        setRemarks("")
        route.push("/verification")
      }
dispatch(VerifyFamily(body, extra))

    }else {
      toast.error("Please enter remark")
    }
  }


  return (
    <MainLayout>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Family Details</div>
      <div className={style.tablewrapper} style={{ margin: "0" }}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>

              <th className={style.th}>Him Parivar No.</th>
              <th className={style.th}>District</th>
              <th className={style.th}>Municipal</th>
              <th className={style.th}>Ward</th>
              <th className={style.th}>Ration Card No.</th>
              <th className={style.th}>Economic Status</th>
              <th className={style.th}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={style.tr}>
              <td className={style.td}>{getFamilyByIdData?.himParivarId}</td>
              <td className={style.td}>{getFamilyByIdData?.district}</td>
              <td className={style.td}>{getFamilyByIdData?.municipalName}</td>
              <td className={style.td}>{getFamilyByIdData?.wardName}</td>
              <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
              <td className={style.td}>{getFamilyByIdData?.economic}</td>
              <td className={style.td}>

                <div className="action">
                  {isFamilyMore ? <CloseBtn title="Close" onClick={() => { setIsFamilyMore(false) }} />
                    : <MoreBtn title="More" onClick={() => { setIsFamilyMore(true) }} />}

                </div>
              </td>
            </tr>
            {isFamilyMore && <tr  >
              <td colspan="12" style={{ padding: "20px 20px 0 20px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>District:</b> {getFamilyByIdData?.district}</p>
                    <p className={style.expandMargin}><b>Ration Card No.:</b> {getFamilyByIdData?.rationCardNo}</p>

                    <p className={style.expandMargin}><b>House No.:</b> {getFamilyByIdData?.houseAddress}</p>
                    {getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName && <p className={style.expandMargin}><b>Supporting Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName} target='_' style={{ color: "blue" }}>View</a></p>}

                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Municipal:</b> {getFamilyByIdData?.municipalName}</p>
                    <p className={style.expandMargin}><b>Economic Status:</b> {getFamilyByIdData?.economic}</p>

                    <p className={style.expandMargin}><b>Declaration Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Consent")?.fileName} target='_' style={{ color: "blue" }}>View</a></p>
                    {/* <p className={style.expandMargin}><b>Total Members:</b> {getFamilyByIdData?.totalMembers}</p> */}


                  </Grid>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>Ward:</b> {getFamilyByIdData?.wardName}</p>
                    <p className={style.expandMargin}><b>Category:</b> {getFamilyByIdData?.socialCategory}</p>
                    {getFamilyByIdData?.socialSubCategory && <p className={style.expandMargin}><b>Sub Category:</b> {getFamilyByIdData?.socialSubCategory}</p>}

                  </Grid>
                </Grid>
              </td>
            </tr>}
          </tbody>
        </table>


      </div>

      <div className={styleNakal.heading} style={{ marginBottom: "5px", marginTop: '20px' }}>Parivar Nakal</div>
      <><div className={styleNakal.main} style={{ marginTop: "7px" }} id='download'>
        <h6 className={styleNakal.top}>Form - 1</h6>
        <h6 className={styleNakal.top}>(Rule 3(1)(a))</h6>
        <h6 className={styleNakal.top}>Parivar Register</h6>
        <div className={styleNakal.data}>
          <div>District: {getparivarnakalList?.district}</div>
          <div>Municipality: {getparivarnakalList?.municipalName}</div>
          <div>Ward: {getparivarnakalList?.wardName}</div>
        </div>
        {/* <div className={styleNakal.center}>
    <div>Family No:	{getparivarnakalList?.himParivarId}</div>
  </div>
  <div className={styleNakal.center2}>
    <div>Financial status: {getparivarnakalList?.economic}</div>
  </div> */}
        <table className={styleNakal.table}>
          <thead>
            <tr className={styleNakal.tr}>
              <th className={styleNakal.th}>Sr.No.</th>
              <th className={styleNakal.th}>House No.</th>
              <th className={styleNakal.th}>Name of HOF</th>
              <th className={styleNakal.th}>Name</th>
              <th className={styleNakal.th}>Relative Name</th>
              <th className={styleNakal.th}>Gender</th>
              <th className={styleNakal.th}>Birth Date</th>
              <th className={styleNakal.th}>Category</th>
              <th className={styleNakal.th}>Aadhaar No.</th>
              <th className={styleNakal.th}>Occupation</th>
              {/* <th className={styleNakal.th}>Education</th> */}
              {/* <th className={styleNakal.th}>Reason for entry (with refrence no.) </th> */}
              <th className={styleNakal.th}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {getparivarnakalList?.additionalMembers?.map((v, i) => <tr className={styleNakal.tr}>
              <td className={styleNakal.td}>{i + 1}</td>
              {i == 0 && <td className={styleNakal.td} rowSpan={getparivarnakalList?.additionalMembers?.length}>{v?.houseAddress}</td>}
              {i == 0 && <td className={styleNakal.td} rowSpan={getparivarnakalList?.additionalMembers?.length}>{v?.memberName}</td>}
              <td className={styleNakal.td}>{v?.memberName}</td>
              <td className={styleNakal.td}>{v?.relation + " " + v?.relativeName}</td>
              <td className={styleNakal.td}>{v?.gender}</td>
              <td className={styleNakal.td}>{v?.date_of_birth ? formatDate(v?.date_of_birth) : ""}</td>
              <td className={styleNakal.td}>{v?.socialCategory}</td>
              <td className={styleNakal.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
              <td className={styleNakal.td}>{v?.profession}</td>
              <td className={styleNakal.td}>{v?.remarks}</td>

            </tr>)}

          </tbody>
        </table>
        {/* <Box my={1}>
<h6 className={styleNakal.top} style={{fontSize: "14px"}}>Disclaimer: Certified that this copy of parivar register is true as per the parivar register. </h6>

</Box> */}
        <Box display={"flex"} justifyContent={"space-between"} my={2}>
          <Box textAlign={"left"} mt={2}>
            <Image src="" height={70} width={250} />
            <div style={{ fontSize: "14px" }}>Signature of Secretary of the Ward Committee</div>




          </Box>
          <Box textAlign={"right"} mt={2}>
            <Image src="" height={70} width={250} />
            <div style={{ fontSize: "14px" }}>Signature of the Verifying Officer </div>




          </Box>
        </Box>
      </div>
        {/* <Typography textAlign={"center"} display={"flex"} justifyContent={"center"} mt={3}><SubmitButton label={"Download Nakal"} icon={<MdOutlineFileDownload size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} style={{ marginRight: "10px" }} />
        </Typography> */}
        </>
<Box textAlign={"center"} mt={2} display={"flex"} justifyContent={"center"}>
{getFamilyUpdationListData?.length > 0 ? <SubmitButton label={"Check Editing History"} icon={<MdRotateLeft size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} onClick={() => route.push(`/parivarNakal/editing-history?familyId=${route.query?.id}`)} />:
<SubmitButton label={"Verify Changes"} icon={<MdVerified size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} onClick={openModalVerify}/>}

</Box>
<VerifyConfirmation open={openVerify} onCancle={closeModalVerify} onSubmit={handleVerify} remarks={remarks} setRemarks={setRemarks}/>

    </MainLayout>
  )
}

export default VerificationDetails
