import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepConnector, Typography } from '@mui/material';
import AddFamily from './AddFamily';
import AddHOF from './AddHOF';
import AddMember from './AddMember';
import { useDispatch, useSelector } from 'react-redux';
import { addFamily } from '@/network/actions/addFamily';
import { useLoading } from '@/utils/LoadingContext';
import { isValidMobileNumber } from '@/utils/formatAadharNumber';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { isValidRationCardNumber } from '@/utils/regex';


const steps = [
  'Add Family',
  'Add HOF',
  'Add Member',
];

// const useStyles = makeStyles((theme) => ({
//   stepper: {
//     backgroundColor: 'lightblue', // Change this to your desired color
//   },
//   stepConnector: {
//     // Optionally, style the connectors between steps
//     '& .MuiStepConnector-line': {
//       borderColor: 'lightblue',
//     },
//   },
// }));

export default function StepperView({ selectedFamilyMember, withOrWithoutRation, setWithOrWithoutRation, setState }) {
  const dispatch = useDispatch()
  const { t } = useTranslation("translation");


  const { loading, startLoading, stopLoading } = useLoading();
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])

  const [activeStepper, setActiveStepper] = React.useState(0)
  const [formData, setFormData] = React.useState({})
  const [formDataHof, setFormDataHof] = React.useState({
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
    category: formData?.class || "",
    subCategory: "",
    rationCard: "",
    religion: "",
    adharCard: "",
    dastavage: "",
    dastavage2: "",
    description: ""
  })
  const [formDataMember, setFormDataMember] = React.useState({
    EnglishName: "",
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
    // category: getFamilyByIdData?.socialCategory || "",
    category:  "",
    subCategory: "",
    rationCard: "",
    // rationCard: getFamilyByIdData?.rationCardNo || "",
    religion: "",
    adharCard: "",
    dastavage: "",
    dastavage2: "",
    description: "",
    isEditModeMember: false,
  })
  const [errors, setErrors] = React.useState({});

  // React.useEffect(() => {
  //   if (selectedFamilyMember) {

  //     setFormData({
  //       ...formData,
  //       rationCard: selectedFamilyMember?.[0]?.rationCardNumber || "",
  //       makan: selectedFamilyMember?.[0]?.address || "",
  //       mobile: selectedFamilyMember?.[0]?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2') || "",
  //     })
  //   }
  // }, [selectedFamilyMember])


  const onSave = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      toast.success("Family saved sucessfully")
      setActiveStepper(1)
    } else {
      setErrors(validationErrors);
    }
  }

  const onSaveFamily = (newBody, newExtra) => {
    // const validationErrors = {};
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        houseAddress: formData?.makan || "",
        rationCardNo: formData?.rationCard || "",
        socialSubCategory: formData?.socialSubCategory || "",
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
        // tribeCategory: formData?.tribeCategory || "",
        bplYear: formData?.bplYear || "",
      }
      const extra = () => {
        // setActiveStepper(1)
        // newFunc(addFamilyData)
      }

      dispatch(addFamily(body, extra, startLoading, stopLoading, newBody, newExtra))


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
    if (formData?.condition == "2" && !formData.bplYear?.trim()) {
      errors.bplYear = t("validateBPLYear");
    }
    if (!formData.class?.trim() || formData?.class == "0") {
      errors.class = t("validateCategory");
    }
    // if (!formData.tribeCategory?.trim() && formData?.class == "2") {
    //   errors.tribeCategory = t("validateTribeCategory");
    // }
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
        <Stepper activeStep={activeStepper} alternativeLabel >
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
      {activeStepper == 0 && <AddFamily setActiveStepper={setActiveStepper} selectedFamilyMember={selectedFamilyMember} formData={formData} setFormData={setFormData} onSave={onSave} errors={errors} setErrors={setErrors} withOrWithoutRation={withOrWithoutRation} setWithOrWithoutRation={setWithOrWithoutRation} setState={setState} />}
      {activeStepper == 1 && <AddHOF setActiveStepper={setActiveStepper} selectedFamilyMember={selectedFamilyMember} onSaveFamily={onSaveFamily} formData1={formData} formData={formDataHof} setFormData={setFormDataHof } />}
      {activeStepper == 2 && <AddMember selectedFamilyMember={selectedFamilyMember} formData={formDataMember} setFormData={setFormDataMember} />}
    </>
  );
}
