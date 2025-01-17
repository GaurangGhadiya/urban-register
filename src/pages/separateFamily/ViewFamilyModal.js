import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getfamilymember } from '@/network/actions/getfamilymember';
import style from "../registration/registration.module.css"
import MoreBtn from '@/components/MoreBtn';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import { Box, Grid } from '@mui/material';
import SubmitButton from '@/components/SubmitBtn';
import formatDate from '@/utils/formatDate';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import toast from 'react-hot-toast';
import SelectDropdown from '@/components/SelectDropdown';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan } from '@/utils/regex';
import FileUpload from '@/components/FileUpload';
import { getDistrict } from '@/network/actions/getDistrict';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { useTranslation } from 'react-i18next';
import { separateMember } from '@/network/actions/separateMember';
import { getFamilyList } from '@/network/actions/getFamilyList';
import TextArea from '@/components/TextArea';
import { useLoading } from '@/utils/LoadingContext';
import { MdClose, MdOutlineSave } from 'react-icons/md';
import { getFamilyById } from '@/network/actions/getFamilyById';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ViewFamilyModal = ({ open, handleClose, viewData , apiData}) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch()
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
      const getfamilymemberDoc = useSelector((state) => state.getfamilymember?.data?.familyDocData)
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || [])
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const [memberList, setMemberList] = React.useState([])
  const [headData, setHeadData] = React.useState({})
  const [isHeadMore, setIsHeadMore] = React.useState(false)
  const [rationCardData, setRationCardData] = React.useState([])
  const [formData, setFormData] = React.useState({})
  const [errors, setErrors] = React.useState({});
  const [originalData, setOriginalData] = React.useState({})
  const [newData, setNewData] = React.useState({})
  const [remarks, setRemarks] = React.useState("")


  React.useEffect(() => {
    if (viewData?.family_id) {
      setOriginalData(viewData)
      setNewData(viewData)
      dispatch(getFamilyById(+viewData?.family_id, startLoading, stopLoading))
    }

  }, [viewData])
  React.useEffect(() => {
    if(newData?.districtCode){
      dispatch(getMunicipalities({ districtCode: viewData?.districtCode },startLoading, stopLoading))
    }
  }, [newData?.districtCode])
  React.useEffect(() => {
    if(newData?.municipalityId){
      dispatch(getWard({ municipalId: viewData?.municipalityId },startLoading, stopLoading))
    }
  }, [newData?.municipalityId])
  React.useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getEconomicStatus())
    dispatch(getCategory())
  }, [])
  // React.useEffect(() => {
  //   if(getfamilymemberList){

  //     let data = [...getfamilymemberList]
  //     let newData = data?.map(v => ({ ...v, isChecked: false, isHead: false }))
  //     setRationCardData(newData)
  //   }
  // }, [])
  React.useEffect(() => {
    if (viewData?.family_id) {

      dispatch(getfamilymember(viewData?.family_id,startLoading, stopLoading))
    }
  }, [viewData])
  React.useEffect(() => {
    if (getfamilymemberList?.length > 0) {
      let data = [...getfamilymemberList]
      let newData = data?.map(v => ({ ...v, isChecked: false, isHead: false }))
      setRationCardData(newData)
      setMemberList(getfamilymemberList?.filter(v => v?.isHead != "true"))
      setHeadData(getfamilymemberList?.find(v => v?.isHead == "true"))
    }
  }, [getfamilymemberList])

  const viewMoreMember = (index, value) => {
    let newData = memberList?.map((v, i) => index == i ? { ...v, memberDetailsMore: value } : v)
    setMemberList(newData)
  }
  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage" || name == "dastavage2") {
      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setNewData({ ...newData, [name]: e.target.files[0] })
        setErrors({ ...errors, [name]: "" })
      } else {
        setNewData({ ...newData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileSize') })
      }
    }else{
      setNewData({ ...formData, [name]: null })

      setErrors({ ...errors, [name]: t('validateFileFormat') })
    }

    } else {
      setNewData({ ...newData, [name]: value })

    }
  }

  const saveAndAddDetails = () => {
    let isChecked = rationCardData.some(v => v.isChecked)
    let isHead = rationCardData.some(v => v.isHead)
    if (!isChecked) {
      toast.error("Please select family member")
    } else if (!isHead) {
      toast.error("Please select head of family")
    } else {
      const extra = () => {
        handleClose()
        setRemarks(null)
        dispatch(getFamilyList(apiData,startLoading, stopLoading))

      }

      let body = {
        AddFamily : {
          "districtCode":newData?.districtCode,
          "houseAddress":newData?.houseAddress,
          "rationCardNo":newData?.rationCardNo,
          "socialSubCategory":newData?.socialSubCategory,
          "wardId":newData?.wardId,
          "socialCategoryId":newData?.socialCategoryId,
          "municipalityId":newData?.municipalityId,
          "bplNumber":newData?.bplNumber,
          "mobileNumber": newData?.mobileNumber?.replace("-", "") || "",
          "active":"true",
          "verifiedBy":"1",
          "economicId":newData?.economicId
          },
          remarks : remarks,
          consentDocName : newData?.dastavage,
          CastDocument : newData?.dastavage2,
          SeparateMembers : {"members":rationCardData?.filter(v => v?.isChecked)?.map(k => +k?.familyMemberId), isHead : rationCardData?.find(v => v?.isHead)?.familyMemberId}

      }

      dispatch(separateMember(body, extra,startLoading, stopLoading))
      // setSelectedFamilyMember(rationCardData?.filter(v => v?.isChecked)?.familyMemberId)
    }

  }
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => {handleClose(); setRemarks(null)}}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >

