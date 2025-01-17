import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import MainLayout from '@/layout/MainLayout'
import { getparivarnakal, getparivarnakalSuccess } from '@/network/actions/getparivarnakal'
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import style from "./parivarnakal.module.css"
import Image from 'next/image'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import formatDate from '@/utils/formatDate'
import { useRouter } from 'next/router'
import FormatAadharNumber from '@/utils/formatAadharNumber'
import { useLoading } from '@/utils/LoadingContext'
import Loader from '@/utils/Loader'
import { isAlphabateKey, isNumericKeyWithSpace } from '@/utils/regex'
import { MdOutlineFileDownload, MdSearch } from "react-icons/md";
import withAuth from '@/utils/withAuth'
import { getfamilymember } from '@/network/actions/getfamilymember'
import { getFamilyById } from '@/network/actions/getFamilyById'
import SelectDropdown from '@/components/SelectDropdown'


const ParivarNakal = () => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch()
  const router = useRouter()
  const getparivarnakalList = useSelector((state) => state.getparivarnakal?.data)
  const [selectedHOF, setselectedHOF] = useState({})
  const [data, setData] = useState({})
  const [formData, setFormData] = useState({
    ration_card_no: "",
    aadhaar_no: "",
    himparivar_no: ""
  })


  useEffect(() => {
    if (formData?.aadhaar_no || formData?.himparivar_no || formData?.ration_card_no)

      setData(getparivarnakalList)

    if (getparivarnakalList?.length <= 1) {

      setselectedHOF(getparivarnakalList?.[0] || {})
    }
  }, [getparivarnakalList])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    dispatch(getparivarnakalSuccess([]));

    setselectedHOF({})
    setData({})
  }

  const handleSearch = () => {
    if ( formData?.himparivar_no ) {

      dispatch(getparivarnakal({searchByParivar:formData?.himparivar_no}, startLoading, stopLoading))
    } else {
      toast.error("Please fill search data")
    }
  }

  const downloadNakal = () => {
    startLoading()
    let input = document.getElementById("download")
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // Width of A4 size paper
        const pageHeight = 297; // Height of A4 size paper
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('parivar-nakal.pdf');
        stopLoading()
      });

  }


  return (
    <MainLayout>
            <div className={style.heading} style={{ marginBottom: "10px",}}>Parivar Nakal</div>

      <Grid container spacing={3} >
        <Grid item xs={12} sm={5} md={5}>
          <InputFieldWithIcon
            // title={t('rathinCardNumber')}
            title={t('searchByParivarIdorRationNoAadharNo')}
            // icon={<IoIosDocument size={20} />}
            placeholder=""
            type="text"
            name="himparivar_no"
            value={formData?.himparivar_no}
            onChange={handleChange}

          />
        </Grid>
        {getparivarnakalList?.length > 1 && <Grid item xs={12} sm={4} md={4}>
          <SelectDropdown
            title={"Select HOF"}
            name="selectedHof"
            options={getparivarnakalList?.map(v => ({ value: v?.familyId, label: v?.memberName + " (" + v?.himParivarId + ")" })) || []}
            value={formData?.selectedHof}
            onChange={(e) => {
              setselectedHOF(getparivarnakalList?.find(k => k?.familyId == e.target.value));
              dispatch(getfamilymember(e.target.value, startLoading, stopLoading))
              dispatch(getFamilyById(+e.target.value, startLoading, stopLoading))

            }}
          />


        </Grid>}
        {/* <Grid item xs={12} sm={4} md={3}>
          <InputFieldWithIcon
            title={t('rathinCardNumber')}
            // icon={<IoIosDocument size={20} />}
            placeholder=""
            type="text"
            name="ration_card_no"
            value={formData?.ration_card_no}
            onChange={handleChange}

          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <InputFieldWithIcon
            title={t('aadharCardNumber')}
            // icon={<IoIosDocument size={20} />}
            placeholder=""
            type="text"
            onKeyDown={(e) => {
              if (!(isNumericKeyWithSpace(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                e.preventDefault();
              }
            }}
            name="aadhaar_no"
            value={formData?.aadhaar_no?.replace(/(\d{4})(?=\d)/g, '$1 ')}
            onChange={(e) => e.target.value?.length > 14 ? null : handleChange(e)}

          />

        </Grid> */}
        <Grid item xs={12} sm={2} md={2} mt={3}>
          <SubmitButton label={"Search"} icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSearch} />
          {/* {(formData?.aadhaar_no || formData?.himparivar_no || formData?.ration_card_no) && data && Object.keys(data)?.length > 0 &&<SubmitButton label={"Download Nakal"} style={{marginLeft : "10px"}} onClick={downloadNakal}/>} */}
        </Grid>
      </Grid>

      {(formData?.aadhaar_no || formData?.himparivar_no || formData?.ration_card_no) && Object.keys(selectedHOF)?.length > 0  ? <><div className={style.main} id='download'>
        <h6 className={style.top}>Form - 1</h6>
        <h6 className={style.top}>(Rule 3(1)(a))</h6>
        <h6 className={style.top}>Parivar Register</h6>
        <div className={style.data}>
          <div>District: {selectedHOF?.district}</div>
          <div>Municipality: {selectedHOF?.municipalName}</div>
          <div>Ward: {selectedHOF?.wardName}</div>
        </div>
        {/* <div className={style.center}>
    <div>Family No:	{getparivarnakalList?.himParivarId}</div>
  </div>
  <div className={style.center2}>
    <div>Financial status: {getparivarnakalList?.economic}</div>
  </div> */}
        <table className={style.table}>
          <thead>
            <tr className={style.tr}>
              <th className={style.th}>Sr.No.</th>
              <th className={style.th}>House No.</th>
              <th className={style.th}>Name of HOF</th>
              <th className={style.th}>Name</th>
              <th className={style.th}>Relative Name</th>
              <th className={style.th}>Gender</th>
              <th className={style.th}>Birth Date</th>
              <th className={style.th}>Category</th>
              <th className={style.th}>Aadhaar No.</th>
              <th className={style.th}>Occupation</th>
              {/* <th className={style.th}>Education</th> */}
              {/* <th className={style.th}>Reason for entry (with refrence no.) </th> */}
              <th className={style.th}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {selectedHOF?.additionalMembers?.map((v, i) => <tr className={style.tr}>
              <td className={style.td}>{i + 1}</td>
              {i == 0 && <td className={style.td} rowSpan={selectedHOF?.additionalMembers?.length}>{v?.houseAddress}</td>}
              {i == 0 && <td className={style.td} rowSpan={selectedHOF?.additionalMembers?.length}>{v?.memberName}</td>}
              <td className={style.td}>{v?.memberName}</td>
              <td className={style.td}>{v?.relation + " " + v?.relativeName}</td>
              <td className={style.td}>{v?.gender}</td>
              <td className={style.td}>{v?.date_of_birth ? formatDate(v?.date_of_birth) : ""}</td>
              <td className={style.td}>{v?.socialCategory}</td>
              <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
              <td className={style.td}>{v?.profession}</td>
              <td className={style.td}>{v?.remarks}</td>

            </tr>)}

          </tbody>
        </table>
        {/* <Box my={1}>
<h6 className={style.top} style={{fontSize: "14px"}}>Disclaimer: Certified that this copy of parivar register is true as per the parivar register. </h6>

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
      </div><Typography textAlign={"center"} display={"flex"} justifyContent={"center"} mt={3}><SubmitButton label={"Download Nakal"} icon={<MdOutlineFileDownload size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} style={{ marginRight: "10px" }} onClick={downloadNakal} />
          {/* <SubmitButton label={"Check Editing History"} onClick={() => router.push(`/parivarNakal/editing-history?familyId=${getparivarnakalList?.familyId}`)}/> */}
        </Typography></> : <Typography textAlign={"center"} mt={5}></Typography>}
    </MainLayout>
  )
}

// export default ParivarNakal
export default withAuth(ParivarNakal)
