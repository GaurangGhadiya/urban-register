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
import { Box, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import SubmitButton from '@/components/SubmitBtn';
import formatDate from '@/utils/formatDate';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import toast from 'react-hot-toast';
import SelectDropdown from '@/components/SelectDropdown';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey, isAlphanumericKey } from '@/utils/regex';
import FileUpload from '@/components/FileUpload';
import { getDistrict } from '@/network/actions/getDistrict';
import { getEconomicStatus } from '@/network/actions/economicStatus';
import { getCategory } from '@/network/actions/getCategory';
import { useTranslation } from 'react-i18next';
import { separateMember } from '@/network/actions/separateMember';
import { getFamilyList } from '@/network/actions/getFamilyList';
import KeyValueDetails from '@/components/KeyValueDetails';
import { TransferMember } from '@/network/actions/TransferMember';
import TextArea from '@/components/TextArea';
import { useLoading } from '@/utils/LoadingContext';
import { MdClose } from 'react-icons/md';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ViewFamilyModal = ({ open, handleClose, viewData }) => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch()
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData)
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
  const [withOrWithoutRation, setWithOrWithoutRation] = React.useState("urban")
  const [selectRadio, setselectRadio] = React.useState("5")
  const [remarks, setRemarks] = React.useState("")





  React.useEffect(() => {
    setOriginalData(viewData)
    setNewData(viewData)
  }, [viewData])
  React.useEffect(() => {
    if (newData?.districtCode) {
      dispatch(getMunicipalities({ districtCode: viewData?.districtCode }, startLoading, stopLoading ))
    }
  }, [newData?.districtCode])
  React.useEffect(() => {
    if (newData?.municipalityId) {
      dispatch(getWard({ municipalId: viewData?.municipalityId }, startLoading, stopLoading ))
    }
  }, [newData?.municipalityId])
  React.useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading ))
    dispatch(getEconomicStatus())
    dispatch(getCategory())
  }, [])
  React.useEffect(() => {
    let data = [...getfamilymemberList]
    let newData = data?.map(v => ({ ...v, isChecked: false, isHead: false }))
    setRationCardData(newData)
  }, [getfamilymemberList])
  React.useEffect(() => {
    if (viewData?.family_id) {

      dispatch(getfamilymember(viewData?.family_id,startLoading, stopLoading))
    }
  }, [viewData])
  React.useEffect(() => {
    if (getfamilymemberList) {

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

      if (selectedFile && selectedFile.size <= 1024 * 1024) {
        setNewData({ ...newData, [name]: e.target.files[0] })
        setErrors({ ...errors, [name]: "" })
      } else {
        setNewData({ ...newData, [name]: null })

        setErrors({ ...errors, [name]: t('validateFileSize') })
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
    } else {
      const extra = () => {
        handleClose()
        dispatch(getFamilyList(formData,startLoading, stopLoading))

      }
      let body = {
        remarks: remarks,
        transferTo:selectRadio =="3" ? "marriage" : withOrWithoutRation,
        transferId : selectRadio,
        TransferMembers: {
          "members": rationCardData?.filter(v => v?.isChecked)?.map(k => +k?.familyMemberId),
          isHead: rationCardData?.find(v => v?.isHead)?.familyMemberId,

        }

      }

      dispatch(TransferMember(body, extra))
      // setSelectedFamilyMember(rationCardData?.filter(v => v?.isChecked)?.familyMemberId)
    }

  }
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >

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
         <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
         <MdClose color='white' size={18}/>
         </Box>
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"District"} value={viewData?.district} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"Municipal"} value={viewData?.municipalName} />
            </Grid>

            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"Ward"} value={viewData?.wardName} />
            </Grid>
            {/* <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"Economic Status"} value={viewData?.economic} />
            </Grid> */}
            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"Mobile Number"} value={viewData?.mobileNumber} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"RationCard Number"} value={viewData?.rationCardNo} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} >
              <KeyValueDetails title={"Category"} value={viewData?.socialCategory} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} >
              <FormControl>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={selectRadio}
                  onChange={(e) => setselectRadio(e.target.value)}
                  name="radio-1-group"
                  row
                >
                  <FormControlLabel value="5" control={<Radio />} label="Transfer" />
                  <FormControlLabel value="3" control={<Radio />} label="Marriage" />
                </RadioGroup>
              </FormControl>
              {/* <FormLabel style={{ color : "black"}}>Transfer To</FormLabel> */}

            </Grid>
            {selectRadio == "5" && <Grid item xs={12} sm={4} md={3} >
              {/* <FormLabel style={{ color: "black" }}>Transfer To</FormLabel> */}

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={withOrWithoutRation}
                  onChange={(e) => setWithOrWithoutRation(e.target.value)}
                  name="radio-1-group"
                  row
                >
                  <FormControlLabel value="urban" control={<Radio />} label="Urban" />
                  <FormControlLabel value="rural" control={<Radio />} label="Rural" />
                </RadioGroup>
              </FormControl>

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
                      {/* <th className={style.th}>HOF</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {rationCardData?.filter(k => k?.isChecked)?.map(v => <>
                      <tr className={style.tr}>
                        <td className={style.td}>{v?.memberName}</td>
                        <td className={style.td}>{formatDate(v?.date_of_birth) || "-"}</td>
                        <td className={style.td}>{v?.aadhaarNo ? FormatAadharNumber(v?.aadhaarNo) : "-"}</td>
                        {/* <td className={style.td}>
                          <input type="radio"
                            checked={v?.isHead}
                            name='head' className={style.checkbox}
                            onChange={(e) => setRationCardData(rationCardData?.map(p => p?.memberName == v?.memberName ? { ...p, isHead: e.target.checked } : p))}
                          />
                        </td> */}

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
                style={{ width: "100%" }}
                name="description"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}

              />
            </Box>
            <div className={style.save} style={{ textAlign: "right", width: "100%" }}>
              <SubmitButton onClick={handleClose} label="Cancel" type ="cancel"/>

              <SubmitButton label="Transfer" style={{ marginLeft: "10px" }} onClick={() => saveAndAddDetails()} />
              {/* <SubmitButton label={t('proceedToAddFamily')} onClick={() => saveAndAddDetails()} /> */}
            </div>
          </Grid>


        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ViewFamilyModal