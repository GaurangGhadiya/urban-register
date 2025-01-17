import { useLoading } from '@/utils/LoadingContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from '../registration/AddMemberModal';
import SubmitButton from '@/components/SubmitBtn';
import { MdAdd, MdOutlineSave, MdSearch } from 'react-icons/md';
import { Box, Grid, Typography } from '@mui/material';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import formatDate, { formatDatePiyush } from '@/utils/formatDate';
import MoreBtn from '@/components/MoreBtn';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithSpace, isValidRationCardNumber } from '@/utils/regex';
import { getWard } from '@/network/actions/getWard';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import SelectDropdown from '@/components/SelectDropdown';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { getDistrict } from '@/network/actions/getDistrict';
import { getfamilymember, getfamilymemberSuccess } from '@/network/actions/getfamilymember';
import { getFamilyList, getFamilyListSuccess } from '@/network/actions/getFamilyList';
import { getFamilyById } from '@/network/actions/getFamilyById';
import style from './TransferList.module.css'
import FileUpload from '@/components/FileUpload';
import { getCategory } from '@/network/actions/getCategory';
import { getGender } from '@/network/actions/getGender';
import { getMemberStatus } from '@/network/actions/getMemberStatus';
import { getRelation } from '@/network/actions/getRelation';
import { getQualification } from '@/network/actions/getQualification';
import { getProfession } from '@/network/actions/getProfession';
import { getReligion } from '@/network/actions/getReligion';
import DatePicker from '@/components/DatePicker';
import TextArea from '@/components/TextArea';
import translateToHindi from '@/utils/translate';
import { addfamilymember } from '@/network/actions/addfamilymember';
import toast from 'react-hot-toast';

