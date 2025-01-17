import React, { useEffect, useState } from 'react'
import style from "./registration.module.css"
import { Grid } from '@mui/material'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { useTranslation } from 'next-i18next'
import MoreBtn from '@/components/MoreBtn'
import EditBtn from '@/components/EditBtn'
import EditFamilyConfirmation from './EditFamilyConfirmation'
import { useRouter } from 'next/router'
import AddMemberModal from './AddMemberModal'
import CloseBtn from '@/components/MoreBtn/CloseBtn'
import SaveBtn from '@/components/MoreBtn/SaveBtn'
import DeleteBtn from '@/components/MoreBtn/DeleteBtn'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '@/network/actions/getDistrict'
import { getWard } from '@/network/actions/getWard'
import { getEconomicStatus } from '@/network/actions/economicStatus'
import { getCategory } from '@/network/actions/getCategory'
import { getGender } from '@/network/actions/getGender'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getReligion } from '@/network/actions/getReligion'
import translateToHindi from '@/utils/translate'
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan, isNumericKeyWithSpace, isValidRationCardNumber } from '@/utils/regex'
import { getFamilyById } from '@/network/actions/getFamilyById'
import { getRelation } from '@/network/actions/getRelation'
import { addfamilymember } from '@/network/actions/addfamilymember'
import { getfamilymember } from '@/network/actions/getfamilymember'
import { updateFamily } from '@/network/actions/updateFamily'
import { updateFamilyMember } from '@/network/actions/updateFamilyMember'
import formatDate from '@/utils/formatDate'
import { isValidMobileNumber } from '@/utils/formatAadharNumber'
import { useLoading } from '@/utils/LoadingContext'
import toast from 'react-hot-toast'




