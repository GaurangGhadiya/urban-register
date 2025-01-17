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
import { MdClose, MdModeEdit } from 'react-icons/md';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewMemberData({ onSubmit, onCancle, open, data }) {
    const { t } = useTranslation("translation");


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
          Edit Member
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
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('name')} value={data?.memberName} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('ralativeName')} value={data?.relativeName} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('birthDate')} value={formatDate(data?.date_of_birth)} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('aadhaarNo')} value={FormatAadharNumber(data?.aadhaarNo || "")} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('gender')} value={data?.gender} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('profession')} value={data?.profession} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('qualification')} value={data?.qualification} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('rationCardNo')} value={data?.rationCardNo} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('category')} value={data?.socialCategory} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('remark')} value={data?.remarks} />
                        </Grid>
                      {data?.socialSubCategory && <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('subCategory')} value={data?.socialSubCategory} />
                        </Grid>}

                      {data?.religion && <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('religion')} value={data?.religion} />
                        </Grid>}

                        <Grid item xs={12} sm={4} md={3} >
                            <KeyValueDetails title={t('referanceNo')} value={data?.reference_no} />
                        </Grid>

                    </Grid>
                    <Box style={{ display: "flex" }} justifyContent={"center"} mt={4}>
                        <SubmitButton label="Cancel" icon={<MdClose size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} type ="cancel" onClick={onCancle} />
                        <SubmitButton label="Edit Member" icon={<MdModeEdit size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={onSubmit} style={{ marginLeft: "10px" }} />
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