const AddMemberInFamily = ({selectedFamilyMember}) => {
    const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const route = useRouter()
  const { loading, startLoading, stopLoading } = useLoading();

  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListDataApi = useSelector((state) => state.getFamilyList?.data || null)

  const getFamilyListData = useSelector((state) => state.getFamilyList?.data?.content || [])
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || [])
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
  const getfamilymemberDoc = useSelector((state) => state.getfamilymember?.data?.familyDocData)
  const relationlist = useSelector((state) => state.getRelation?.data)

  const categorylist = useSelector((state) => state.getCategory?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)
  const [isShowForm, setIsShowForm] = useState(true)
  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
  })
  const [formDataMember, setFormDataMember] = useState({
    EnglishName: selectedFamilyMember?.[0]?.M_NameinEnglish ||"",
    hindiName:selectedFamilyMember?.[0]?.M_Name || "",
    relative: "",
    relativeName: "",
    relation: "",
    dob: selectedFamilyMember?.[0]?.['DateofBirth']?.split("-")?.reverse()?.join("-") ? formatDatePiyush(selectedFamilyMember?.[0]?.['DateofBirth'])?.split("-")?.reverse()?.join("-") : '',
    // dob: selectedFamilyMember?.[0]?.['DateofBirth']  || "",
    gender: selectedFamilyMember?.[0]?.Gender ||"",
    registrationBase: "1",
    refrence: "",
    education: selectedFamilyMember?.[0]?.EducationLevel || "",
    work: selectedFamilyMember?.[0]?.Profession ||"",
    category: getFamilyByIdData?.socialCategoryId || "",
    subCategory: getFamilyByIdData?.socialCategory || "",
    rationCard: getFamilyByIdData?.rationCardNo || "",
    religion:selectedFamilyMember?.[0]?.Religion || "",
    adharCard:  selectedFamilyMember?.[0]?.AdharNumber ||"",
    dastavage: "",
    dastavage2: "",
    description: "",
    isEditModeMember : false,
  })
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [memberList, setMemberList] = React.useState([])
  const [isFamilyMore, setIsFamilyMore] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getGender())
    dispatch(getMemberStatus())
    dispatch(getRelation())

    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getReligion())
    // dispatch(getFamilyById(addFamilyData?.id))


  }, [])

  useEffect(() => {
   if(selectedFamilyMember?.length > 0 && getFamilyByIdData?.socialCategoryId) {setFormDataMember({
      EnglishName: selectedFamilyMember?.[0]?.M_NameinEnglish ||"",
      hindiName:selectedFamilyMember?.[0]?.M_Name || "",
      relative: "",
      relativeName: "",
      relation : "",
     dob: selectedFamilyMember?.[0]?.['DateofBirth']?.split("-")?.reverse()?.join("-")  ? formatDatePiyush(selectedFamilyMember?.[0]?.['DateofBirth'])?.split("-")?.reverse()?.join("-") : '',
    //  dob: formatDatePiyush(selectedFamilyMember?.[0]?.['DateofBirth'])?.split("-")?.reverse()?.join("-") ?? '',
      gender: selectedFamilyMember?.[0]?.Gender ||"",
      registrationBase: "1",
      refrence: "",
      education: selectedFamilyMember?.[0]?.EducationLevel || "",
      work: selectedFamilyMember?.[0]?.Profession ||"",
      category: getFamilyByIdData?.socialCategoryId || "",
     subCategory: getFamilyByIdData?.socialCategory || "",
      rationCard: getFamilyByIdData?.rationCardNo || "",
      religion:selectedFamilyMember?.[0]?.Religion || "",
      adharCard:  selectedFamilyMember?.[0]?.AdharNumber ||"",
      dastavage: "",
      dastavage2: "",
      description: "",
      isEditModeMember : false,
    })}
  }, [selectedFamilyMember,getFamilyByIdData])


  useEffect(() => {
    if (selectedFamilyMember?.[0]?.DistLGDCode && !formData?.district){
      dispatch(getMunicipalities({ districtCode: selectedFamilyMember?.[0]?.DistLGDCode?.toString() } , startLoading, stopLoading ))
      setFormData({ ...formData, district: selectedFamilyMember?.[0]?.DistLGDCode })
    }
  }, [selectedFamilyMember])
  useEffect(() => {
    if(selectedFamilyMember?.[0]?.MC && formData?.district){
      dispatch(getWard({ municipalId: selectedFamilyMember?.[0]?.MC }, startLoading, stopLoading ))
      setFormData({...formData, municipal : +selectedFamilyMember?.[0]?.MC })
    }
  }, [formData?.district])
  useEffect(() => {
    if(selectedFamilyMember?.[0]?.WardCode && formData?.municipal){
      setFormData({...formData, ward : +selectedFamilyMember?.[0]?.WardCode})
    }
  }, [formData?.municipal])
  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    // dispatch(getFamilyById(addFamilyData?.id))
    return (() => {
      dispatch(getfamilymemberSuccess([]))
      dispatch(getFamilyListSuccess([]));
      // setData(null)
    })
  }, [])
  useEffect(() => {
    if (getfamilymemberList?.length > 0 ) setMemberList(getfamilymemberList)
  }, [getfamilymemberList])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onFamilyHeadSelect = (e) => {
    dispatch(getfamilymemberSuccess([]))
      dispatch(getFamilyListSuccess([]));
    setSelectedFamilyHead(e.target.value)
    // dispatch(getfamilymember(e.target.value, startLoading, stopLoading))
    if(e.target.value == ""){
      setData(null)
    }
  }

  useEffect(() => {
    if(getFamilyListDataApi?.content?.[0]?.family_id){
      dispatch(getfamilymember(getFamilyListDataApi?.content?.[0]?.family_id,startLoading, stopLoading))
      dispatch(getFamilyById(+getFamilyListDataApi?.content?.[0]?.family_id,startLoading, stopLoading))
    }else{
      dispatch(getfamilymemberSuccess([]))
    //   dispatch(getFamilyListSuccess([]));
    }

  }, [getFamilyListDataApi])
  const handleSearch = () => {
    // if(formData?.district && formData?.municipal && formData?.ward && selectedFamilyHead !=""){
      dispatch(getFamilyList({...formData, searchByParivar : selectedFamilyHead},startLoading, stopLoading))

        // dispatch(getfamilymember(selectedFamilyHead, startLoading, stopLoading))
        // dispatch(getFamilyById(+selectedFamilyHead))

    // }else{
    //   toast.error("Please select all fields")
    // }


      }

      const handleChangeMember = (e) => {
        const { value, name } = e.target
        if (name == "dastavage" || name == "dastavage2") {

          const selectedFile = e.target.files[0];
          if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

              if (selectedFile && selectedFile.size <= 1024 * 1024) {
                setFormDataMember({ ...formDataMember, [name]: e.target.files[0] })
                setErrors({...errors,[name] :"" })
              } else {
                setFormDataMember({ ...formDataMember, [name]: null })

                setErrors({...errors,[name] :"File size must be less than 1MB" })
                // setError('File size must be less than 1MB');
              }
            }else{
              setFormDataMember({ ...formData, [name]: null })

              setErrors({ ...errors, [name]: t('validateFileFormat') })
            }
        } else {

          if(/^[a-zA-Z0-9 ]+$/.test(value) || value == "" ){

            setFormDataMember({ ...formDataMember, [name]: value })

          }else if(name == "dob" || name == "description" || name == "makan"){
            setFormDataMember({ ...formDataMember, [name]: value })
          } else {
            setFormDataMember({ ...formDataMember, [name]: "" })
            toast.error("Special characters are not allowed")
          }

        }
      }

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const viewMoreMember = (index, value) => {
    let newData = memberList?.map((v, i) => index == i ? { ...v, memberDetailsMore: value } : v)
    setMemberList(newData)
  }

  const changeLang = async(name) => {
    if(name){

startLoading()
      const text  = await translateToHindi(name);
      if(text){
        setFormDataMember((prev) => ({...prev,hindiName: text }))
        // return text
        stopLoading()
      }
      stopLoading()
    }else{
      setFormDataMember((prev) => ({...prev,hindiName: "" }))
    }
  }
  const onSave = () => {
    // const validationErrors = {};
    const validationErrors = validateForm(formDataMember);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        "memberName":formDataMember?.EnglishName || "",
"memberNameHin": formDataMember?.hindiName ||  "",
"relativeName": formDataMember?.relative == "other" ? formDataMember?.relativeName : formDataMember?.relative,
"relationId":formDataMember?.relation || 0,
"dateOfBirth":formDataMember?.dob || "",
"genderId": formDataMember?.gender || 0,
"memberStatusId": formDataMember?.registrationBase || "1",
"referenceNo":formDataMember?.refrence || "",
"qualificationId": formDataMember?.education || 0,
"professionId": formDataMember?.work || 0,
"socialCategoryId": formDataMember?.category || 0,
// "socialCategoryId": "1",
"socialSubCategory": formDataMember?.subCategory || "",
"rationCardNo":formDataMember?.rationCard || "",
"religionId": formDataMember?.religion || 0,
"aadhaarNo":formDataMember?.adharCard?.replaceAll(" ", "") || "",
"isHead":false,
"remarks":formDataMember?.description || "",
"familyId":getFamilyByIdData?.family_id,
"himParivarId" : getFamilyByIdData?.himParivarId,
 dastavage: formDataMember?.dastavage || "",
        dastavage2 :  formDataMember?.dastavage2 || "",
        himMemberId: selectedFamilyMember?.[0]?.HimmemberID,

      }
