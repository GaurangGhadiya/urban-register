import React, { useEffect, useState } from 'react'
import style from "./registration.module.css"
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphanumericKey } from '@/utils/regex';
import { useDispatch, useSelector } from 'react-redux';
import { getRationDetails } from '@/network/actions/getRationDetails';
import { debounce } from 'lodash';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SubmitButton from '@/components/SubmitBtn';
import toast from 'react-hot-toast';
import AddFamilyDetails from './AddFamilyDetails';
import AddHofAndMemberDetails from './AddHofAndMemberDetails';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import BeneficiaryModal from './BeneficiaryModal';
import StepperView from './stepperView';
import { useLoading } from '@/utils/LoadingContext';
import Loader from '@/utils/Loader';
import { MdArrowForward, MdRemoveRedEye, MdSearch } from 'react-icons/md';

const AddParivarRation = ({ setState, state, setWithOrWithoutRation }) => {
    const { t } = useTranslation("translation");
    const { loading, startLoading, stopLoading } = useLoading();


    const dispatch = useDispatch()
    const rationDetails = useSelector((state) => state.getRationDetails?.data || [])
    const [rationCardData, setRationCardData] = useState([])
    const [selectedFamilyMember, setSelectedFamilyMember] = useState([])

    const [formData, setFormData] = useState({ rationCard: "" })
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      if(formData?.rationCard && rationDetails){
        setRationCardData([])
      }
    }, [formData?.rationCard])


    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const debouncedSearch = debounce(async (value) => {
        dispatch(getRationDetails(value?.toUpperCase()))

    }, 1000);
    const handleChange = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
        // if (value?.length > 4)
        //  debouncedSearch(value)
    }
    useEffect(() => {
        let data = [...rationDetails]
        let newData = data?.map(v => ({ ...v, isChecked: false, isHead: false }))
        setRationCardData(newData)
    }, [rationDetails])

    const saveAndAddDetails = () => {
        let isChecked = rationCardData.some(v => v.isChecked)
        let isHead = rationCardData.some(v => v.isHead)
        if (!isChecked) {
            toast.error("Please select family member")
        } else if (!isHead) {
            toast.error("Please select head of family")
        } else {
            setState("2")
            setSelectedFamilyMember(rationCardData?.filter(v => v?.isChecked))
        }

    }


    return (
        <div style={{ marginTop:(state == "1" || state == "2") ? "0px" : "20px" }}>
            {/* {(state == "1" || state == "2") && <div className={style.heading}>New Family</div>} */}
         <Grid container spacing={3} >
         {(state == "1" || state == "2") &&<>
                <Grid item xs={12} sm={4} md={4}>
                    <InputFieldWithIcon
                        title={t('rathinCardNumber')}
                        // icon={<IoIosDocument size={20} />}
                        placeholder=""
                        type="text"
                        name="rationCard"
                        style={{textTransform : 'uppercase'}}
                        disabled={state != "1" ? true : false}
                        value={formData?.rationCard}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (!isAlphanumericKey(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        requried
                    />

                </Grid>
                <Grid item xs={12} sm={4} md={4} mt={3.2}>
                <SubmitButton label="Search" icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={() => dispatch(getRationDetails(formData?.rationCard?.toUpperCase(), startLoading, stopLoading))}/>

                </Grid>

                </>
           }
          {state == "2" &&  <Grid item xs={12} sm={4} md={4} mt={3}>
                <SubmitButton label={"View All Members"} icon={<MdRemoveRedEye size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleClickOpen} />

                </Grid>}
            </Grid>
            {state == "2" && <StepperView selectedFamilyMember={selectedFamilyMember} setWithOrWithoutRation={setWithOrWithoutRation} setState={setState} />}
            {state == "1" ? (rationCardData?.length > 0 && formData?.rationCard) ? <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <div className={style.tablewrapper} style={{ margin: "0" }}>
                        <table className={style.table}>
                            <thead className={style.thead}>
                                <tr className={style.tr}>
                                    <th className={style.th}>

                                    </th>
                                    <th className={style.th}>Name</th>
                                    <th className={style.th}>Financial Condition</th>
                                    <th className={style.th}>Aadhaar Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rationCardData?.map(v => <>
                                    <tr className={style.tr}>
                                        <td className={style.td}>
                                            <input type="checkbox" className={style.checkbox} value={v?.isChecked}
                                                onChange={(e) => setRationCardData(rationCardData?.map(p => p?.memberName == v?.memberName ? { ...p, isChecked: e.target.checked } : p))}
                                            />
                                        </td>
                                        <td className={style.td}>{v?.memberName}</td>
                                        <td className={style.td}>{v?.cardType || "-"}</td>
                                        <td className={style.td}>{v?.aadhaarNumber ? FormatAadharNumber(v?.aadhaarNumber) : "-"}</td>

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
                                    <th className={style.th}>Financial Condition</th>
                                    <th className={style.th}>Aadhaar Number</th>
                                    <th className={style.th}>HOF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rationCardData?.filter(k => k?.isChecked)?.map(v => <>
                                    <tr className={style.tr}>
                                        <td className={style.td}>{v?.memberName}</td>
                                        <td className={style.td}>{v?.cardType}</td>
                                        <td className={style.td}>{v?.aadhaarNumber ? FormatAadharNumber(v?.aadhaarNumber) : "-"}</td>
                                        <td className={style.td}>
                                            <input type="radio"
                                                checked={v?.isHead}
                                                name='head' className={style.checkbox}
                                                onChange={(e) => setRationCardData(rationCardData?.map(p => p?.memberName == v?.memberName ? { ...p, isHead: e.target.checked } : p))}
                                            />
                                        </td>

                                    </tr>
                                </>)}

                            </tbody>
                        </table>


                    </div>
                </Grid>
                <div className={style.save} style={{ textAlign: "center", width: "100%" }}>
                    <SubmitButton label="Proceed To Add Family" icon={<MdArrowForward size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={() => saveAndAddDetails()} />
                    {/* <SubmitButton label={t('proceedToAddFamily')} onClick={() => saveAndAddDetails()} /> */}
                </div>
            </Grid> : (rationCardData?.length == 0 && formData?.rationCard) ?
                <Typography mt={5} textAlign={"center"}></Typography>
                 : state == "2" ? <StepperView /> : "" : ""}
                 {/* <AddFamilyDetails selectedFamilyMember={selectedFamilyMember} state={state} setState={setState} /> */}
                 {/* : state == "3" ? <AddHofAndMemberDetails selectedFamilyMember={selectedFamilyMember} state={state} setState={setState} setSelectedFamilyMember={setSelectedFamilyMember}/> : "" */}

        <BeneficiaryModal selectedFamilyMember={selectedFamilyMember} handleClose={handleClose} open={open}/>
        </div>
    )
}

export default AddParivarRation
