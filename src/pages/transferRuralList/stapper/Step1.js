import FileUpload from '@/components/FileUpload';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SelectDropdown from '@/components/SelectDropdown';
import SubmitButton from '@/components/SubmitBtn';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { getDistrict } from '@/network/actions/getDistrict';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import getDefaultData from '@/utils/getDefaultData';
import { useLoading } from '@/utils/LoadingContext';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan } from '@/utils/regex';
import { Divider, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { MdOutlineSave } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import style from '../TransferList.module.css'
import toast from 'react-hot-toast';

const Step1 = ({setActiveStepper,selectedFamilyMember,formData, setFormData,onSave, errors, setErrors}) => {
    const { loading, startLoading, stopLoading } = useLoading();
    const { t } = useTranslation("translation");
    const dispatch = useDispatch()

    const districtList = useSelector((state) => state.getDistrict?.data)
    const municipalList = useSelector((state) => state.getMunicipalities?.data)
    const wardList = useSelector((state) => state.getWard?.data)
    const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
    const categorylist = useSelector((state) => state.getCategory?.data)

    // const [formData, setFormData] = React.useState({})
    // const [errors, setErrors] = React.useState({});


    useEffect(() => {
        dispatch(getDistrict(startLoading, stopLoading))
        dispatch(getEconomicStatus())
        dispatch(getCategory())
        // getfamilymemberSuccess([])
      }, [])

      useEffect(() => {
        if (selectedFamilyMember?.[0]?.DistLGDCode && !formData?.district){
          dispatch(getMunicipalities({ districtCode: selectedFamilyMember?.[0]?.DistLGDCode?.toString() } , startLoading, stopLoading ))
          setFormData({ ...formData, district: selectedFamilyMember?.[0]?.DistLGDCode })
        }
      }, [selectedFamilyMember])
      useEffect(() => {
        if(selectedFamilyMember?.[0]?.MC && formData?.district){
          dispatch(getWard({ municipalId: selectedFamilyMember?.[0]?.MC?.toString() }, startLoading, stopLoading ))
          setFormData({...formData, municipal : +selectedFamilyMember?.[0]?.MC })
        }
      }, [formData?.district])
      useEffect(() => {
        if(selectedFamilyMember?.[0]?.WardCode && formData?.municipal){
          setFormData({...formData, ward : +selectedFamilyMember?.[0]?.WardCode})
        }
      }, [formData?.municipal])



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
            }
          } else {
            setErrors({ ...errors, [name]: t('validateFileFormat') })

          }
        } else {
          if (/^[a-zA-Z0-9 ]+$/.test(value) || value == "") {

            setFormData({ ...formData, [name]: value })

          } else if (name == "dob" || name == "description" || name == "makan" || name == "mobile") {
            setFormData({ ...formData, [name]: value })
          } else {
            setFormData({ ...formData, [name]: "" })
            toast.error("Special characters are not allowed")

          }

        }
      }
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
      {formData?.class == "2" &&<Grid item xs={12} sm={4} md={3}>
          <SelectDropdown
            title={t('tribesCategory')}
            name="subClass"
            options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
            value={formData?.subClass}
            onChange={handleChange}
          // requried
          />
        {/* {errors?.subclass && <p className="error">{errors?.subclass}</p>} */}

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
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {errors?.rationCard && <p className="error">{errors?.rationCard}</p>}

      </Grid>
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
      <SubmitButton label={"Save and Add Member"} icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={() => onSave()} />
      {/* <SubmitButton label={t('saveAndAddHof')} icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={() => onSave()} /> */}
    </div>
  </div>
  )
}

export default Step1