const extra=() => {
  setErrors(null)
  handleSearch()
  setIsShowForm(false)
  route.push('/transferRuralList')

}

      dispatch(addfamilymember(body,extra,startLoading, stopLoading))

    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (formDataMember) => {
    const errors = {};
    if (!formDataMember.EnglishName?.trim()) {
      errors.EnglishName = t("validateHeadName");
    }
    if (!formDataMember.hindiName?.trim()) {
      errors.hindiName = t("validateHeadName");
    }
    if (!formDataMember.relative?.trim()) {
      errors.relative = t("validateRelativeName");
    }
    if (formDataMember.relative == "other" && !formDataMember.relativeName?.trim()) {
      errors.relative = t("validateRelativeName");
    }
    if (!formDataMember.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!formDataMember.gender?.trim() || formDataMember?.gender == "0") {
      errors.gender = t("validateGender")
    }
    // if (!formDataMember.registrationBase?.trim() || formDataMember?.registrationBase == "0") {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
    if (!formDataMember.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    if (!formDataMember.education?.trim() || formDataMember?.education == "0") {
      errors.education = t("validateEducation");
    }
    if (!formDataMember.work || formDataMember?.work == "0") {
      errors.work = t("validateWork");
    }
    if (!formDataMember.category || formDataMember?.category == "0") {
      errors.category = t("validateCategory");
    }
    // if (!formDataMember.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!formDataMember.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    else if (!isValidRationCardNumber(formDataMember.rationCard?.trim())) {
      errors.rationCard = t("validateRationCardValidation");
    }
    if (!formDataMember.religion || formDataMember?.religion == "0") {
      errors.religion = t("validateReligion");
    }
    if (!formDataMember.adharCard) {
      errors.adharCard = t("validateAadhar");
    } else if (formDataMember.adharCard?.trim()?.length < 12) {
      errors.adharCard = t("validateAadharLength");
    }
    if (!formDataMember.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    if (formDataMember?.subCategory && !formDataMember.dastavage2) {
      errors.dastavage2 = t("validateSupportingDocument");
    }
    if (!formDataMember.description) {
      errors.description = t("validateComment");
    }

    return errors;
  };


  return (
   <>
     <Box mt={3}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value }, startLoading, stopLoading)) }}
              requried
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
              requried
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
              requried
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
                        onChange={onFamilyHeadSelect}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
        />
            {/* <SelectDropdown
              title={t('selectHOF')}
              name="hof"
              options={[{ value: "", label: "Select..." }, ...getFamilyListData?.map(v => ({ value: v?.family_id, label: v?.headMemberName + " (" + v?.himParivarId + ")" })) ]}
              value={selectedFamilyHead}
              disabled={formData?.district != "" && formData?.municipal != "" && formData?.ward != "" ? false : true}
              requried
              onChange={onFamilyHeadSelect}
            /> */}
          </Grid>
          <Grid item xs={12} sm={4} md={4} mt={3}>
            <SubmitButton label={"Search"} icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSearch}
            />
          </Grid>
        </Grid>
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Family Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.tablewrapper} style={{ margin: "0" }}>
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
                  <td className={style.td}>{ getFamilyByIdData?.wardName}</td>
                  <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
                  <td className={style.td}>{getFamilyByIdData?.economic}</td>
                  <td className={style.td}>

                    <div className="action">
                        {isFamilyMore ? <CloseBtn title="Close" onClick={() => { setIsFamilyMore(false) }} />
                        :<MoreBtn title="More" onClick={() => { setIsFamilyMore(true) }} /> }

                    </div>
                  </td>
                </tr>
                {isFamilyMore && <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>District:</b> {getFamilyByIdData?.district}</p>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {getFamilyByIdData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>House No.:</b> {getFamilyByIdData?.houseAddress}</p>
                        <p className={style.expandMargin}><b>Declaration Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Consent")?.fileName} target='_' style={{color : "blue"}}>View</a></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Municipal:</b> {getFamilyByIdData?.municipalName}</p>
                        <p className={style.expandMargin}><b>Economic Status:</b> {getFamilyByIdData?.economic}</p>
                        <p className={style.expandMargin}><b>Mobile No.:</b> {getFamilyByIdData?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}</p>
                        {getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName &&<p className={style.expandMargin}><b>Supporting Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}


                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ward:</b> {getFamilyByIdData?.wardName}</p>
                        <p className={style.expandMargin}><b>Category:</b> {getFamilyByIdData?.socialCategory}</p>
                        {getFamilyByIdData?.socialSubCategory &&<p className={style.expandMargin}><b>Sub Category:</b> {getFamilyByIdData?.socialSubCategory}</p>}

                      </Grid>
                    </Grid>
                  </td>
                </tr>}
              </tbody>
            </table>


          </div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Existing Member Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) ?
          <div className={style.tablewrapper} style={{margin : 0}} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Him Member ID	</th>
                  <th className={style.th}>Name	</th>
                  <th className={style.th}>Head of Family	</th>
                  <th className={style.th}>Birth Date	</th>
                  <th className={style.th}>Category	</th>
                  {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                  <th className={style.th}>Aadhaar No.</th>
                  <th className={style.th}>Profession</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>{memberList?.map((v, index) => (
                <>
                <tr className={style.tr}>
                  <td className={style.td}>{v?.himMemberId}	</td>
                  <td className={style.td}>{v?.memberName}	</td>
                  <td className={style.td}>{v?.isHead == "true" ? "Yes" : "No"}	</td>
                  <td className={style.td}>{formatDate(v?.date_of_birth)}</td>
                  <td className={style.td}>{v?.socialCategory}	</td>
                  {/* <td className={style.td}>{v?.socialCategory}</td> */}
                  <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
                  <td className={style.td}>{v?.profession}</td>
                  <td className={style.td}>

                    <div className="action">

                      {v?.memberDetailsMore ? <CloseBtn title="Close" onClick={() => { viewMoreMember(index, false) }} />
                        : <MoreBtn title="More" onClick={() => { viewMoreMember(index, true) }} />}
                    </div>
                  </td>
                </tr>
                {v?.memberDetailsMore && <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Member Name:</b> {v?.memberName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formatDate(v?.date_of_birth)}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {v?.gender}</p>
                        <p className={style.expandMargin}><b>Bonafide Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Bonafide Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>



                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Reference No.:</b> {v?.reference_no}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                        <p className={style.expandMargin}><b>Category:</b> { v?.socialCategory}</p>
                        {getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName && <p className={style.expandMargin}><b>Supporting Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {v?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>Aadhaar No.:</b> {FormatAadharNumber(v?.aadhaarNo)}</p>
                        {v?.socialSubCategory &&<p className={style.expandMargin}><b>Sub Category:</b> {v?.socialSubCategory}</p>}


                      </Grid>
                    </Grid>
                  </td>
                </tr>}
                </>
              ))}




              </tbody>
            </table>


          </div>
          : (getfamilymemberList?.length == 0 && selectedFamilyHead ) ?
            <Typography>No member found in this family</Typography> : ""
        }
 {(getfamilymemberList?.length > 0 && selectedFamilyHead  && isShowForm) &&<div style={{padding : '0px',paddingTop : '0', border : '1px solid lightgray', marginTop : "20px"}}><div className={style.heading} style={{  marginBottom : "0px"}}>New Member Details</div>
<Grid container spacing={3}  mt={0} pt={0} style={{padding : '20px', paddingTop : 0}}>

<Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
      title={t('memberName')}
      subTitle="(in English)"
    // icon={<IoIosDocument size={20} />}
    placeholder=""
    type="text"
    name="EnglishName"
    value={formDataMember?.EnglishName}
    onChange={handleChangeMember}
    onBlur={(e) => changeLang(e.target.value)}
    onKeyDown={(e) => {
      if (!isAlphabateKey(e.key)) {
        e.preventDefault();
      }
    }}
    requried
  />
  {errors?.EnglishName && <p className="error">{errors?.EnglishName}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
      title={t('memberName')}
      disabled
      subTitle="(in Hindi)"
    // icon={<IoIosDocument size={20} />}
    placeholder=""
    type="text"
    name="hindiName"
    value={formDataMember?.hindiName}
    onChange={handleChangeMember}
    requried
  />
  {errors?.hindiName && <p className="error">{errors?.hindiName}</p>}

</Grid>
<Grid item xs={12} sm={8} md={6} >
            <p className={style.title}>{t('nameOfRelative')}<span className="requried"> *</span></p>
           <Grid container spacing={0}>
           <Grid item xs={12} sm={4} >
           <SelectDropdown
                style={{paddingTop : 5.5, paddingBottom : 5.5}}
                name="relation"
                options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formDataMember?.relation}
                onChange={handleChangeMember}
                // requried
              />
           </Grid>
           <Grid item xs={12} sm={4} >
           <SelectDropdown
                style={{paddingTop : 5.5, paddingBottom : 5.5}}
                name="relative"
                options={[...getfamilymemberList?.map(v => ({ value: v?.memberName, label: v?.memberName })), {value:"other", label : "other"}]}

                value={formDataMember?.relative}
                onChange={handleChangeMember}
                // requried
              />
           </Grid>
           {formDataMember?.relative == "other" &&<Grid item xs={12} sm={4} >
           <InputFieldWithIcon
                style={{width : "100%"}}
                type="text"
                name="relativeName"
                placeholder="Enter relative name"

                value={formDataMember?.relativeName}
                onChange={handleChangeMember}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                // requried
              />
           </Grid>}



           </Grid>
              {errors?.relative && <p className="error">{errors?.relative}</p>}

            </Grid>
<Grid item xs={12} sm={4} md={3}>
  <DatePicker
      title={t('dateOfBirth')}
      type="date"
    requried
    name="dob"
    value={formDataMember?.dob}
    onChange={handleChangeMember}
  />
  {errors?.dob && <p className="error">{errors?.dob}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('gender')}
      name="gender"
      options={genderlist?.map(v => ({value : v?.id, label : v?.nameE}))}

    value={formDataMember?.gender}
    onChange={handleChangeMember}
    requried
  />
  {errors?.gender && <p className="error">{errors?.gender}</p>}

</Grid>
{/* <Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('baseOfRegistration')}
      name="registrationBase"
      options={memberStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}

    value={formDataMember?.registrationBase}
    onChange={handleChangeMember}
    requried
  />
  {errors?.registrationBase && <p className="error">{errors?.registrationBase}</p>}

</Grid> */}
<Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
      title={t('refrenceNumber')}
      // icon={<IoIosDocument size={20} />}
    placeholder=""
    type="text"
    name="refrence"
    value={formDataMember?.refrence}
    onChange={handleChangeMember}
    requried
    onKeyDown={(e) => {
      if (!isAlphanumericKey(e.key)) {
        e.preventDefault();
      }
    }}
  />
  {errors?.refrence && <p className="error">{errors?.refrence}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('education')}
      name="education"
      options={qualificationList?.map(v => ({value : v?.id, label : v?.nameE}))}

    value={formDataMember?.education}
    onChange={handleChangeMember}
    requried
  />
  {errors?.education && <p className="error">{errors?.education}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('livelihoodResource')}
      name="work"
      options={profesionList?.map(v => ({value : v?.id, label : v?.nameE}))}

    value={formDataMember?.work}
    onChange={handleChangeMember}
    requried
  />
  {errors?.work && <p className="error">{errors?.work}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('category')}
      name="category"
      options={categorylist?.map(v => ({value : v?.id, label : v?.nameE}))}
    disabled
    value={formDataMember?.category}
    onChange={handleChangeMember}
    requried
  />
  {errors?.category && <p className="error">{errors?.category}</p>}

            </Grid>
            {formDataMember?.category == "2" && <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('tribesCategory')}
                name="subCategory"
                options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
                value={formDataMember?.subCategory}
                onChange={handleChangeMember}
                disabled
              // requried
              />
              {/* {errors?.subCategory && <p className="error">{errors?.subCategory}</p>} */}

            </Grid>}
{/* <Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
      title={t('subCategory')}
    placeholder=""
    type="text"
    name="subCategory"
    value={formDataMember?.subCategory}
    onChange={handleChangeMember}
    onKeyDown={(e) => {
      if (!isAlphabateKey(e.key)) {
        e.preventDefault();
      }
    }}
  />

</Grid> */}
<Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
      title={t('rathinCardNumber')}
      // icon={<IoIosDocument size={20} />}
    placeholder=""
    type="text"
    name="rationCard"
    value={formDataMember?.rationCard}
    onChange={handleChangeMember}
    requried
    disabled
  />
  {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
      title={t('religion')}
      name="religion"
      options={religionList?.map(v => ({value : v?.id, label : v?.nameE}))}
      value={formDataMember?.religion}
    onChange={handleChangeMember}
    requried
  />
  {errors?.religion && <p className="error">{errors?.religion}</p>}

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
    }}   name="adharCard"
    value={formDataMember?.adharCard?.replace(/(\d{4})(?=\d)/g, '$1 ')}
    onChange={(e) => e.target.value?.length > 14 ? null : handleChangeMember(e)}
    requried
  />
  {errors?.adharCard && <p className="error">{errors?.adharCard}</p>}

</Grid>
<Grid item xs={12} sm={4} md={3}>
  <FileUpload
      title={t('document')}
      subTitle="(Bonafide Himachal)"
    requried
    name="dastavage"
    // value={formDataMember?.rationCard}
    onChange={handleChangeMember}
    accept="image/*"

  />
            {formDataMember?.dastavage && <a href={URL.createObjectURL(formDataMember.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

  {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

</Grid>
{formDataMember?.subCategory &&<Grid item xs={12} sm={4} md={3}>
  <FileUpload
      title={t('manifesto')}
      // subTitle="(Bonafide Himachal)"
    requried
    name="dastavage2"
    // value={formDataMember?.rationCard}
    onChange={handleChangeMember}
    accept="image/*"

  />
            {formDataMember?.dastavage2 && <a href={URL.createObjectURL(formDataMember.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

  {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

</Grid>}
<Grid item xs={24} sm={24} md={24}>
  <TextArea
      title={t('comment')}
      placeholder="Text area"
    requried
    name="description"
    value={formDataMember?.description}
    onChange={handleChangeMember}

  />
  {errors?.description && <p className="error">{errors?.description}</p>}

</Grid>


</Grid>
<div className={style.save} style={{marginTop : '0px', marginBottom : '20px'}}>
<SubmitButton label="Save" icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={onSave} />
</div></div>}

        {/* {selectedFamilyHead && getfamilymemberList?.length > 0  && <div style={{ float: "none", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <SubmitButton label="Add Member" icon={<MdAdd size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} onClick={handleClickOpen} />
        </div>} */}
      </Box>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={[]} memberList={{}} getFamilyByIdData={getFamilyByIdData} />
</>
  )
}

export default AddMemberInFamily
