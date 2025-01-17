import FileUpload from '@/components/FileUpload';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SelectDropdown from '@/components/SelectDropdown';
import SubmitButton from '@/components/SubmitBtn';
import TextArea from '@/components/TextArea';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { getDistrict } from '@/network/actions/getDistrict';
import { getGender } from '@/network/actions/getGender';
import { getMemberStatus } from '@/network/actions/getMemberStatus';
import { getProfession } from '@/network/actions/getProfession';
import { getQualification } from '@/network/actions/getQualification';
import { getRelation } from '@/network/actions/getRelation';
import { getReligion } from '@/network/actions/getReligion';
import { useLoading } from '@/utils/LoadingContext';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithSpace, isValidRationCardNumber } from '@/utils/regex';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdOutlineSave } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import style from '../TransferList.module.css'
import DatePicker from '@/components/DatePicker';
import { getfamilymember } from '@/network/actions/getfamilymember';
import translateToHindi from '@/utils/translate';
import toast from 'react-hot-toast';
import { formatDatePiyush } from '@/utils/formatDate';

const Step2 = ({selectedFamilyMember, onSaveFamily,formData1 }) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const router = useRouter()
  const dispatch = useDispatch()
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
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData)

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    EnglishName: "",
    hindiName: "",
    relation: "",
    relative: "",
    dob: "",
    gender: "",
    registrationBase: "1",
    refrence: "",
    education: "",
    work: "",
    category: "",
    subCategory: "",
    rationCard: "",
    religion: "",
    adharCard: "",
    dastavage: "",
    dastavage2: "",
    description: ""
  })
  useEffect(() => {
    if(selectedFamilyMember?.length > 0 ) {setFormData({
       EnglishName: selectedFamilyMember?.[0]?.M_NameinEnglish ||"",
       hindiName:selectedFamilyMember?.[0]?.M_Name || "",
       relative: "",
       relativeName: "",
       relation : "",
      dob: formatDatePiyush(selectedFamilyMember?.[0]?.['DateofBirth'])?.split("-")?.reverse()?.join("-") ?? '',
      // dob: selectedFamilyMember?.[0]?.DateofBirth?.replaceAll("/", "-") ||'',
       gender: selectedFamilyMember?.[0]?.Gender ||"",
       registrationBase: "1",
       refrence: "",
       education: selectedFamilyMember?.[0]?.EducationLevel || "",
       work: selectedFamilyMember?.[0]?.Profession ||"",
       category: formData1?.class || "",
      subCategory: formData1?.subClass ||"",
       rationCard:   formData1?.rationCard||"",
       religion:selectedFamilyMember?.[0]?.Religion || "",
       adharCard:  selectedFamilyMember?.[0]?.AdharNumber ||"",
       dastavage: "",
       dastavage2: "",
       description: "",
       isEditModeMember : false,
     })}
   }, [selectedFamilyMember])

  const changeLang = async (name) => {
    if (name) {
startLoading()
      const text = await translateToHindi(name);
      if (text) {

        setFormData({ ...formData, hindiName: text })
        // return text
        stopLoading()
      }
      stopLoading()
    }else{
      setFormData({ ...formData, hindiName: "" })
    }
  }

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

        setErrors({ ...errors, [name]: t('validateFileSize') })
        // setError('File size must be less than 1MB');
      }
    }else{
      setFormData({ ...formData, [name]: null })

      setErrors({ ...errors, [name]: t('validateFileFormat') })
    }
    } else {
      if(/^[a-zA-Z0-9 ]+$/.test(value) || value == "" ){

        setFormData({ ...formData, [name]: value })

      }else if(name == "dob" || name == "description" || name == "makan"){
        setFormData({ ...formData, [name]: value })
      } else {
        setFormData({ ...formData, [name]: "" })
        toast.error("Special characters are not allowed")

      }
    }
  }

  const handleSaveHOF = async() => {
    // const validationErrors = {};
    const validationErrors = validateForm(formData);
    let body = {
      "memberName": formData?.EnglishName || "",
      "memberNameHin": formData?.hindiName || "",
      "relativeName": formData?.relative || "",
      "relationId": formData?.relation || 0,
      "dateOfBirth": formData?.dob || "",
      "genderId": formData?.gender || 0,
      "memberStatusId":  "1",
      "referenceNo": formData?.refrence || "",
      "qualificationId": formData?.education || 0,
      "professionId": formData?.work || 0,
      "socialCategoryId": formData?.category || 0,
      "socialSubCategory": formData?.subCategory || "",
      "rationCardNo": formData?.rationCard || "",
      "religionId": formData?.religion || 0,
      "aadhaarNo": formData?.adharCard?.replaceAll(" ", "") || "",
      "isHead": true,
      "remarks": formData?.description || "",
      // "familyId": addData?.id,
      // "himParivarId" : addData?.HimParivarId,
       dastavage: formData?.dastavage || "",
      dastavage2 :  formData?.dastavage2 || "",
      himMemberId: selectedFamilyMember?.[0]?.HimmemberID,


    }
    const extra = () => {
      dispatch(getfamilymember(addFamilyData?.id,startLoading, stopLoading))
      // setActiveStepper(2)
    }
    if (Object.keys(validationErrors).length === 0) {
      onSaveFamily(body,extra)
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
    } else if (formData.adharCard?.trim()?.length < 12) {
      errors.adharCard = t("validateAadharLength");
    }
    if (!formData.dastavage) {
      errors.dastavage = t("validateDocument");
    }
    if (formData?.subCategory &&!formData.dastavage2) {
      errors.dastavage2 = t("validateSupportingDocument");
    }
    if (!formData.description) {
      errors.description = t("validateComment");
    }

    return errors;
  };

  return (
    <>
     <Grid container spacing={3} mt={0}>

<Grid item xs={12} sm={4} md={3}>
  <InputFieldWithIcon
    title={t('headOfFamilyName')}
    subTitle="(in English)"
    // icon={<IoIosDocument size={20} />}
    placeholder=""
    type="text"
    name="EnglishName"
    value={formData?.EnglishName}
    onChange={(e) => { handleChange(e) }}
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
  <div style={{ display: "flex" }}>
    <SelectDropdown
      style={{ paddingTop: 6, paddingBottom: 6 }}
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
      topStyle={{width : "100%"}}
      type="text"
      name="relative"
      value={formData?.relative}
      placeholder="Enter relative name"
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
{/* <Grid item xs={12} sm={4} md={3}>
  <SelectDropdown
    title={t('baseOfRegistration')}
    name="registrationBase"
    options={memberStatusList?.map(v => ({ value: v?.id, label: v?.nameE }))}

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
          {errors?.subCategory && <p className="error">{errors?.subCategory}</p>}

        </Grid>}
{/* <Grid item xs={12} sm={4} md={3}>
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
    }} />

</Grid> */}
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
    }}    name="adharCard"
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
{formData?.subCategory &&<Grid item xs={12} sm={4} md={3}>
  <FileUpload
    title={t('manifesto')}
    // subTitle="(Bonafide Himachal)"
    requried
    name="dastavage2"
    // value={formData?.rationCard}
    onChange={handleChange}
    accept="image/*"

  />
            {formData?.dastavage2 && <a href={URL.createObjectURL(formData.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

  {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

</Grid>}
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
<SubmitButton label="Save Member" icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSaveHOF} />
</div>
    </>
  )
}

export default Step2
