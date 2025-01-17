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
import FormatAadharNumber from '@/utils/formatAadharNumber';
import style from "./registration.module.css"
import SubmitButton from '@/components/SubmitBtn';
import { MdClose } from 'react-icons/md';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


const BeneficiaryModal = ({selectedFamilyMember, handleClose, open}) => {
  return (
    <React.Fragment>

    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
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
         {/* <Box style={{height : "30px", width : "30px", background : "#A04040"}} borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
         <MdClose color='white' size={18}/>
         </Box> */}
        </IconButton>
      <DialogContent dividers>
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
                                {selectedFamilyMember?.map(v => <>
                                    <tr className={style.tr}>
                                        <td className={style.td}>{v?.memberName}</td>
                                        <td className={style.td}>{v?.cardType}</td>
                                        <td className={style.td}>{v?.aadhaarNumber ? FormatAadharNumber(v?.aadhaarNumber) : "-"}</td>
                                        <td className={style.td}>
                                            <input type="radio"
                                                checked={v?.isHead}
                                                name='head' className={style.checkbox}
                                                // onChange={(e) => setRationCardData(rationCardData?.map(p => p?.memberName == v?.memberName ? { ...p, isHead: e.target.checked } : p))}
                                            />
                                        </td>

                                    </tr>
                                </>)}

                            </tbody>
                        </table>


                    </div>
                    <Box display={"flex"} justifyContent={"center"} mt={2}>
                    <SubmitButton label={"Close"} type={"cancel"} autoFocus onClick={handleClose} icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}} />} />

                    </Box>
      </DialogContent>

    </BootstrapDialog>
  </React.Fragment>
  )
}

export default BeneficiaryModal