const AddHOF = ({ setState, familyDetails, setFamilyDetails }) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const relationlist = useSelector((state) => state.getRelation?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData)
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])
  const [familyDetailsExtra, setFamilyDetailsExtra] = useState()
  const [headDetailsExtra, setheadDetailsExtra] = useState()
  const [memberDetailsExtra, setMemberDetailsExtra] = useState({})
  const [confirmationData, setConfirmationData] = useState({})
  const [EditModalType, setEditModalType] = useState(null) // family, head, member
  const [saveHof, setSaveHof] = useState(false)
  const [memberList, setMemberList] = useState([])
  const [openModal, setOpenModal] = React.useState(false);
  const [familyDetailsMore, setFamilyDetailsMore] = useState(false)
  const [headDetailsMore, setHeadDetailsMore] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isEditModeHead, setisEditModeHead] = useState(false)
  const [nameTitle, setNameTitle] = useState({})
  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getEconomicStatus())
    dispatch(getCategory())
    dispatch(getGender())
    dispatch(getRelation())
    dispatch(getMemberStatus())
    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getReligion())
  }, [])


  const [formData, setFormData] = useState({
    EnglishName: "",
    hindiName: "",
    relation : "",
    relative: "",
    dob: "",
    gender: "",
    registrationBase: "",
    refrence: "",
    education: "",
    work: "",
    category: familyDetails?.class || "",
    subCategory: "",
    rationCard: familyDetails?.rationCard ||"",
    religion: "",
    adharCard: "",
    dastavage: "",
    description: ""
  })


  useEffect(() => {
    if(addFamilyData?.id){

      dispatch(getFamilyById(addFamilyData?.id))
      dispatch(getfamilymember(addFamilyData?.id,startLoading, stopLoading))
    }

  }, [addFamilyData])

  useEffect(() => {
    if(getfamilymemberList?.length > 0){
setSaveHof(true)
      setMemberList(getfamilymemberList?.filter(v => v?.isHead != "true"))
      setFormData(getfamilymemberList?.find(v => v?.isHead == "true"))
    }else{setSaveHof(false)
      setMemberList([])
      setFormData({rationCard: getFamilyByIdData?.rationCardNo,category: getFamilyByIdData?.socialCategoryId})
    }
    // return () => { setFormData({})
    // setMemberList([])}

  }, [getfamilymemberList])



  useEffect(() => {
    setNameTitle({
      municipal: municipalList?.find(v => v?.id == familyDetails?.municipal)?.name,

      ward: wardList?.find(v => v?.id == familyDetails?.ward)?.name,
      condition: economicStatusList?.find(v => v?.id == familyDetails?.condition)?.nameE,
      class: categorylist?.find(v => v?.id == familyDetails?.class)?.nameE
    })
  }, [familyDetails])
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {

if(getFamilyByIdData){

  setFormData({...formData, rationCard: getFamilyByIdData?.rationCardNo,category: getFamilyByIdData?.socialCategoryId})
}
  }, [getFamilyByIdData])

  const [errors, setErrors] = useState({});
  const [familyError, setFamilyError] = useState({})
  const [headError, setHeadError] = useState({})
  const [memberError, setMemberError] = useState({})

  const changeLang = async(name) => {
    if(name){

      const text  = await translateToHindi(name);
      if(text){

        setFormData({ ...formData, hindiName: text })
        // return text
      }
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target


    if (name == "dastavage") {

      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFormData({ ...formData, [name]: e.target.files[0] })
        setErrors({ ...errors, dastavage: "" })
      } else {
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, dastavage: t('validateFileSize') })
        // setError('File size must be less than 1MB');
      }
    }else{
      setFormData({ ...formData, [name]: null })

      setErrors({ ...errors, [name]: t('validateFileFormat') })
    }

    } else {
      if(/^[a-zA-Z0-9 ]+$/.test(value) || value == "" ){

        setFormData({ ...formData, [name]: value })

      } else if (name == "dob" || name == "description" || name == "makan"){
        setFormData({ ...formData, [name]: value })
      } else {
        setFormData({ ...formData, [name]: "" })
        toast.error("Special characters are not allowed")
      }
    }
  }
  const handleChangeFamilyDetails = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: e.target.files[0] })
        // setErrors({ ...errors, dastavage: "" })
      } else {
        setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: null })

        // setErrors({ ...errors, dastavage: t('validateFileSize') })
        // setError('File size must be less than 1MB');
      }
    } else {

      setFamilyDetailsExtra({ ...familyDetailsExtra, [name]: value })
    }
  }
  const handleChangeHeadDetails = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

        if (selectedFile && selectedFile.size <= 1024 * 1024) {
          setheadDetailsExtra({ ...headDetailsExtra, [name]: e.target.files[0] })
          // setErrors({ ...errors, dastavage: "" })
        } else {
          setheadDetailsExtra({ ...headDetailsExtra, [name]: null })

          // setErrors({ ...errors, dastavage: t('validateFileSize') })
          // setError('File size must be less than 1MB');
        }
      } else {
        setErrors({ ...errors, [name]: t('validateFileFormat') })

      }
    } else {

      if(/^[a-zA-Z0-9 ]+$/.test(value) || value == "" ){

               setheadDetailsExtra({ ...headDetailsExtra, [name]: value })


      }else if(name == "dob" || name == "description" || name == "makan"){
               setheadDetailsExtra({ ...headDetailsExtra, [name]: value })

              } else {
        setheadDetailsExtra({ ...headDetailsExtra, [name]: "" })
        toast.error("Special characters are not allowed")
      }
    }
  }
  const handleChangeMemberDetails = (e) => {
    const { value, name } = e.target
    if (name == "dastavage") {

      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

        if (selectedFile && selectedFile.size <= 1024 * 1024) {
          setMemberDetailsExtra({ ...memberDetailsExtra, [name]: e.target.files[0] })
          // setErrors({ ...errors, dastavage: "" })
        } else {
          setMemberDetailsExtra({ ...headDetailsExtra, [name]: null })

          // setErrors({ ...errors, dastavage: t('validateFileSize') })
          // setError('File size must be less than 1MB');
        }
      } else {
        setErrors({ ...errors, [name]: t('validateFileFormat') })

      }
    } else {

      if(/^[a-zA-Z0-9 ]+$/.test(value) || value == "" ){

        setMemberDetailsExtra({ ...memberDetailsExtra, [name]: value })

      }else if(name == "dob" || name == "description" || name == "makan"){
        setMemberDetailsExtra({ ...memberDetailsExtra, [name]: value })
      } else {
        setMemberDetailsExtra({ ...memberDetailsExtra, [name]: "" })
        toast.error("Special characters are not allowed")
      }
    }
  }

  const addMember = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      handleClickOpen()
    } else {
      setErrors(validationErrors);
    }
  }

  const onSave = () => {
    const validationErrors = {};
    // const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setState("3")
    } else {
      setErrors(validationErrors);
    }
  }

  const extra = () => {
    setSaveHof(true)
    dispatch(getfamilymember(addFamilyData?.id,startLoading, stopLoading))
  }
  const handleSaveHOF = () => {
    // const validationErrors = {};
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        "memberName":formData?.EnglishName || "",
"memberNameHin": formData?.hindiName ||  "",
"relativeName": formData?.relative || "",
"relationId":formData?.relation || 0,
"dateOfBirth":formData?.dob || "",
"genderId": formData?.gender || 0,
"memberStatusId": formData?.registrationBase || 0,
"referenceNo":formData?.refrence || "",
"qualificationId": formData?.education || 0,
"professionId": formData?.work || 0,
"socialCategoryId": formData?.category || 0,
"socialSubCategory": formData?.subCategory || "",
"rationCardNo":formData?.rationCard || "",
"religionId": formData?.religion || 0,
"aadhaarNo":formData?.adharCard || "",
"isHead":true,
"remarks":formData?.description || "",
"familyId":addFamilyData?.id,
dastavage : formData?.dastavage,
dastavage2 : formData?.dastavage2,

      }
      dispatch(addfamilymember(body,extra,startLoading, stopLoading))
      // setSaveHof(true)
    } else {
      setErrors(validationErrors);
    }
  }

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.EnglishName?.trim()) {
      errors.EnglishName = t("validateHeadName");
    }
    if (!formData.hindiName?.trim()) {
      errors.hindiName = t("validateHeadName");
    }
    if (!formData.relative?.trim() || !formData?.relation || formData?.relation == "0") {
      errors.relative = t("validateRelativeName");
    }
    if (!formData.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!formData.gender?.trim() || formData?.gender == "0") {
      errors.gender = t("validateGender")
    }
    if (!formData.registrationBase?.trim() || formData?.registrationBase == "0") {
      errors.registrationBase = t("validateBaseOfRegistration");
    }
    if (!formData.refrence?.trim()) {
      errors.refrence = t("validateRefrenceNumber");
    }
    if (!formData.education?.trim() || formData?.education == "0") {
      errors.education = t("validateEducation");
    }
    if (!formData.work || formData?.work == "0") {
      errors.work = t("validateWork");
    }
    if (!formData.category || formData?.category == "0") {
      errors.category = t("validateCategory");
    }
    // if (!formData.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!formData.rationCard) {
      errors.rationCard = t("validateRationCard");
    }
    else if (!isValidRationCardNumber(formData.rationCard?.trim())) {
      errors.rationCard = t("validateRationCardValidation");
    }
    if (!formData.religion || formData?.religion == "0") {
      errors.religion = t("validateReligion");
    }
    if (!formData.adharCard) {
      errors.adharCard = t("validateAadhar");
    } else if (formData.adharCard?.trim()?.length < 14) {
      errors.adharCard = t("validateAadharLength");
    }
    if (!formData.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    if (!formData.description) {
      errors.description = t("validateComment");
    }

    return errors;
  };

  const openMemberDetails = (i) => {
    let data = [...memberList]
    let newData = data?.map((v, index) => index == i ? { ...v, memberDetailsMore: !v?.memberDetailsMore } : v)
    setMemberList(newData)
  }

  const changeisEditModeMember = (v) => {
    let data = [...memberList]
    let newData = data?.map((k, index) => index == v ? { ...memberDetailsExtra, isEditModeMember: false } : k)
    setMemberList(newData)
    setMemberError({})

  }
  const changeisEditModeMemberClose = (v) => {
    let data = [...memberList]
    let newData = data?.map((k, index) => index == v ? { ...k, isEditModeMember: false } : k)
    setMemberList(newData)
    setMemberError({})
  }
  const changeisEditModeMemberDelete = (v) => {
    let data = [...memberList]
    let newData = data?.filter((k, index) => index != v)
    setMemberList(newData)
    setMemberError({})

  }

  // const saveEditMember = (v) => {
  //   let data = [...memberList]
  //   let newData = data?.map((k, index) => index == v ? memberDetailsExtra : k)
  //   setMemberList(newData)
  // }
