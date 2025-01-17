import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SelectDropdown from '@/components/SelectDropdown';
import { addFamily } from '@/network/actions/addFamily';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { getDistrict } from '@/network/actions/getDistrict';
import { getRationDetails } from '@/network/actions/getRationDetails';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan, isNumericKeyWithSpace } from '@/utils/regex';
import { Divider, Grid } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from "../registration.module.css"
import FileUpload from '@/components/FileUpload';
import SubmitButton from '@/components/SubmitBtn';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import Image from 'next/image';
import { isValidMobileNumber } from '@/utils/formatAadharNumber';
import { useLoading } from '@/utils/LoadingContext';
import Loader from '@/utils/Loader';
import { getfamilymemberSuccess } from '@/network/actions/getfamilymember';
import { MdArrowBack, MdOutlineSave } from 'react-icons/md';
import getDefaultData from '@/utils/getDefaultData';
import toast from 'react-hot-toast';

const AddFamily = ({ setActiveStepper, selectedFamilyMember, formData, setFormData, onSave, errors, setErrors, withOrWithoutRation, setWithOrWithoutRation, setState }) => {
    const { loading, startLoading, stopLoading } = useLoading();
    // const defaultData = getDefaultData()
    const { t } = useTranslation("translation");
    const dispatch = useDispatch()
    const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const [defaultData, setDefaultData] = useState({})


  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getEconomicStatus())
    dispatch(getCategory())
    getfamilymemberSuccess([])
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
    if (selectedFamilyMember?.length > 0 && defaultData?.district) {

    setTimeout(() => {
      setFormData({
        ...formData,
        rationCard: selectedFamilyMember?.[0]?.rationCardNumber || "",
        makan: selectedFamilyMember?.[0]?.address || "",
        mobile: selectedFamilyMember?.[0]?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2') || "",
        district: defaultData?.district,
        municipal: defaultData?.municipal,
        ward: defaultData?.ward


      })
    }, 1000);
    }

  }, [defaultData])



  const handleChange = (e) => {
    const { value, name } = e.target
    if (name == "dastavage" || name == "dastavage2") {
      const selectedFile = e.target.files[0];
      if (selectedFile?.type != "" && (selectedFile?.type?.includes("image/") || selectedFile?.type?.includes('/pdf'))){
        if (selectedFile && selectedFile.size <= 1024 * 1024) {
          setFormData({ ...formData, [name]: e.target.files[0] })
          setErrors({ ...errors, [name]: "" })
        } else {
          setFormData({ ...formData, [name]: null })

          setErrors({ ...errors, [name]: t('validateFileSize') })
        }
      }else{
        setFormData({ ...formData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileFormat') })
      }



    } else {
      if ((/^[a-zA-Z0-9 ]+$/.test(value) || value == "")) {

        setFormData({ ...formData, [name]: value })

      } else if (name == "dob" || name == "description" || name == "makan" || name == "mobile") {
        setFormData({ ...formData, [name]: value })
      } else {
        setFormData({ ...formData, [name]: "" })
        toast.error("Special characters are not allowed")
      }

    }
  }

  // const onSave = () => {
  //   // const validationErrors = {};

  //   const validationErrors = validateForm(formData);
  //   if (Object.keys(validationErrors).length === 0) {
  //     let body = {
  //       houseAddress:formData?.makan || "",
  //       rationCardNo:formData?.rationCard || "",
  //       socialSubCategory: formData?.subclass || "",
  //       wardId: formData?.ward || 0,
  //       districtCode: formData?.district || 0,
  //       socialCategoryId: formData?.class || 0,
  //       municipalityId: formData?.municipal || 0,
  //       mobileNumber: formData?.mobile?.replace("-", "") || "",
  //       bplNumber: formData?.bpl || "",
  //       active:true,
  //       economicId : formData?.condition || 0,
  //       dastavage: formData?.dastavage || "",
  //       dastavage2 :  formData?.dastavage2 || ""
  //   }
  //   const extra = () => {
  //       setActiveStepper(1)
  //   }

  //     dispatch(addFamily(body,extra, startLoading, stopLoading))


  //   } else {
  //     setErrors(validationErrors);
  //   }
  // }

  // const validateForm = (formData) => {
  //   const errors = {};
  //   if (!formData.municipal?.trim() || formData?.municipal == "0") {
  //     errors.municipal = t('validateMunucipal');
  //   }
  //   if (!formData.district?.trim() || formData?.district == "0") {
  //     errors.district = t('validateDistrict');
  //   }
  //   if (!formData.ward?.trim() || formData?.ward == "0") {
  //     errors.ward = t("validateward");
  //   }
  //   if (!formData.makan?.trim()) {
  //     errors.makan = t("ValidateHouseNumber");
  //   }
  //   if (!formData.condition?.trim() || formData?.condition == "0") {
  //     errors.condition = t("validateCondition");
  //   }
  //   if (formData?.condition == "2" && !formData.bpl?.trim()) {
  //     errors.bpl = t("validateBPL");
  //   }
  //   if (!formData.class?.trim() || formData?.class == "0") {
  //     errors.class = t("validateCategory");
  //   }
  //   // if (!formData.subclass?.trim()) {
  //   //   errors.subclass = t("validateSubCategory");
  //   // }
  //   if (!formData.rationCard?.trim()) {
  //     errors.rationCard = t("validateRationCard");
  //   }
  //   if (!formData.mobile?.trim()) {
  //     errors.mobile = t("validateMobile");
  //   }
  //  else if (formData.mobile?.length < 11) {
  //     errors.mobile = t("validateMobileLength");
  //   }
  //   else if (!isValidMobileNumber(formData.mobile?.replace("-", "")?.trim())) {
  //     errors.mobile = t("validateMobileStart");
  //   }
  //   if (!formData.dastavage) {
  //     errors.dastavage = t("validateDocument");
  //   }
  //   if (formData?.subclass && !formData.dastavage2) {
  //     errors.dastavage2 = t("validateDocument");
  //   }

  //   return errors;
  // };



  return (
    <div >
<Divider style={{marginTop : 20}}/>
    {/* <div className={style.heading}>{t('newFamily')}</div> */}
    {/* <div className={style.heading}>New Family</div> */}
    <Grid container spacing={3} mt={0}>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('district')}
          name="district"
          options={districtList?.map(v => ({value : v?.lgdCode, label : v?.nameE})) || []}
          value={formData?.district ?? null}
          onChange={(e) => {handleChange(e); dispatch(getMunicipalities({districtCode: e.target.value},startLoading, stopLoading))}}
          requried
        />
        {errors?.district && <p className="error">{errors?.district}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('selectVillage')}
          name="municipal"
          options={municipalList?.map(v => ({value : v?.id, label : v?.name}))}
          disabled={formData?.district != "" ?false : true}
          value={formData?.municipal}
          onChange={(e) => {handleChange(e); dispatch(getWard({municipalId: e.target.value},startLoading, stopLoading))}}
          requried
        />
        {errors?.municipal && <p className="error">{errors?.municipal}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('selectWard')}
          name="ward"
          disabled={formData?.district != "" && formData?.municipal != "" ? false : true}

          options={wardList?.map(v => ({value : v?.id, label : v?.name}))}

          value={formData?.ward}
          onChange={handleChange}
          requried
        />
        {errors?.ward && <p className="error">{errors?.ward}</p>}
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('houseNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="makan"
          value={formData?.makan}
          onChange={ handleChange}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.makan && <p className="error">{errors?.makan}</p>}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('financialCondition')}
          name="condition"
          options={economicStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}
          value={formData?.condition}
          onChange={handleChange}
          requried
        />
        {errors?.condition && <p className="error">{errors?.condition}</p>}

      </Grid>
    {formData?.condition == "2" &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('bplCount')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="number"
          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
          name="bpl"
          value={formData?.bpl}
          onChange={handleChange}
          requried
        />
        {errors?.bpl && <p className="error">{errors?.bpl}</p>}

      </Grid>}
    {formData?.condition == "2" &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('bplyear')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="number"
          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
          name="bplYear"
          value={formData?.bplYear}
          onChange={handleChange}
          requried
        />
        {errors?.bplYear && <p className="error">{errors?.bplYear}</p>}

      </Grid>}
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('category')}
          name="class"
          options={categorylist?.map(v => ({value : v?.id, label : v?.nameE}))}
          value={formData?.class}
          onChange={handleChange}
          requried
        />
        {errors?.class && <p className="error">{errors?.class}</p>}

      </Grid>
     {formData?.class == "2" && <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
            title={t('tribesCategory')}
          name="socialSubCategory"
            options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
          value={formData?.socialSubCategory}
          onChange={handleChange}
          // requried
        />
          {errors?.socialSubCategory && <p className="error">{errors?.socialSubCategory}</p>}

      </Grid>}
      {/* <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('subCategory')}
          placeholder=""
          type="text"
          name="subclass"
          value={formData?.subclass}
          onChange={ handleChange}
          onKeyDown={(e) => {
            if (!isAlphabateKey(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {errors?.subclass && <p className="error">{errors?.subclass}</p>}

      </Grid> */}
     {!selectedFamilyMember &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('rathinCardNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="rationCard"
          value={formData?.rationCard}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

      </Grid> }
      <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('mobileNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="mobile"
          value={formData?.mobile?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
          onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
          onKeyDown={(e) => {
            if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.mobile && <p className="error">{errors?.mobile}</p>}


      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FileUpload
          title={t('document')}
          subTitle="(Declaration & Report)"
          requried
          name="dastavage"
          onChange={handleChange}
          accept="image/*"
        />
       {/* {formData?.dastavage && ( formData.dastavage.type.startsWith('image/') ?   <Image src={URL.createObjectURL(formData?.dastavage)} alt="Uploaded file"  width={250} height={150}
        style={{marginTop: "10px", width : "100%", height : "auto"}}/> :
           <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>)
} */}
      {formData?.dastavage && <a href={URL.createObjectURL(formData.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

        {errors?.dastavage && <p className="error">{errors?.dastavage}</p>}

      </Grid>
      {formData?.subclass && <Grid item xs={12} sm={4} md={3}>
        <FileUpload
          title={t('manifesto')}
          // subTitle="(Declaration & Report)"
          requried
          name="dastavage2"
          onChange={handleChange}
          accept="image/*"
        />
       {/* {formData?.dastavage2 && ( formData.dastavage2.type.startsWith('image/') ?   <Image src={URL.createObjectURL(formData?.dastavage2)} alt="Uploaded file"  width={250} height={150}
        style={{marginTop: "10px", width : "100%", height : "auto"}}/> :
           <a href={URL.createObjectURL(formData.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>)
} */}

{formData?.dastavage2 && <a href={URL.createObjectURL(formData.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

        {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>}

      </Grid>}
    </Grid>


      <div className={style.save} >
        {selectedFamilyMember?.length > 0&&<> <SubmitButton label="Back"
          icon={<MdArrowBack size={18} style={{ marginTop: "5px", marginRight: "5px" }} />}
          onClick={() => { setWithOrWithoutRation("1"); setState("1")}} />&nbsp;&nbsp;&nbsp;</>}
      <SubmitButton label={t('saveAndAddHof')} icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={onSave} />
    </div>
  </div>
  )
}

export default AddFamily
