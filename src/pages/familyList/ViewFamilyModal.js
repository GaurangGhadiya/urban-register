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
import { Box, Grid } from '@mui/material';
import SubmitButton from '@/components/SubmitBtn';
import formatDate from '@/utils/formatDate';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import { isNumericKeyWithSpace } from '@/utils/regex';
import { getFamilyById } from '@/network/actions/getFamilyById';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { MdAdd, MdClose } from 'react-icons/md';
import AddMemberModal from '../registration/AddMemberModal';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ViewFamilyModal = ({open, handleClose, viewData, formData}) => {
    const dispatch = useDispatch()
    const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
    const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || {})

    const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData)
    const getfamilymemberDoc = useSelector((state) => state.getfamilymember?.data?.familyDocData)
const [memberList, setMemberList] = React.useState([])
const [headData, setHeadData] = React.useState({})
const [isHeadMore, setIsHeadMore] = React.useState(false)
const [isFamilyMore, setIsFamilyMore] = React.useState(false)
const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        if(viewData?.family_id){
          dispatch(getFamilyById(+viewData?.family_id))

            dispatch(getfamilymember(viewData?.family_id))
        }
    }, [viewData])
    React.useEffect(() => {
        if(getfamilymemberList){

            setMemberList(getfamilymemberList?.filter(v => v?.isHead != "true"))
            setHeadData(getfamilymemberList?.find(v => v?.isHead == "true"))
        }
    }, [getfamilymemberList])

    const viewMoreMember = (index, value) => {
        let newData = memberList?.map((v,i) => index == i ? {...v, memberDetailsMore : value} : v)
        setMemberList(newData)
    }


    const handleClickOpen = () => {
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setOpenModal(false);
    };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      maxWidth={"md"}
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
        {viewData && <><div className={style.heading} style={{ marginBottom: "5px"}}>Family Details</div>
        <div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>

                  <th className={style.th}>Him Parivar No.</th>
                  <th className={style.th}>District</th>
                  <th className={style.th}>Municipal</th>
                  <th className={style.th}>Ward</th>
                  <th className={style.th}>Ration Card No.</th>
                  <th className={style.th}>Economic Status</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{viewData?.himParivarId}</td>
                  <td className={style.td}>{viewData?.district}</td>
                  <td className={style.td}>{viewData?.municipalName}</td>
                  <td className={style.td}>{ viewData?.wardName}</td>
                  <td className={style.td}>{viewData?.rationCardNo}</td>
                  <td className={style.td}>{viewData?.economic}</td>
                  <td className={style.td}>

                    <div className="action">
                        {isFamilyMore ? <CloseBtn title="Close" onClick={() => { setIsFamilyMore(false) }} />
                        :<MoreBtn title="More" onClick={() => { setIsFamilyMore(true) }} /> }

                    </div>
                  </td>
                </tr>
                {isFamilyMore && <tr  >
                  <td colspan="12" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>District:</b> {viewData?.district}</p>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {viewData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>House No.:</b> {viewData?.houseAddress}</p>
                        <p className={style.expandMargin}><b>Declaration Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Consent")?.fileName} target='_' style={{color : "blue"}}>View</a></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Municipal:</b> {viewData?.municipalName}</p>
                        <p className={style.expandMargin}><b>Economic Status:</b> {viewData?.economic}</p>
                        <p className={style.expandMargin}><b>Total Members:</b> {viewData?.totalMembers}</p>
                        {getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName &&<p className={style.expandMargin}><b>Supporting Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}


                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ward:</b> {viewData?.wardName}</p>
                        <p className={style.expandMargin}><b>Category:</b> {viewData?.socialCategory}</p>
                        {viewData?.socialSubCategory &&<p className={style.expandMargin}><b>Sub Category:</b> {viewData?.socialSubCategory}</p>}

                      </Grid>
                    </Grid>
                  </td>
                </tr>}
              </tbody>
            </table>


          </div></>}
        {headData && <><div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>HOF Details</div>
        <div className={style.tablewrapper} style={{ margin: "0" }}>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Him Member ID</th>
                  <th className={style.th}>Head of Family Name</th>
                  <th className={style.th}>Aadhaar No.</th>
                  <th className={style.th}>Religion</th>
                  <th className={style.th}>Category</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>{headData?.himMemberId}</td>
                  <td className={style.td}>{headData?.memberName}</td>
                  <td className={style.td}>{FormatAadharNumber(headData?.aadhaarNo)}</td>
                  <td className={style.td}>{ headData?.religion}</td>
                  <td className={style.td}>{headData?.socialCategory}</td>
                  <td className={style.td}>

                    <div className="action">
                        {isHeadMore ? <CloseBtn title="Close" onClick={() => { setIsHeadMore(false) }} />
                        :<MoreBtn title="More" onClick={() => { setIsHeadMore(true) }} /> }

                    </div>
                  </td>
                </tr>
                {isHeadMore && <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Head Of Family:</b> {headData?.memberName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formatDate(headData?.date_of_birth)}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {headData?.gender}</p>
                        {getfamilymemberDoc?.find(k => k?.memberId == headData?.familyMemberId && k?.document == "Cast Certificate")?.fileName && <p className={style.expandMargin}><b>Supporting  Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == headData?.familyMemberId && k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Reference No.:</b> {headData?.reference_no}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {headData?.religion}</p>
                        <p className={style.expandMargin}><b>Category:</b> {headData?.socialCategory}</p>

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {headData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>Aadhaar No.:</b> {FormatAadharNumber(headData?.aadhaarNo)}</p>
                        <p className={style.expandMargin}><b>Bonafide Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == headData?.familyMemberId && k?.document == "Bonafide Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>

                        {/* <p className={style.expandMargin}><b>Sub Category:</b> {formData?.subCategory}</p> */}

                      </Grid>
                    </Grid>
                  </td>
                </tr>}
              </tbody>
            </table>


          </div></>}
          {memberList?.length > 0 && <><div className={style.heading} style={{ marginBottom: "5px", marginTop: "20px" }}>Member Details</div>
            <div className={style.tablewrapper} style={{ margin: "0" }}>
              <table className={style.table}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                  <th className={style.th}>Him Member ID</th>

                    <th className={style.th}>Family Member Name</th>
                    <th className={style.th}>Aadhaar No.</th>
                    <th className={style.th}>Religion</th>
                    <th className={style.th}>Category</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {memberList?.map((v, index) => (<>
                    <tr className={style.tr}>
                    <td className={style.td}>{v?.himMemberId}</td>

                      <td className={style.td}>{v?.memberName}</td>
                      <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
                      <td className={style.td}>{v?.religion}</td>
                      <td className={style.td}>{v?.socialCategory}</td>
                      <td className={style.td}>

                        <div className="action">

                        {v?.memberDetailsMore ? <CloseBtn title="Close" onClick={() => { viewMoreMember(index, false) }} />
                        :<MoreBtn title="More" onClick={() => { viewMoreMember(index, true) }} /> }
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
                            {getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName && <p className={style.expandMargin}><b>Supporting Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}


                          </Grid>
                          <Grid item xs={4}>
                            <p className={style.expandMargin}><b>Reference No.:</b> {v?.reference_no}</p>
                            <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                            <p className={style.expandMargin}><b>Category:</b> { v?.socialCategory}</p>

                          </Grid>
                          <Grid item xs={4}>
                            {/* <p className={style.expandMargin}><b>Sub Category:</b> {v?.subCategory}</p> */}
                            <p className={style.expandMargin}><b>Ration Card No.:</b> {v?.rationCardNo}</p>
                            <p className={style.expandMargin}><b>Aadhaar No.:</b> {FormatAadharNumber(v?.aadhaarNo)}</p>

                            <p className={style.expandMargin}><b>Bonafide Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Bonafide Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>

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

                              name="gender"
                              options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.gender}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.gender && <p className="error">{memberError?.gender}</p>}
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

                              name="religion"
                              options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                              value={memberDetailsExtra?.religion}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.religion && <p className="error">{memberError?.religion}</p>}
                          </Grid>
                          <Grid item xs={4}>
                            <SelectDropdown

                              title={t('category')}
                              name="socialCategory"
                              options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
disabled
                              value={memberDetailsExtra?.socialCategory}
                              onChange={handleChangeMemberDetails}
                              requried
                            />
                            {memberError?.socialCategory && <p className="error">{memberError?.socialCategory}</p>}

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

            {getfamilymemberList?.length == 0 && <h3>Family Member Not Found!</h3>}

           <DialogActions style={{display : "flex", justifyContent : "center", marginTop : "5px"}}>
           <SubmitButton onClick={handleClose} label="Close" icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}} />} type ="cancel" />
           <SubmitButton label="Add Member" icon={<MdAdd size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleClickOpen} />

      </DialogActions>
        </DialogContent>

      </BootstrapDialog>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={[]} memberList={{}} getFamilyByIdData={getFamilyByIdData} />

    </React.Fragment>
  );
}

export default ViewFamilyModal