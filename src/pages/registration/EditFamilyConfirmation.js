import CancelBtn from '@/components/CancelBtn';
import SubmitButton from '@/components/SubmitBtn'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const EditFamilyConfirmation = ({nameTitle,memberList, setMemberList, handleClose, open, data, EditModalType,setIsEditMode, setisEditModeHead,getFamilyByIdData,formData}) => {
  const changeMemberList = () => {
    // setisEditModeMember(true);
     handleClose()

    let data1 = [...memberList]
    let newData = data1?.map(v => data?.memberName == v?.memberName ? {...v, isEditModeMember:true } : {...v, isEditModeMember:false } )
    setMemberList(newData)
  }

  return (
    <>
       <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Family
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
         <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
         <MdClose color='white' size={18}/>
         </Box>
        </IconButton>
      <DialogContent dividers style={{fontSize : "18px"}}>
        {EditModalType == "family" &&<div>

        <p >Are you sure you want to edit the Family residing in:</p>
        <p style={{margin : "10px 0"}}><b>Municipality:</b> <>{getFamilyByIdData?.municipalName}</></p>
        <p><b>Ward:</b> <>{getFamilyByIdData?.wardName}</></p>
        </div>}
        {EditModalType == "head" &&<div>

        <p >Are you sure you want to edit the Family residing in:</p>
        <p style={{margin : "10px 0"}}><b>Municipality:</b> <>{getFamilyByIdData?.municipalName}</></p>
        <p><b>Ward:</b> <>{getFamilyByIdData?.wardName}</></p>
        <p style={{marginTop : "10px"}}><b>With the Head of Family as:</b> <>{formData?.memberName}</></p>
        </div>}
        {EditModalType == "member" &&<div>

        <p >Are you sure you want to edit the details of</p>
        <p style={{marginBottom : "10px"}}> <b>{data?.memberName}</b></p>
        <p><>with Aadhaar Number</> </p>
        <b>{data?.aadhaarNo}</b>
        </div>}
      </DialogContent>
      <DialogActions>
       {EditModalType == "family" &&<> <CancelBtn  onClick={() => {setIsEditMode(false); handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {setIsEditMode(true); handleClose()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}
        {EditModalType == "head" &&<><CancelBtn  onClick={() => {setisEditModeHead(false); handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {setisEditModeHead(true); handleClose()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}
        {EditModalType == "member" &&<><CancelBtn  onClick={() => {handleClose()}} label="Cancel" />
        <SubmitButton onClick={() => {changeMemberList()}} style={{marginLeft : "10px",borderRadius : "4px"}} label="Confirm" /></>}

      </DialogActions>
    </BootstrapDialog>
    </>
  )
}

export default EditFamilyConfirmation
