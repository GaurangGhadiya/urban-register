import MainLayout from '@/layout/MainLayout'
import { useLoading } from '@/utils/LoadingContext';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import { isValidMobileNumber } from '@/utils/formatAadharNumber';
import { isValidRationCardNumber } from '@/utils/regex';
import toast from 'react-hot-toast';
import { addFamily } from '@/network/actions/addFamily';
import { useRouter } from 'next/router';


const steps = [
    'Add Family',
    'Add Member',
  ];
const CreateFamily = ({dataArray}) => {
const router = useRouter()
  const dispatch = useDispatch()
    const { t } = useTranslation("translation");
    const { loading, startLoading, stopLoading } = useLoading();

    const [activeStepper, setActiveStepper] = React.useState(0)
    const [formData, setFormData] = React.useState({})
    const [errors, setErrors] = React.useState({});

    const onSave = () => {
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
  toast.success("Family saved sucessfully")
        setActiveStepper(1)
      }else{
        setErrors(validationErrors);
      }
    }

    const onSaveFamily = (newBody,newExtra) => {
      // const validationErrors = {};

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
        let body = {
          houseAddress: formData?.makan || "",
          rationCardNo: formData?.rationCard || "",
          socialSubCategory: formData?.subclass || "",
          wardId: formData?.ward || 0,
          districtCode: formData?.district || 0,
          socialCategoryId: formData?.class || 0,
          municipalityId: formData?.municipal || 0,
          mobileNumber: formData?.mobile?.replace("-", "") || "",
          bplNumber: formData?.bpl || "",
          active: true,
          economicId: formData?.condition || 0,
          dastavage: formData?.dastavage || "",
          dastavage2: formData?.dastavage2 || "",
          transferType : "rural"
        }
        const extra = () => {
          // setActiveStepper(1)
          // newFunc(addFamilyData)
          router.push('/transferRuralList')
        }

        dispatch(addFamily(body, extra, startLoading, stopLoading,newBody,newExtra))


      } else {
        setErrors(validationErrors);
      }
    }

    const validateForm = (formData) => {
      const errors = {};
      if (!formData.municipal || formData?.municipal == "0") {
        errors.municipal = t('validateMunucipal');
      }
      if (!formData.district || formData?.district == "0") {
        errors.district = t('validateDistrict');
      }
      if (!formData.ward || formData?.ward == "0") {
        errors.ward = t("validateward");
      }
      if (!formData.makan?.trim()) {
        errors.makan = t("ValidateHouseNumber");
      }
      if (!formData.condition?.trim() || formData?.condition == "0") {
        errors.condition = t("validateCondition");
      }
      if (formData?.condition == "2" && !formData.bpl?.trim()) {
        errors.bpl = t("validateBPL");
      }
      if (!formData.class?.trim() || formData?.class == "0") {
        errors.class = t("validateCategory");
      }
      // if (!formData.subclass?.trim()) {
      //   errors.subclass = t("validateSubCategory");
      // }
      if (!formData.rationCard?.trim()) {
        errors.rationCard = t("validateRationCard");
      }
     else if (!isValidRationCardNumber(formData.rationCard?.trim())) {
        errors.rationCard = t("validateRationCardValidation");
      }
      if (!formData.mobile?.trim()) {
        errors.mobile = t("validateMobile");
      }
     else if (formData.mobile?.length < 11) {
        errors.mobile = t("validateMobileLength");
      }
      else if (!isValidMobileNumber(formData.mobile?.replace("-", "")?.trim())) {
        errors.mobile = t("validateMobileStart");
      }
      if (!formData.dastavage) {
        errors.dastavage = t("validateDocument");
      }
      if (formData?.subclass && !formData.dastavage2) {
        errors.dastavage2 = t("validateSupportingDocument");
      }

      return errors;
    };
    return (
    <>
        <Box sx={{ width: '100%' }} mt={5}>
        <Stepper  activeStep={activeStepper} alternativeLabel >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
              StepIconProps={{
                classes: {
                  completed: 'completed-step-icon',
                  active: 'active-step-icon',
                }
              }}
              >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      </Box>
      {activeStepper == 0 && <Step1 setActiveStepper={setActiveStepper}
      selectedFamilyMember={dataArray}
       formData={formData} setFormData={setFormData} onSave={onSave} errors={errors} setErrors={setErrors}
       />}
      {activeStepper == 1 && <Step2 setActiveStepper={setActiveStepper} selectedFamilyMember={dataArray}
      onSaveFamily={onSaveFamily} formData1={formData}
      />}
    </>
  )
}

export default CreateFamily
