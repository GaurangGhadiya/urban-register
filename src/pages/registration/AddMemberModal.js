import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/SelectDropdown'
import InputFieldWithIcon from '@/components/InputFieldWithIcon'
import SubmitButton from '@/components/SubmitBtn'
import style from "./registration.module.css"

import FileUpload from '@/components/FileUpload'
import DatePicker from '@/components/DatePicker'
import TextArea from '@/components/TextArea'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '@/network/actions/getCategory'
import { getGender } from '@/network/actions/getGender'
import { getMemberStatus } from '@/network/actions/getMemberStatus'
import { getQualification } from '@/network/actions/getQualification'
import { getProfession } from '@/network/actions/getProfession'
import { getReligion } from '@/network/actions/getReligion'
import translateToHindi from '@/utils/translate'
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithSpace, isValidRationCardNumber } from '@/utils/regex'
import { addfamilymember } from '@/network/actions/addfamilymember'
import { getfamilymember } from '@/network/actions/getfamilymember'
import { getRelation } from '@/network/actions/getRelation'
import { useLoading } from '@/utils/LoadingContext'
import Loader from '@/utils/Loader'
import { MdClose, MdOutlineSave } from 'react-icons/md'
import toast from 'react-hot-toast'

function generateUserId() {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit number
  const userId = timestamp.toString() + randomNum.toString();
  return userId;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddMemberModal = ({ handleClose, open, setMemberList, memberList, getFamilyByIdData, memberFillDetails = {} }) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch()
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])
  const relationlist = useSelector((state) => state.getRelation?.data)

  const categorylist = useSelector((state) => state.getCategory?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])

  const [formData, setFormData] = useState({
    EnglishName: "",
    hindiName: "",
    relative: "",
    relation: "",
    relativeName: "",
    dob: "",
    gender: "",
    registrationBase: "1",
    refrence: "",
    education: "",
    work: "",
    category: getFamilyByIdData?.socialCategoryId || "",
    subCategory: getFamilyByIdData?.socialSubCategory || "",
    rationCard: getFamilyByIdData?.rationCardNo || "",
    religion: "",
    adharCard: "",
    dastavage: "",
    description: "",
    isEditModeMember: false,
  })
  const [errors, setErrors] = useState({});



  useEffect(() => {
    if (Object.keys(memberFillDetails)?.length > 0 && getFamilyByIdData) {
      let data = {
        EnglishName: memberFillDetails?.memberName || "",
        hindiName: "",
        relative: "",
        relativeName: "",
        relation: "",
        dob: "",
        gender: "",
        registrationBase: "1",
        refrence: "",
        education: "",
        work: "",
        category: getFamilyByIdData?.socialCategoryId || "",
        subCategory: getFamilyByIdData?.socialSubCategory || "",
        rationCard: memberFillDetails?.rationCardNo || "",
        religion: "",
        adharCard: memberFillDetails?.aadhaarNo?.replace(/(\d{4})(?=\d)/g, '$1 ') || "",
        dastavage: "",
        description: "",
        isEditModeMember: false,
      }
      setFormData(data)
    }
    //  else if(Object.keys(memberFillDetails)?.length == 0 ){
    //   // alert("cal")
    //   setFormData({...formData,rationCard: getFamilyByIdData?.rationCardNo,category: getFamilyByIdData?.socialCategoryId })

    // }

  }, [getFamilyByIdData, memberFillDetails])

  useEffect(() => {
    if (Object.keys(memberFillDetails)?.length == 0 && getFamilyByIdData) {
      setFormData({
        ...formData, rationCard: getFamilyByIdData?.rationCardNo, category: getFamilyByIdData?.socialCategoryId, subCategory: getFamilyByIdData?.socialSubCategory || "",
      })

    }

  }, [getFamilyByIdData])


  useEffect(() => {
    if (memberFillDetails?.memberName) {

      setTimeout(() => {

        if (memberFillDetails?.memberName && formData?.hindiName == "") changeLang(memberFillDetails?.memberName)
      }, 1000);
    }
  }, [memberFillDetails])




  useEffect(() => {
    dispatch(getCategory())
    dispatch(getGender())
    dispatch(getMemberStatus())
    dispatch(getRelation())

    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getReligion())

  }, [])

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage" || name == "dastavage2") {

      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))) {

        if (selectedFile && selectedFile.size <= 1024 * 1024) {
          setFormData({ ...formData, [name]: e.target.files[0] })
          setErrors({ ...errors, [name]: "" })
        } else {
          setFormData({ ...formData, [name]: null })

          setErrors({ ...errors, [name]: "File size must be less than 1MB" })
          // setError('File size must be less than 1MB');
        }
      } else {
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileFormat') })
      }
    } else {
      if (/^[a-zA-Z0-9 ]+$/.test(value) || value == "") {

        setFormData({ ...formData, [name]: value })

      } else if (name == "dob" || name == "description" || name == "makan") {
        setFormData({ ...formData, [name]: value })
      } else {
        setFormData({ ...formData, [name]: "" })
        toast.error("Special characters are not allowed")
      }

    }
  }

  const extra = () => {
    dispatch(getfamilymember(addFamilyData?.id || getFamilyByIdData?.family_id, startLoading, stopLoading))
    // setSaveHof(true)
    setErrors({})
    setFormData({
      ...formData, EnglishName: "", memberDetailsMore: false, isEditModeMember: false,
      hindiName: "",
      relative: "",
      relativeName: "",
      dob: "",
      gender: "",
      registrationBase: "",
      refrence: "",
      education: "",
      work: "",
      subCategory: "",
      religion: "",
      adharCard: "",
      dastavage: "",
      dastavage2: "",
      description: ""
    })
    // setMemberList([...memberList,{...formData, id : generateUserId()}])
    handleClose()
  }

  const onCancle = () => {
    setErrors({})
    setFormData({
      ...formData, EnglishName: "", memberDetailsMore: false, isEditModeMember: false,
      hindiName: "",
      relative: "",
      dob: "",
      gender: "",
      registrationBase: "1",
      refrence: "",
      education: "",
      work: "",
      subCategory: "",
      religion: "",
      adharCard: "",
      dastavage: "",
      description: ""
    })
    handleClose()

  }

  const onSave = () => {
    // const validationErrors = {};
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        "memberName": formData?.EnglishName || "",
        "memberNameHin": formData?.hindiName || "",
        "relativeName": formData?.relative == "other" ? formData?.relativeName : formData?.relative,
        "relationId": formData?.relation || 0,
        "dateOfBirth": formData?.dob || "",
        "genderId": formData?.gender || 0,
        "memberStatusId": formData?.registrationBase || "1",
        "referenceNo": formData?.refrence || "",
        "qualificationId": formData?.education || 0,
        "professionId": formData?.work || 0,
        "socialCategoryId": formData?.category || 0,
        // "socialCategoryId": "1",
        "socialSubCategory": formData?.subCategory || "",
        "rationCardNo": formData?.rationCard || "",
        "religionId": formData?.religion || 0,
        "aadhaarNo": formData?.adharCard?.replaceAll(" ", "") || "",
        "isHead": false,
        "remarks": formData?.description || "",
        "familyId": addFamilyData?.id || getFamilyByIdData?.family_id,
        "himParivarId": addFamilyData?.HimParivarId,
        dastavage: formData?.dastavage || "",
        dastavage2: formData?.dastavage2 || "",

      }
      dispatch(addfamilymember(body, extra, startLoading, stopLoading))

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
    if (!formData.relative?.trim()) {
      errors.relative = t("validateRelativeName");
    }
    if (formData.relative == "other" && !formData.relativeName?.trim()) {
      errors.relative = t("validateRelativeName");
    }
    if (!formData.dob?.trim()) {
      errors.dob = t("validateDOB");
    }
    if (!formData.gender?.trim() || formData?.gender == "0") {
      errors.gender = t("validateGender")
    }
    // if (!formData.registrationBase?.trim() || formData?.registrationBase == "0") {
    //   errors.registrationBase = t("validateBaseOfRegistration");
    // }
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
    if (formData?.subCategory && !formData.dastavage2) {
      errors.dastavage2 = t("validateSupportingDocument");
    }
    if (!formData.description) {
      errors.description = t("validateComment");
    }

    return errors;
  };

  const changeLang = async (name) => {
    if (name) {

      startLoading()
      const text = await translateToHindi(name);
      if (text) {
        setFormData((prev) => ({ ...prev, hindiName: text }))
        // return text
        stopLoading()
      }
      stopLoading()
    } else {
      setFormData((prev) => ({ ...prev, hindiName: "" }))
    }
  }


  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"lg"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Member
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          color: (theme) => theme.palette.grey[500],
          zIndex: 999
        }}
      >
        <Box style={{ height: "30px", width: "30px", background: "#A04040" }} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <MdClose color='white' size={18} />
        </Box>
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={3} >

          <Grid item xs={12} sm={4} md={3}>
            <InputFieldWithIcon
              title={t('memberName')}
              subTitle="(in English)"
              // icon={<IoIosDocument size={20} />}
              placeholder=""
              type="text"
              name="EnglishName"
              value={formData?.EnglishName}
              onChange={handleChange}
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
              value={formData?.hindiName}
              onChange={handleChange}
              requried
            />
            {errors?.hindiName && <p className="error">{errors?.hindiName}</p>}

          </Grid>
          <Grid item xs={12} sm={8} md={6} >
            <p className={style.title}>{t('nameOfRelative')}<span className="requried"> *</span></p>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} >
                <SelectDropdown
                  style={{ paddingTop: 5.5, paddingBottom: 5.5 }}
                  name="relation"
                  options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  value={formData?.relation}
                  onChange={handleChange}
                // requried
                />
              </Grid>
              <Grid item xs={12} sm={4} >
                <SelectDropdown
                  style={{ paddingTop: 5.5, paddingBottom: 5.5 }}
                  name="relative"
                  options={[...getfamilymemberList?.map(v => ({ value: v?.memberName, label: v?.memberName })), { value: "other", label: "other" }]}

                  value={formData?.relative}
                  onChange={handleChange}
                // requried
                />
              </Grid>
              {formData?.relative == "other" && <Grid item xs={12} sm={4} >
                <InputFieldWithIcon
                  style={{ width: "100%" }}
                  placeholder="Enter relative name"
                  type="text"
                  name="relativeName"
                  value={formData?.relativeName}
                  onChange={handleChange}
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
          {/* <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
                title={t('baseOfRegistration')}
                name="registrationBase"
                options={memberStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}

              value={formData?.registrationBase}
              onChange={handleChange}
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
              value={formData?.refrence}
              onChange={handleChange}
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
          {formData?.category == "2" && <Grid item xs={12} sm={4} md={3}>
            <SelectDropdown
              title={t('tribesCategory')}
              name="subCategory"
              options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
              value={formData?.subCategory}
              onChange={handleChange}
              disabled
            // requried
            />
            {/* {errors?.socialSubCategory && <p className="error">{errors?.socialSubCategory}</p>} */}

          </Grid>}

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
                if (!(isNumericKeyWithSpace(e.key) || e.key === 'Backspace' || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                  e.preventDefault();
                }
              }} name="adharCard"
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
            {formData?.dastavage && <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{ marginTop: "3px", fontSize: "14px", float: "right", color: "blue" }}>View Uploaded File</a>}

            {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

          </Grid>
          {formData?.subCategory && <Grid item xs={12} sm={4} md={3}>
            <FileUpload
              title={t('manifesto')}
              // subTitle="(Bonafide Himachal)"
              requried
              name="dastavage2"
              // value={formData?.rationCard}
              onChange={handleChange}
              accept="image/*"

            />
            {formData?.dastavage2 && <a href={URL.createObjectURL(formData.dastavage2)} target="_" style={{ marginTop: "3px", fontSize: "14px", float: "right", color: "blue" }}>View Uploaded File</a>}

            {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

          </Grid>}
          <Grid item xs={24} sm={24} md={24}>
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
      </DialogContent>
      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <SubmitButton onClick={onCancle} label="Cancel" icon={<MdClose size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} type="cancel" />
        <SubmitButton onClick={onSave} label="Save" icon={<MdOutlineSave size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} />

      </DialogActions>
    </BootstrapDialog>
  )
}

export default AddMemberModal
