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
import { Box } from '@mui/material';
import { MdCheck, MdClose } from 'react-icons/md';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DeleteConfirmation({text, onSubmit, onCancle, open}) {


  return (
    <React.Fragment>
    
      <BootstrapDialog
        onClose={onCancle}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle> */}
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
         {/* <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}> */}
         {/* <MdClose color='white' size={18}/> */}
         {/* </Box> */}
        </IconButton>
        <DialogContent dividers>
          <Typography >{text}</Typography>

      <Box style={{display : "flex"}} justifyContent={"center"} mt={3}>
      <SubmitButton label="Cancel" icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}} />} type ="cancel" onClick={onCancle}/>
      <SubmitButton label="Submit" onClick={onSubmit} icon={<MdCheck size={18} style={{marginTop : "5px", marginRight : "5px"}} />} style={{marginLeft : "10px"}} />
      </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