const extraUpdate = () => {
  setFamilyDetails(familyDetailsExtra); setIsEditMode(false)
  setFamilyError({})
  dispatch(getfamilymember(addFamilyData?.id,startLoading, stopLoading))
  dispatch(getFamilyById(addFamilyData?.id))


}
  const saveFamilyAfterEdit = () => {
    const validationErrors = validateFormFamily(familyDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
          "districtCode":familyDetailsExtra?.districtCode,
          "houseAddress":familyDetailsExtra?.houseAddress,
          "rationCardNo":familyDetailsExtra?.rationCardNo,
          "socialSubCategory":familyDetailsExtra?.socialSubCategory,
          "wardId":familyDetailsExtra?.wardId,
          "socialCategoryId":familyDetailsExtra?.socialCategoryId,
          "municipalityId":familyDetailsExtra?.municipalityId,
          "bplNumber":familyDetailsExtra?.bplNumber,
          "mobileNumber":familyDetailsExtra?.mobileNumber?.replaceAll("-",""),
          "economicId":familyDetailsExtra?.economicId

      }
      dispatch(updateFamily(familyDetailsExtra?.family_id, body, extraUpdate))

    } else {
      setFamilyError(validationErrors);
    }
  }
  const extraAferHeadUpdate = () => {
    setFormData(headDetailsExtra); setisEditModeHead(false)
      setHeadError({})
      dispatch(getfamilymember(addFamilyData?.id,startLoading, stopLoading))
  dispatch(getFamilyById(addFamilyData?.id))
  }
  const saveHeadAfterEdit = () => {
    const validationErrors = validateFormHead(headDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
          "memberName":headDetailsExtra?.memberName,
          "memberNameHin":headDetailsExtra?.memberNameH,
          "relativeName":headDetailsExtra?.relativeName,
          "relationId":headDetailsExtra?.relationId,
          "dateOfBirth":headDetailsExtra?.date_of_birth,
          "genderId":headDetailsExtra?.genderId,
          "memberStatusId":headDetailsExtra?.memberStatusId,
          "referenceNo":headDetailsExtra?.reference_no,
          "qualificationId":headDetailsExtra?.qualificationId,
          "professionId":headDetailsExtra?.professionId,
          "socialCategoryId":headDetailsExtra?.socialCategoryId,
          "socialSubCategory":headDetailsExtra?.socialSubCategory,
          "rationCardNo":headDetailsExtra?.rationCardNo,
          "religionId":headDetailsExtra?.religionId,
          "aadhaarNo":headDetailsExtra?.aadhaarNo,
          "isHead":headDetailsExtra?.isHead,
          "remarks":headDetailsExtra?.remarks || "",
          "familyId":headDetailsExtra?.familyId

      }
      dispatch(updateFamilyMember(headDetailsExtra?.familyMemberId, body,extraAferHeadUpdate))
    } else {
      setHeadError(validationErrors);
    }
  }
  const extraAferMemberUpdate = (index) => {
    changeisEditModeMember(index)
    setMemberError({})
  }
  const saveMemberAfterEdit = (index) => {
    const validationErrors = validateFormMember(memberDetailsExtra);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        "memberName":memberDetailsExtra?.memberName,
        "memberNameHin":memberDetailsExtra?.memberNameH,
        "relativeName":memberDetailsExtra?.relativeName,
        "relationId":memberDetailsExtra?.relationId,
        "dateOfBirth":memberDetailsExtra?.date_of_birth,
        "genderId":memberDetailsExtra?.genderId,
        "memberStatusId":memberDetailsExtra?.memberStatusId,
        "referenceNo":memberDetailsExtra?.reference_no,
        "qualificationId":memberDetailsExtra?.qualificationId,
        "professionId":memberDetailsExtra?.professionId,
        "socialCategoryId":memberDetailsExtra?.socialCategoryId,
        "socialSubCategory":memberDetailsExtra?.socialSubCategory,
        "rationCardNo":memberDetailsExtra?.rationCardNo,
        "religionId":memberDetailsExtra?.religionId,
        "aadhaarNo":memberDetailsExtra?.aadhaarNo,
        "isHead":memberDetailsExtra?.isHead,
        "remarks":memberDetailsExtra?.remarks || "",
        "familyId":memberDetailsExtra?.familyId

    }
      dispatch(updateFamilyMember(memberDetailsExtra?.familyMemberId, body,extraAferMemberUpdate, index))

    } else {
      setMemberError(validationErrors);
    }
  }

  const validateFormMember = (memberDetailsExtra) => {
    const errors = {};
    if (!memberDetailsExtra.memberName?.trim()) {
      errors.memberName = t("validateHeadName");
    }

    if (!memberDetailsExtra.date_of_birth?.trim()) {
      errors.date_of_birth = t("validateDOB");
    }
    if (!memberDetailsExtra.genderId?.trim() ||  memberDetailsExtra.genderId == "0") {
      errors.genderId = t("validateGender")
    }
    // if (!memberDetailsExtra.registrationBase?.trim()) {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
    if (!memberDetailsExtra.reference_no?.trim()) {
      errors.reference_no = t("validateRefrenceNumber");
    }
    // if (!memberDetailsExtra.education?.trim()) {
    //   errors.education = t("validateEducation");
    // }
    // if (!memberDetailsExtra.work) {
    //   errors.work = t("validateWork");
    // }
    if (!memberDetailsExtra.socialCategoryId ||  memberDetailsExtra.socialCategoryId == "0") {
      errors.socialCategoryId = t("validateCategory");
    }
    // if (!memberDetailsExtra.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!memberDetailsExtra.rationCardNo) {
      errors.rationCardNo = t("validateRationCard");
    }
    else if (!isValidRationCardNumber(memberDetailsExtra.rationCardNo?.trim())) {
      errors.rationCardNo = t("validateRationCardValidation");
    }
    if (!memberDetailsExtra.religionId ||  memberDetailsExtra.religionId == "0") {
      errors.religionId = t("validateReligion");
    }
    if (!memberDetailsExtra.aadhaarNo) {
      errors.aadhaarNo = t("validateAadhar");
    } else if (memberDetailsExtra.aadhaarNo?.trim()?.length < 14) {
      errors.aadhaarNo = t("validateAadharLength");
    }
    // if (!memberDetailsExtra.dastavage) {
    //   errors.dastavage = t("validateDocument");
    // }
    // if (!memberDetailsExtra.description) {
    //   errors.description = t("validateComment");
    // }

    return errors;
  };
  const validateFormHead = (headDetailsExtra) => {
    const errors = {};
    if (!headDetailsExtra.memberName?.trim()) {
      errors.memberName = t("validateHeadName");
    }

    if (!headDetailsExtra.date_of_birth?.trim()) {
      errors.date_of_birth = t("validateDOB");
    }
    if (!headDetailsExtra.genderId?.trim() ||  headDetailsExtra.genderId == "0") {
      errors.genderId = t("validateGender")
    }
    // if (!headDetailsExtra.registrationBase?.trim()) {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
    if (!headDetailsExtra.reference_no?.trim()) {
      errors.reference_no = t("validateRefrenceNumber");
    }
    // if (!headDetailsExtra.education?.trim()) {
    //   errors.education = t("validateEducation");
    // }
    // if (!headDetailsExtra.work) {
    //   errors.work = t("validateWork");
    // }
    if (!headDetailsExtra.socialCategory ||  headDetailsExtra.socialCategory == "0") {
      errors.socialCategory = t("validateCategory");
    }
    // if (!headDetailsExtra.subCategory) {
    //   errors.subCategory = t("validateSubCategory");
    // }
    if (!headDetailsExtra.rationCardNo) {
      errors.rationCardNo = t("validateRationCard");
    }
    else if (!isValidRationCardNumber(headDetailsExtra.rationCardNo?.trim())) {
      errors.rationCardNo = t("validateRationCardValidation");
    }
    if (!headDetailsExtra.religionId ||  headDetailsExtra.religionId == "0") {
      errors.religionId = t("validateReligion");
    }
    if (!headDetailsExtra.aadhaarNo) {
      errors.aadhaarNo = t("validateAadhar");
    } else if (headDetailsExtra.aadhaarNo?.trim()?.length < 14) {
      errors.aadhaarNo = t("validateAadharLength");
    }
    // if (!headDetailsExtra.dastavage) {
    //   errors.dastavage = t("validateDocument");
    // }
    // if (!headDetailsExtra.description) {
    //   errors.description = t("validateComment");
    // }

    return errors;
  };

  const validateFormFamily = (familyDetailsExtra) => {
    const errors = {};
    if (!familyDetailsExtra.municipalityId?.trim()) {
      errors.municipalityId = t('validateMunucipal');
    }
    if (!familyDetailsExtra.districtCode?.trim()) {
      errors.districtCode = t('validateDistrict');
    }
    if (!familyDetailsExtra.wardId?.trim()) {
      errors.wardId = t("validateward");
    }
    if (!familyDetailsExtra.houseAddress?.trim()) {
      errors.houseAddress = t("ValidateHouseNumber");
    }
    if (!familyDetailsExtra.economicId?.trim() ||  familyDetailsExtra.economicId == "0") {
      errors.economicId = t("validateCondition");
    }
    if (familyDetailsExtra.economicId == "2" &&!familyDetailsExtra.bplNumber?.trim()) {
      errors.bplNumber = t("validateBPL");
    }
    if (!familyDetailsExtra.socialCategoryId?.trim() ||  familyDetailsExtra.socialCategoryId == "0") {
      errors.socialCategoryId = t("validateCategory");
    }
    // if (!familyDetailsExtra.subclass?.trim()) {
    //   errors.subclass = t("validateSubCategory");
    // }
    if (!familyDetailsExtra.rationCardNo?.trim()) {
      errors.rationCardNo = t("validateRationCard");
    }
    else if (!isValidRationCardNumber(familyDetailsExtra.rationCardNo?.trim())) {
      errors.rationCardNo = t("validateRationCardValidation");
    }
    if (!familyDetailsExtra.mobileNumber?.trim()) {
      errors.mobileNumber = t("validateMobile");
    }
   else if (familyDetailsExtra.mobileNumber?.trim()?.length < 11) {
      errors.mobileNumber = t("validateMobileLength");
    }
    else if (!isValidMobileNumber(familyDetailsExtra.mobileNumber?.replace("-", "")?.trim())) {
      errors.mobile = t("validateMobileStart");
    }
    return errors;
  };

  return (
    <>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={setMemberList} memberList={memberList} getFamilyByIdData={getFamilyByIdData}/>
      <div className={style.heading} style={{ marginBottom: "5px" }}>Family Details</div>
      <div className={style.tablewrapper} style={{ margin: "0" }}>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr className={style.tr}>
              <th className={style.th}>District</th>
              <th className={style.th}>Municipality</th>
              <th className={style.th}>Ward</th>
              <th className={style.th}>Ration Card Number</th>
              <th className={style.th}>Mobile Number</th>
              <th className={style.th}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={style.tr}>
              <td className={style.td}>{getFamilyByIdData?.district}</td>
              <td className={style.td}>{getFamilyByIdData?.municipalName}</td>
              <td className={style.td}>{getFamilyByIdData?.wardName}</td>
              <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
              <td className={style.td}>{getFamilyByIdData?.mobileNumber}</td>
              <td className={style.td}>

                <div className="action">

                  {isEditMode ? <>
                    <SaveBtn title="Save" onClick={() => { saveFamilyAfterEdit() }} />
                    <CloseBtn title="Close" onClick={() => { setFamilyError({}); setIsEditMode(false) }} /></>
                    :
                    <>{familyDetailsMore ? <CloseBtn title="Close" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} /> :
                      <MoreBtn title="More" onClick={() => { setFamilyDetailsMore(!familyDetailsMore) }} />}

                      <EditBtn title="Edit" disabled={familyDetailsMore} onClick={() => { setFamilyDetailsExtra(getFamilyByIdData); setConfirmationData(getFamilyByIdData); setEditModalType("family"); handleOpen() }} /></>
                  }
                </div>
              </td>
            </tr>
            {familyDetailsMore ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <p className={style.expandMargin}><b>District:</b> {getFamilyByIdData?.district}</p>
                    <p className={style.expandMargin}><b>Financial Condition:</b> {getFamilyByIdData?.economic}</p>
                    <p className={style.expandMargin}><b>Category:</b> {getFamilyByIdData?.socialCategory}</p>

                    {/* <p className={style.expandMargin}><b>Sub Category:</b> {familyDetails?.subclass}</p> */}
                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Municipality:</b> {getFamilyByIdData?.municipalName}</p>
                  <p className={style.expandMargin}><b>House Number:</b> {getFamilyByIdData?.houseAddress}</p>

                    <p className={style.expandMargin}><b>Ration Card Number:</b> {getFamilyByIdData?.rationCardNo}</p>

                  </Grid>
                  <Grid item xs={4}>
                  <p className={style.expandMargin}><b>Ward:</b> {getFamilyByIdData?.wardName}</p>

                    <p className={style.expandMargin}><b>House Number:</b> {getFamilyByIdData?.houseAddress}</p>
                    <p className={style.expandMargin}><b>Mobile Number:</b> {getFamilyByIdData?.mobileNumber}</p>

                  </Grid>
                </Grid>
              </td>
            </tr> : isEditMode ? <tr >
              <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('district')}
                      name="districtCode"
                      options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                      value={familyDetailsExtra?.districtCode}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading)) }}
                      requried
                    />
                    {familyError?.districtCode && <p className="error">{familyError?.districtCode}</p>}

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown

                      title={t('selectVillage')}
                      name="municipalityId"
                      options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.municipalityId}
                      onChange={(e) => { handleChangeFamilyDetails(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading)) }}
                      requried
                    />
                    {familyError?.municipalityId && <p className="error">{familyError?.municipalityId}</p>}
                  </Grid>
                  <Grid item xs={4}>
                    <SelectDropdown
                      title={t('selectWard')}

                      name="wardId"
                      options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}

                      value={familyDetailsExtra?.wardId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.wardId && <p className="error">{familyError?.wardId}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('subCategory')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="socialSubCategory"
                      value={familyDetailsExtra?.socialSubCategory}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={handleChangeFamilyDetails}
                    />
                    {/* {familyError?.subclass && <p className="error">{familyError?.subclass}</p>} */}

                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('financialCondition')}

                      name="economicId"
                      options={economicStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                      value={familyDetailsExtra?.economicId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.economicId && <p className="error">{familyError?.economicId}</p>}
                  </Grid>

                 {familyDetailsExtra?.economicId == "2" && <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('bplCount')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="number"
                      onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
                      name="bplNumber"
                      value={familyDetailsExtra?.bplNumber}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.bplNumber && <p className="error">{familyError?.bplNumber}</p>}
                  </Grid>}
                  <Grid item xs={4} >
                    <InputFieldWithIcon
                      title={t('rathinCardNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="rationCardNo"
                      value={familyDetailsExtra?.rationCardNo}
                      onChange={handleChangeFamilyDetails}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      // disabled
                    />
                    {familyError?.rationCardNo && <p className="error">{familyError?.rationCardNo}</p>}

                  </Grid>
                  <Grid item xs={4}>
                    <InputFieldWithIcon
                      title={t('houseNumber')}

                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      name="houseAddress"
                      value={familyDetailsExtra?.houseAddress}
                      onChange={(e) => e.target.value?.length > 10 ? null : handleChangeFamilyDetails(e)}
                      requried
                      onKeyDown={(e) => {
                        if (!isAlphanumericKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {familyError?.houseAddress && <p className="error">{familyError?.houseAddress}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <SelectDropdown
                      title={t('category')}
                      // disabled
                      name="socialCategoryId"
                      options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      value={familyDetailsExtra?.socialCategoryId}
                      onChange={handleChangeFamilyDetails}
                      requried
                    />
                    {familyError?.socialCategoryId && <p className="error">{familyError?.socialCategoryId}</p>}
                  </Grid>
                  <Grid item xs={4} >
                    <InputFieldWithIcon

                      title={t('mobileNumber')}
                      // icon={<IoIosDocument size={20} />}
                      placeholder=""
                      type="text"
                      onKeyDown={(e) => {
                        if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                          e.preventDefault();
                        }
                      }}                       name="mobileNumber"
                      value={familyDetailsExtra?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
                      onChange={(e) => e.target.value?.length > 11 ? null : handleChangeFamilyDetails(e)}
                      requried
                    />
                    {familyError?.mobileNumber && <p className="error">{familyError?.mobileNumber}</p>}

                  </Grid>
                </Grid>
              </td>
            </tr> : null}
          </tbody>
        </table>


      </div>
      {saveHof ?
        <>
          <div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Family Head Details</div>
          <div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Head of Family Name</th>
                  <th className={style.th}>Ration Card Number</th>
                  <th className={style.th}>Religion</th>
                  <th className={style.th}>Social Category</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{formData?.memberName}</td>
                  <td className={style.td}>{formData?.rationCardNo}</td>
                  <td className={style.td}>{ formData?.religion}</td>
                  <td className={style.td}>{formData?.socialCategory}</td>
                  <td className={style.td}>

                    <div className="action">
                      {isEditModeHead ? <>
                        <SaveBtn title="Save" onClick={() => { saveHeadAfterEdit() }} />
                        <CloseBtn title="Close" onClick={() => { setHeadError({}); setisEditModeHead(false) }} /></>
                        :
                        <>
                          {headDetailsMore ? <CloseBtn title="Close" onClick={() => { setHeadDetailsMore(!headDetailsMore) }} /> :
                            <MoreBtn title="More" onClick={() => { setHeadDetailsMore(!headDetailsMore) }} />}

                          <EditBtn title="Edit" disabled={headDetailsMore} onClick={() => { setheadDetailsExtra(formData); setConfirmationData(formData); setEditModalType("head"); handleOpen() }} />
                        </>}
                    </div>
                  </td>
                </tr>
                {headDetailsMore ? <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Head Of Family:</b> {formData?.memberName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formatDate(formData?.date_of_birth)}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {formData?.gender}</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Reference Number:</b> {formData?.reference_no}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {formData?.religion}</p>
                        <p className={style.expandMargin}><b>Category:</b> {formData?.socialCategory}</p>

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration Card Number:</b> {formData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>Aadhaar Card Number:</b> {formData?.aadhaarNo}</p>
                        {/* <p className={style.expandMargin}><b>Sub Category:</b> {formData?.subCategory}</p> */}

                      </Grid>
                    </Grid>
                  </td>
                </tr> : isEditModeHead ? <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                    <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                      <Grid item xs={4} >
                        <InputFieldWithIcon

                          title={t('headOfFamilyName')}
                          subTitle="(in English)"
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="memberName"
                          value={headDetailsExtra?.memberName}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphabateKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.memberName && <p className="error">{headError?.memberName}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <DatePicker
                          title={t('dateOfBirth')}

                          type="date"
                          requried
                          name="date_of_birth"
                          value={headDetailsExtra?.date_of_birth}
                          onChange={handleChangeHeadDetails}
                        />
                        {headError?.date_of_birth && <p className="error">{headError?.date_of_birth}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('gender')}

                          name="genderId"
                          options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.genderId}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.genderId && <p className="error">{headError?.genderId}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon

                          title={t('refrenceNumber')}
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="reference_no"
                          value={headDetailsExtra?.reference_no}
                          onChange={handleChangeHeadDetails}
                          requried
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {headError?.reference_no && <p className="error">{headError?.reference_no}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <SelectDropdown
                          title={t('religion')}

                          name="religionId"
                          options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                          value={headDetailsExtra?.religionId}
                          onChange={handleChangeHeadDetails}
                          requried
                        />
                        {headError?.religionId && <p className="error">{headError?.religionId}</p>}
                      </Grid>

                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('subCategory')}

                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="socialSubCategory"
                          value={headDetailsExtra?.socialSubCategory}
                          onChange={handleChangeHeadDetails}
                        // requried
                        onKeyDown={(e) => {
                          if (!isAlphabateKey(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        />
                        {/* {headError?.subCategory && <p className="error">{headError?.subCategory}</p>} */}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('rathinCardNumber')}
disabled
                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          name="rationCardNo"
                          value={headDetailsExtra?.rationCardNo}
                          onChange={handleChangeHeadDetails}
                          onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          requried
                        />
                        {headError?.rationCardNo && <p className="error">{headError?.rationCardNo}</p>}
                      </Grid>
                      <Grid item xs={4}>
                        <InputFieldWithIcon
                          title={t('aadharCardNumber')}

                          // icon={<IoIosDocument size={20} />}
                          placeholder=""
                          type="text"
                          onKeyDown={(e) => {
                            if (!(isNumericKeyWithSpace(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                              e.preventDefault();
                            }
                          }}                        name="aadhaarNo"
                          value={headDetailsExtra?.aadhaarNo?.replace(/(\d{4})(?=\d)/g, '$1 ')}
                          onChange={(e) => e.target.value?.length > 14 ? null : handleChangeHeadDetails(e)}
                          requried
                        />
                        {headError?.aadhaarNo && <p className="error">{headError?.aadhaarNo}</p>}

                      </Grid>
                    </Grid>
                  </td>
                </tr> : null}
              </tbody>
            </table>


          </div>
          {memberList?.length > 0 && <><div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Family Member Details</div>
            <div className={style.tablewrapper} style={{ margin: "0" }}>
              <table className={style.table}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                    <th className={style.th}>Name</th>
                    <th className={style.th}>Date of Birth</th>
                    <th className={style.th}>Aadhaar Number</th>
                    <th className={style.th}>eKYC Varification Status</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {memberList?.map((v, index) => (<>
                    <tr className={style.tr}>
                      <td className={style.td}>{v?.memberName}</td>
                      <td className={style.td}>{formatDate(v?.date_of_birth)}</td>
                      <td className={style.td}>{v?.aadhaarNo}</td>
                      <td className={style.td}>Document not Attached</td>
                      <td className={style.td}>

                        <div className="action">

                          {v?.isEditModeMember ? <>
                            <SaveBtn title="Save" onClick={() => { saveMemberAfterEdit(index) }} />
                            <DeleteBtn title="Delete" onClick={() => { changeisEditModeMemberDelete(index) }} />
                            <CloseBtn title="Close" onClick={() => { setMemberError({}); changeisEditModeMemberClose(index) }} /></>
                            :
                            <>
                              {v?.memberDetailsMore ? <CloseBtn title="Close" onClick={() => { openMemberDetails(index) }} /> :
                                <MoreBtn title="More" onClick={() => { openMemberDetails(index) }} />}

                              <EditBtn title="Edit" disabled={v?.memberDetailsMore} onClick={() => { setMemberDetailsExtra(v); setConfirmationData(v); setEditModalType("member"); handleOpen() }} />
                            </>}
                        </div>
                      </td>
                    </tr>
                    {v?.memberDetailsMore ? <tr  >
                      <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                        <Grid container spacing={5}>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Member Name:</b> {v?.memberName}</p>
                            <p className={style.expandMargin}><b>Date of Birth:</b> {formatDate(v?.date_of_birth)}</p>
                            <p className={style.expandMargin}><b>Gender:</b> {v?.gender}</p>
                            {/* <p className={style.expandMargin}><b>Is Verified:</b> Document not Attached</p> */}

                          </Grid>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Reference Number:</b> {v?.reference_no}</p>
                            <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                            <p className={style.expandMargin}><b>Category:</b> { v?.socialCategory}</p>

                          </Grid>
                          <Grid item xs={4}>
                            {/* <p className={style.expandMargin}><b>Sub Category:</b> {v?.subCategory}</p> */}
                            <p className={style.expandMargin}><b>Ration Card Number:</b> {v?.rationCardNo}</p>
                            <p className={style.expandMargin}><b>Aadhaar Card Number:</b> {v?.aadhaarNo}</p>

                          </Grid>
                        </Grid>
                      </td>
                    </tr> : v?.isEditModeMember ? <tr  >
                      <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                        <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                          <Grid item xs={4}>
                            <InputFieldWithIcon


                              title={t('headOfFamilyName')}
                              subTitle="(in English)"
                              // icon={<IoIosDocument size={20} />}
                              placeholder=""
                              type="text"
                              name="memberName"
                              value={memberDetailsExtra?.memberName}
                              onChange={handleChangeMemberDetails}
                              onKeyDown={(e) => {
                                if (!isAlphabateKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              requried
                            />
                            {memberError?.memberName && <p className="error">{memberError?.memberName}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <DatePicker
                              title={t('dateOfBirth')}

                              type="date"
                              requried
                              name="date_of_birth"
                              value={memberDetailsExtra?.date_of_birth}
                              onChange={handleChangeMemberDetails}
                            />
                            {memberError?.date_of_birth && <p className="error">{memberError?.date_of_birth}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('gender')}

                              name="genderId"
                              options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.genderId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.genderId && <p className="error">{memberError?.genderId}</p>}
                          </Grid>
                          {/* <Grid item xs={4}>
                            <SelectDropdown

                              title={t('isVerified')}
                              name="isVerified"
                              options={[
                                { value: "poor", label: "Verified" },
                                { value: "rich", label: "Not Varified" },
                              ]}
                              value={memberDetailsExtra?.isVerified}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.isVerified && <p className="error">{memberError?.isVerified}</p>}

                          </Grid> */}
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('refrenceNumber')}
                              // icon={<IoIosDocument size={20} />}
                              placeholder=""
                              type="text"
                              name="reference_no"
                              value={memberDetailsExtra?.reference_no}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.reference_no && <p className="error">{memberError?.reference_no}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown
                              title={t('religion')}

                              name="religionId"
                              options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.religionId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.religionId && <p className="error">{memberError?.religionId}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown

                              title={t('category')}
                              name="socialCategoryId"
                              options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                              value={memberDetailsExtra?.socialCategoryId}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.socialCategoryId && <p className="error">{memberError?.socialCategoryId}</p>}

                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('subCategory')}
                              placeholder=""
                              type="text"
                              name="socialSubCategory"
                              value={memberDetailsExtra?.socialSubCategory}
                              onChange={handleChangeMemberDetails}
                            // requried
                            onKeyDown={(e) => {
                              if (!isAlphabateKey(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            />
                            {/* {memberError?.subCategory && <p className="error">{memberError?.subCategory}</p>} */}
                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon
  disabled
                              title={t('rathinCardNumber')}
                              placeholder=""
                              type="text"
                              name="rationCardNo"
                              value={memberDetailsExtra?.rationCardNo}
                              onChange={handleChangeMemberDetails}
                              requried
                              onKeyDown={(e) => {
                                if (!isAlphanumericKey(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {memberError?.rationCardNo && <p className="error">{memberError?.rationCardNo}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <InputFieldWithIcon

                              title={t('aadharCardNumber')}
                              placeholder=""
                              type="text"
                              onKeyDown={(e) => {
                                if (!(isNumericKeyWithSpace(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
                                  e.preventDefault();
                                }
                              }}                             name="aadhaarNo"
                              value={memberDetailsExtra?.aadhaarNo?.replace(/(\d{4})(?=\d)/g, '$1 ')}
                              onChange={(e) => e.target.value?.length > 14 ? null : handleChangeMemberDetails(e)}
                              requried
                            />
                            {memberError?.aadhaarNo && <p className="error">{memberError?.aadhaarNo}</p>}

                          </Grid>
                        </Grid>
                      </td>
                    </tr> : null}
                  </>))}
                </tbody>
              </table>


            </div></>}
          <div className={style.save} style={{ float: "none", textAlign: "center" }}>
            <SubmitButton label="Add Member" onClick={addMember} />
            <SubmitButton label="Save Family" onClick={() => router.push("/familyList")} style={{ marginLeft: "20px" }} />
          </div>
        </>

        : <>    <div className={style.heading} style={{ marginTop: "20px" }}>Add HOF/member</div>
          <Grid container spacing={3} >

            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('headOfFamilyName')}
                subTitle="(in English)"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="EnglishName"
                value={formData?.EnglishName}
                onChange={(e) => {handleChange(e)}}
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
                title={t('headOfFamilyName')}
                disabled
                subTitle="(in Hindi)"
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="hindiName"
                value={formData?.hindiName}
                onChange={handleChange}
                requried
              />
              {errors?.hindiName && <p className="error">{errors?.hindiName}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={6} >
            <p className={style.title}>{t('nameOfRelative')}<span className="requried"> *</span></p>
           <div style={{display : "flex"}}>
           <SelectDropdown
                style={{paddingTop : 6, paddingBottom : 6}}
                name="relation"
                options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                topStyle={{width : "100%"}}

                value={formData?.relation}
                onChange={handleChange}
                // requried
              />
              <InputFieldWithIcon
                // title={t('nameOfRelative')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                topStyle={{width : "100%"}}

                type="text"
                name="relative"
                value={formData?.relative}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                // requried
              />
           </div>
              {errors?.relative && <p className="error">{errors?.relative}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <DatePicker
                title={t('dateOfBirth')}
                type="date"
                requried
                name="dob"
                value={formData?.dob}
                onChange={handleChange}
              />
              {errors?.dob && <p className="error">{errors?.dob}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('gender')}
                name="gender"
                options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.gender}
                onChange={handleChange}
                requried
              />
              {errors?.gender && <p className="error">{errors?.gender}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('baseOfRegistration')}
                name="registrationBase"
                options={memberStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.registrationBase}
                onChange={handleChange}
                requried
              />
              {errors?.registrationBase && <p className="error">{errors?.registrationBase}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('refrenceNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="refrence"
                value={formData?.refrence}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (!isAlphanumericKey(e.key)) {
                    e.preventDefault();
                  }
                }}
                requried
              />
              {errors?.refrence && <p className="error">{errors?.refrence}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('education')}
                name="education"
                options={qualificationList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.education}
                onChange={handleChange}
                requried
              />
              {errors?.education && <p className="error">{errors?.education}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('livelihoodResource')}
                name="work"
                options={profesionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.work}
                onChange={handleChange}
                requried
              />
              {errors?.work && <p className="error">{errors?.work}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('category')}
                name="category"
                options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                value={formData?.category}
                onChange={handleChange}
                requried
              />
              {errors?.category && <p className="error">{errors?.category}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('subCategory')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="subCategory"
                value={formData?.subCategory}
                onChange={(e) => (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value == "") ? handleChange(e) : null}
                onKeyDown={(e) => {
                  if (!isAlphabateKey(e.key)) {
                    e.preventDefault();
                  }
                }}              />
              {/* {errors?.subCategory && <p className="error">{errors?.subCategory}</p>} */}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <InputFieldWithIcon
                title={t('rathinCardNumber')}
                // icon={<IoIosDocument size={20} />}
                placeholder=""
                type="text"
                name="rationCard"
                value={formData?.rationCard}
                onChange={handleChange}
                requried
                disabled
              />
              {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <SelectDropdown
                title={t('religion')}
                name="religion"
                options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                value={formData?.religion}
                onChange={handleChange}
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
                }}               name="adharCard"
                value={formData?.adharCard?.replace(/(\d{4})(?=\d)/g, '$1 ')}
                onChange={(e) => e.target.value?.length > 14 ? null : handleChange(e)}
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
                // value={formData?.rationCard}
                onChange={handleChange}
                accept="image/*"

              />
                        {formData?.dastavage && <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

              {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

            </Grid>
            <Grid item xs={24} sm={8} md={6}>
              <TextArea
                title={t('comment')}
                placeholder="Text area"
                requried
                name="description"
                value={formData?.description}
                onChange={handleChange}

              />
              {errors?.description && <p className="error">{errors?.description}</p>}

            </Grid>


          </Grid>
          <div className={style.save}>
            <SubmitButton label="Save" onClick={() => handleSaveHOF()} />
            {/* <SubmitButton label="Back" onClick={() => setState("1")} />
        <SubmitButton label="Add member" onClick={addMember} style={{ marginLeft: "20px" }}/>
        <SubmitButton label="Proceed" onClick={onSave} style={{ marginLeft: "20px" }} /> */}
          </div></>}
      <EditFamilyConfirmation nameTitle={nameTitle} memberList={memberList} setMemberList={setMemberList} handleClose={handleClose} open={open} data={confirmationData} EditModalType={EditModalType} setIsEditMode={setIsEditMode} setisEditModeHead={setisEditModeHead} getFamilyByIdData={getFamilyByIdData} formData={formData}/>
    </>
  )
}

export default AddHOF
