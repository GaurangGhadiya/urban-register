import SelectDropdown from '@/components/SelectDropdown'
import MainLayout from '@/layout/MainLayout'
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import style from './transfermember.module.css'
import ViewBtn from '@/components/MoreBtn/ViewBtn'
import VerifyBtn from '@/components/MoreBtn/VerifyBtn'
import { useDispatch, useSelector } from 'react-redux'
import { getMunicipalities } from '@/network/actions/getMunicipalities'
import { getWard } from '@/network/actions/getWard'
import { getDistrict } from '@/network/actions/getDistrict'
import { getFamilyList } from '@/network/actions/getFamilyList'
import ViewFamilyModal from './ViewFamilyModal'
import { useLoading } from '@/utils/LoadingContext'
import withAuth from '@/utils/withAuth'

const TransferMember = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const { loading, startLoading, stopLoading } = useLoading();

  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListData = useSelector((state) => state.getFamilyList?.data)
  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
    })
    const [open, setOpen] = React.useState(false);
    const [viewData, setViewData] = useState({})
    const [page, setPage] = useState(1);

  const handleClickOpen = (v) => {
    setOpen(true);
    setViewData(v)
  };
  const handleClose = () => {
    setOpen(false);
    setViewData({})
  };

  useEffect(() => {
    dispatch(getDistrict( startLoading, stopLoading ))
  }, [])
  useEffect(() => {
    // if (getFamilyListData)
      // setPage(getFamilyListData?.number)
  }, [getFamilyListData])
  useEffect(() => {
    dispatch(getFamilyList(formData,startLoading, stopLoading))
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handlePageChange = (event, value) => {
    setPage(value)
    dispatch(getFamilyList({...formData, page: value-1},startLoading, stopLoading))

  }
  return (
    <>
      <ViewFamilyModal open={open} handleClose={handleClose} viewData={viewData} />
      <MainLayout>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading )) }}
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading )) }}
            />

          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectWard')}
              name="ward"
              options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}
              value={formData?.ward}
              disabled={formData?.district != "" && formData?.municipal != "" ? false : true}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <div className={style.tablewrapper} >
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>Head of Family	</th>
                <th className={style.th}>Ration No.	</th>
                <th className={style.th}>Total Members	</th>
                <th className={style.th}>Economic Status	</th>
                {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                <th className={style.th}>District</th>
                <th className={style.th}>Municipal</th>
                <th className={style.th}>Action</th>
              </tr>
            </thead>
            <tbody>{getFamilyListData?.content?.map(v => (
              <tr className={style.tr}>
                <td className={style.td}>{v?.headMemberName}	</td>
                <td className={style.td}>{v?.rationCardNo}	</td>
                <td className={style.td}>{v?.totalMembers}</td>
                <td className={style.td}>{v?.economic}	</td>
                {/* <td className={style.td}>{v?.socialCategory}</td> */}
                <td className={style.td}>{v?.district}</td>
                <td className={style.td}>{v?.municipalName}</td>
                <td className={style.td}><div className={style.btns}>
                    <p style={{cursor : "pointer", color : "blue"}} onClick={() => handleClickOpen(v)}>Select</p>
                  {/* <ViewBtn title={"View"} onClick={() => handleClickOpen(v)} /> */}
                  {/* <VerifyBtn title={"Verify"} onClick={() => { }} /> */}

                </div></td>                    </tr>
            ))}




            </tbody>
          </table>


        </div>

        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography></Typography>

        <Stack spacing={2} >
          <Pagination color="primary" onChange={handlePageChange} count={getFamilyListData?.totalPages} page={page} />

        </Stack>
        <Typography>Total Family: {getFamilyListData?.totalElements}</Typography>
        </Box>
      </MainLayout>
    </>
  )
}

// export default TransferMember
export default withAuth(TransferMember)