<IconButton
          aria-label="close"
          onClick={() => {handleClose(); setRemarks(null)}}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
            zIndex: 999
          }}
        >
         <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
         <MdClose color='white' size={18}/>
         </Box>
        </IconButton>
        <DialogContent dividers>
        <div className={style.heading} style={{ marginBottom: "3px" }}>Separate Member </div>

          <Grid container spacing={3} mt={0}>
            {/* left side */}
            {originalData && <Grid item xs={12} sm={6} md={5.8}  >
            <p style={{textAlign : "center" , fontWeight : "bold"}}>Current Family Data</p>

              <Grid container spacing={3} mt={0} >
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('district')}
                    name="district"
                    options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                    value={originalData?.districtCode ?? null}
                    onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading)) }}
                    disabled
                  />
                  {errors?.district && <p className="error">{errors?.district}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('selectVillage')}
                    name="municipal"
                    options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
                    // disabled={formData?.district != "" ? false : true}
                    value={originalData?.municipalityId}
                    onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading)) }}
                    disabled
                  />
                  {errors?.municipal && <p className="error">{errors?.municipal}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('selectWard')}
                    name="ward"
                    // disabled={formData?.district != "" && formData?.municipal != "" ? false : true}

                    options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}

                    value={originalData?.wardId}
                    onChange={handleChange}
                    disabled
                  />
                  {errors?.ward && <p className="error">{errors?.ward}</p>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('houseNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="makan"
                    value={originalData?.houseAddress}
                    onChange={(e) => e.target.value?.length > 10 ? null : handleChange(e)}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled
                  />
                  {errors?.makan && <p className="error">{errors?.makan}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('financialCondition')}
                    name="condition"
                    options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={originalData?.economicId}
                    onChange={handleChange}
                    disabled
                  />
                  {errors?.condition && <p className="error">{errors?.condition}</p>}

                </Grid>
                {formData?.condition == "2" && <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('bplCount')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="number"
                    onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                    name="bpl"
                    value={originalData?.bplNumber}
                    onChange={handleChange}
                    disabled
                  />
                  {errors?.bpl && <p className="error">{errors?.bpl}</p>}

                </Grid>}
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('category')}
                    name="class"
                    options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={originalData?.socialCategoryId}
                    onChange={handleChange}
                    disabled
                  />
                  {errors?.class && <p className="error">{errors?.class}</p>}

                </Grid>
                {originalData?.socialCategoryId == "2" && <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('tribesCategory')}
                    name="subclass"
                    options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
                    value={originalData?.socialSubCategory}
                    onChange={handleChange}
                    disabled
                  // requried
                  />

                </Grid>}
                {/* <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('subCategory')}
                    placeholder=""
                    disabled
                    type="text"
                    name="subclass"
                    value={originalData?.socialSubCategory}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />

                </Grid> */}
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('rathinCardNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="rationCard"
                    value={originalData?.rationCardNo}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled
                  />
                  {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('mobileNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="mobile"
                    value={originalData?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
                    onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
                    onKeyDown={(e) => {
                      if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                        e.preventDefault();
                      }
                    }}                     disabled
                  />
                  {errors?.mobile && <p className="error">{errors?.mobile}</p>}


                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FileUpload
                    title={t('document')}
                    subTitle="(Declaration & Report)"
                    name="dastavage"
                    onChange={handleChange}
                    accept="image/*"
                    disabled
                  />
                  <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Consent")?.fileName} target='_' style={{ marginTop: "3px", fontSize: "14px", float: "right", color: "blue" }}>View Document</a>

                  {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

                </Grid>
                {/* {originalData?.socialSubCategory && <Grid item xs={12} sm={6} md={6}>
                  <FileUpload
                    title={t('manifesto')}
                    name="dastavage2"
                    onChange={handleChange}
                    accept="image/*"
                  />
                                              {originalData?.dastavage2 && <a href={URL.createObjectURL(originalData.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

                  {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

                </Grid>} */}
              </Grid>
            </Grid>}
            <Grid item xs={12} sm={6} md={0.01}  style={{borderRight : "1px solid gray"}}></Grid>
            {/* right side */}
            {newData && <Grid item xs={12} sm={6} md={5.8}  >
              <p style={{textAlign : "center" , fontWeight : "bold"}}>New Family Data</p>
              <Grid container spacing={3} mt={0} >
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('district')}
                    name="districtCode"
                    options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                    value={newData?.districtCode ?? null}
                    onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
requried
                  />
                  {errors?.district && <p className="error">{errors?.district}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('selectVillage')}
                    name="municipalityId"
                    options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
                    disabled={newData?.district != "" ? false : true}
                    value={newData?.municipalityId}
                    onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value })) }}
                    requried
                  />
                  {errors?.municipal && <p className="error">{errors?.municipal}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('selectWard')}
                    name="wardId"
                    disabled={newData?.district != "" && newData?.municipal != "" ? false : true}

                    options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
                    requried
                    value={newData?.wardId}
                    onChange={handleChange}
                  />
                  {errors?.ward && <p className="error">{errors?.ward}</p>}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('houseNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="houseAddress"
                    value={newData?.houseAddress}
                    onChange={(e) => e.target.value?.length > 10 ? null : handleChange(e)}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    requried
                  />
                  {errors?.makan && <p className="error">{errors?.makan}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('financialCondition')}
                    name="economicId"
                    options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={newData?.economicId}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.condition && <p className="error">{errors?.condition}</p>}

                </Grid>
                {formData?.condition == "2" && <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('bplCount')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="number"
                    onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                    name="bplNumber"
                    value={newData?.bplNumber}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.bpl && <p className="error">{errors?.bpl}</p>}

                </Grid>}
                <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('category')}
                    name="socialCategoryId"
                    options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={newData?.socialCategoryId}
                    onChange={handleChange}
                    requried
                  />
                  {errors?.class && <p className="error">{errors?.class}</p>}

                </Grid>
                {newData?.socialCategoryId == "2" && <Grid item xs={12} sm={6} md={6}>
                  <SelectDropdown
                    title={t('tribesCategory')}
                    name="socialSubCategory"
                    options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
                    value={newData?.socialSubCategory}
                    onChange={handleChange}
                  />

                </Grid>}
                {/* <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('subCategory')}
                    placeholder=""
                    type="text"
                    name="socialSubCategory"
                    value={newData?.socialSubCategory}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />

                </Grid> */}
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('rathinCardNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="rationCardNo"
                    value={newData?.rationCardNo}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphanumericKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    requried
                  />
                  {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <InputFieldWithIcon
                    title={t('mobileNumber')}
                    // icon={<IoIosDocument size={20} />}
                    placeholder=""
                    type="text"
                    name="mobileNumber"
                    value={newData?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
                    onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
                    onKeyDown={(e) => {
                      if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                        e.preventDefault();
                      }
                    }}                     requried
                  />
                  {errors?.mobile && <p className="error">{errors?.mobile}</p>}


                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FileUpload
                    title={t('document')}
                    subTitle="(Declaration & Report)"
                    requried
                    name="dastavage"
                    onChange={handleChange}
                    accept="image/*"
                  />
                                              {newData?.dastavage && <a href={URL.createObjectURL(newData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

                  {/* {formData?.dastavage && ( formData.dastavage.type.startsWith('image/') ?   <Image src={URL.createObjectURL(formData?.dastavage)} alt="Uploaded file"  width={250} height={150}
        style={{marginTop: "10px", width : "100%", height : "auto"}}/> :
           <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View File</a>)
} */}

                  {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

                </Grid>
                {/* {newData?.socialSubCategory && <Grid item xs={12} sm={6} md={6}>
                  <FileUpload
                    title={t('manifesto')}
                    requried
                    name="dastavage2"
                    onChange={handleChange}
                    accept="image/*"
                  />
                                              {newData?.dastavage2 && <a href={URL.createObjectURL(newData.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

                  {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

                </Grid>} */}
              </Grid>
            </Grid>}
          </Grid>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div className={style.tablewrapper} style={{ margin: "0" }}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr className={style.tr}>
                      <th className={style.th}>

                      </th>
                      <th className={style.th}>Name</th>
                      <th className={style.th}>Birth Date</th>
                      <th className={style.th}>Aadhaar Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rationCardData?.map(v => <>
                      <tr className={style.tr}>
                        <td className={style.td}>
                          <input type="checkbox" className={style.checkbox} value={v?.isChecked}
                            onChange={(e) => setRationCardData(rationCardData?.map(p => p?.familyMemberId == v?.familyMemberId ? { ...p, isChecked: e.target.checked } : p))}
                          />
                        </td>
                        <td className={style.td}>{v?.memberName}</td>
                        <td className={style.td}>{formatDate(v?.date_of_birth) || "-"}</td>
                        <td className={style.td}>{v?.aadhaarNo ? FormatAadharNumber(v?.aadhaarNo) : "-"}</td>

                      </tr>
                    </>)}

                  </tbody>
                </table>


              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div className={style.tablewrapper} style={{ margin: "0" }}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr className={style.tr}>
                      <th className={style.th}>Name</th>
                      <th className={style.th}>Birth Date</th>
                      <th className={style.th}>Aadhaar Number</th>
                      <th className={style.th}>HOF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rationCardData?.filter(k => k?.isChecked)?.map(v => <>
                      <tr className={style.tr}>
                        <td className={style.td}>{v?.memberName}</td>
                        <td className={style.td}>{formatDate(v?.date_of_birth) || "-"}</td>
                        <td className={style.td}>{v?.aadhaarNo ? FormatAadharNumber(v?.aadhaarNo) : "-"}</td>
                        <td className={style.td}>
                          <input type="radio"
                            checked={v?.isHead}
                            name='head' className={style.checkbox}
                            onChange={(e) => setRationCardData(rationCardData?.map(p => p?.memberName == v?.memberName ? { ...p, isHead: e.target.checked } : p))}
                          />
                        </td>

                      </tr>
                    </>)}

                  </tbody>
                </table>


              </div>
            </Grid>
           <Box ml={3} mt={3} width={"100%"}>
           <TextArea
    title={t('comment')}
    placeholder="Text area"
    style={{width : "100%"}}

    name="description"
    value={remarks}
    onChange={(e) => setRemarks(e.target.value)}

  />
           </Box>
            <div className={style.save} style={{ textAlign: "center", width: "100%" }}>
              <SubmitButton onClick={() => {handleClose(); setRemarks(null)}} label="Cancel" icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}} />} type ="cancel"/>

              <SubmitButton label="Save" style={{ marginLeft: "10px" }} icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}} />} onClick={() => saveAndAddDetails()} />
              {/* <SubmitButton label={t('proceedToAddFamily')} onClick={() => saveAndAddDetails()} /> */}
            </div>
          </Grid>


        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ViewFamilyModal