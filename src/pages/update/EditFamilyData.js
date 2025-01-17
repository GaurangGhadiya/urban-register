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
import SubmitButton from '@/components/SubmitBtn';
import CancelBtn from '@/components/CancelBtn';
import { Box, Grid } from '@mui/material';
import KeyValueDetails from '@/components/KeyValueDetails';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import formatDate from '@/utils/formatDate';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { MdCheck, MdClose, MdModeEdit } from 'react-icons/md';
import { isAlphabateKey, isAlphanumericKey, isNumericKeyWithHifan } from '@/utils/regex';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import SelectDropdown from '@/components/SelectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import FileUpload from '@/components/FileUpload';
import TextArea from '@/components/TextArea';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const EditFamilyData = ({ onSubmit, onCancle, open, data,handleChange,getfamilymemberList }) => {
    const { t } = useTranslation("translation");
    const dispatch = useDispatch()
    const economicStatusList = useSelector((state) => state.getEconomicStatus?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
    React.useEffect(() => {
        dispatch(getEconomicStatus())
        dispatch(getCategory())
      }, [])

  return (
    <React.Fragment>

    <BootstrapDialog
        onClose={onCancle}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
    >
        <DialogTitle sx={{ m: 0, p: 2, textAlign : "center", fontWeight : 500 }} id="customized-dialog-title">
  Edit Family
</DialogTitle>
<IconButton
          aria-label="close"
          onClick={onCancle}
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
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3} >
                <InputFieldWithIcon
            // title={t('rathinCardNumber')}
            title={t('himParivarNo')}
            // icon={<IoIosDocument size={20} />}
            placeholder=""
            type="text"
            name="himparivar_no"
            value={getfamilymemberList?.[0]?.himParivarId || ""}
            onChange={handleChange}
            disabled

          />


                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                <SelectDropdown
    title={t('headOfFamilyName')}
    name="headName"
          options={getfamilymemberList?.map(v => ({value : v?.familyMemberId, label : v?.memberName}))}
          value={data?.headName}
          onChange={handleChange}
          requried
        />

                </Grid>
                <Grid item xs={12} sm={4} md={3} >
        <InputFieldWithIcon
          title={t('mobileNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="mobileNumber"
          value={data?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}
          onChange={(e) => e.target.value?.length > 11 ? null : handleChange(e)}
          onKeyDown={(e) => {
            if (!(isNumericKeyWithHifan(e.key) || e.key === 'Backspace'|| e.key === "ArrowLeft"|| e.key === "ArrowRight")) {
              e.preventDefault();
            }
          }}
          requried
        />
        {/* {errors?.mobile && <p className="error">{errors?.mobile}</p>} */}


                </Grid>
                <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('houseNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="houseAddress"
          value={data?.houseAddress}
          onChange={ handleChange}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {/* {errors?.makan && <p className="error">{errors?.makan}</p>} */}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('financialCondition')}
          name="economicId"
          options={economicStatusList?.map(v => ({value : v?.id, label : v?.nameE}))}
          value={data?.economicId}
          onChange={handleChange}
          requried
        />
        {/* {errors?.condition && <p className="error">{errors?.condition}</p>} */}

      </Grid>
    {data?.economicId == "2" &&  <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('bplCount')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="number"
          onKeyDown={(e) => e.key == "e" ? e.preventDefault() : null}
          name="bplNumber"
          value={data?.bplNumber}
          onChange={handleChange}
          requried
        />
        {/* {errors?.bpl && <p className="error">{errors?.bpl}</p>} */}

      </Grid>}
      <Grid item xs={12} sm={4} md={3}>
        <SelectDropdown
          title={t('category')}
          name="socialCategoryId"
          options={categorylist?.map(v => ({value : v?.id, label : v?.nameE}))}
          value={data?.socialCategoryId}
          onChange={handleChange}
          requried
        />
        {/* {errors?.class && <p className="error">{errors?.class}</p>} */}

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('subCategory')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="socialSubCategory"
          value={data?.socialSubCategory}
          onChange={ handleChange}
          onKeyDown={(e) => {
            if (!isAlphabateKey(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {/* {errors?.subclass && <p className="error">{errors?.subclass}</p>} */}

      </Grid>
     <Grid item xs={12} sm={4} md={3}>
        <InputFieldWithIcon
          title={t('rathinCardNumber')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="rationCardNo"
          value={data?.rationCardNo}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
          requried
        />
        {/* {errors?.rationCard && <p className="error">{errors?.rationCard}</p>} */}

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

      {data?.dastavage && <a href={URL.createObjectURL(data.dastavage)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

        {/* {errors?.dastavage && <p className="error">{errors?.dastavage}</p>} */}

      </Grid>
      {data?.socialSubCategory && <Grid item xs={12} sm={4} md={3}>
        <FileUpload
          title={t('manifesto')}
          // subTitle="(Declaration & Report)"
          requried
          name="dastavage2"
          onChange={handleChange}
          accept="image/*"
        />


{data?.dastavage2 && <a href={URL.createObjectURL(data.dastavage2)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}

        {/* {errors?.dastavage2 && <p className="error">{errors?.dastavage2}</p>} */}

      </Grid>}

      <Grid item xs={24} sm={24} md={24}>
  <TextArea
    title={t('comment')}
    placeholder="Text area"
    requried
    name="description"
    value={data?.description}
    onChange={handleChange}

  />
  {/* {errors?.description && <p className="error">{errors?.description}</p>} */}

</Grid>


            </Grid>
            <Box style={{ display: "flex" }} justifyContent={"center"} mt={2}>
                <SubmitButton label="Cancel" icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} type ="cancel" onClick={onCancle} />
                <SubmitButton label="Submit" icon={<MdCheck size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={onSubmit} style={{ marginLeft: "10px" }} />
            </Box>
        </DialogContent>
        {/* <DialogActions>
  <Button autoFocus onClick={onSubmit}>
    Save changes
  </Button>
</DialogActions> */}
    </BootstrapDialog>
</React.Fragment>
  )
}

export default EditFamilyData
