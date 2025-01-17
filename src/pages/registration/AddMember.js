import SelectDropdown from '@/components/SelectDropdown';
import SubmitButton from '@/components/SubmitBtn';
import { getDistrict } from '@/network/actions/getDistrict'
import { getFamilyList, getFamilyListSuccess } from '@/network/actions/getFamilyList';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import { getfamilymember, getfamilymemberSuccess } from '@/network/actions/getfamilymember';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import style from "./registration.module.css"
import FormatAadharNumber from '@/utils/formatAadharNumber';
import { getFamilyById } from '@/network/actions/getFamilyById';
import AddMemberModal from './AddMemberModal';
import formatDate from '@/utils/formatDate';
import { useLoading } from '@/utils/LoadingContext';
import { MdAdd, MdSearch } from 'react-icons/md';
import CloseBtn from '@/components/MoreBtn/CloseBtn';
import MoreBtn from '@/components/MoreBtn';
import { isAlphanumericKey } from '@/utils/regex';
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import getDefaultData from '@/utils/getDefaultData';

const AddMember = () => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch()
  const route = useRouter()
  const { loading, startLoading, stopLoading } = useLoading();
  // const defaultData = getDefaultData()

  const districtList = useSelector((state) => state.getDistrict?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getFamilyListDataApi = useSelector((state) => state.getFamilyList?.data || null)

  const getFamilyListData = useSelector((state) => state.getFamilyList?.data?.content || [])
  const getFamilyByIdData = useSelector((state) => state.getFamilyById?.data?.familyData?.[0] || {})
  const getFamilyByIdDataDoc = useSelector((state) => state.getFamilyById?.data?.familyDocData || [])
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
  const getfamilymemberDoc = useSelector((state) => state.getfamilymember?.data?.familyDocData)
  const addFamilyData = useSelector((state) => state.addFamily?.data || [])


  const [openModal, setOpenModal] = React.useState(false);
  const [defaultData, setDefaultData] = useState({})
  const [memberList, setMemberList] = React.useState([])
  const [isFamilyMore, setIsFamilyMore] = useState(false)
  const [data, setData] = useState(null)

  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null)
  const [formData, setFormData] = useState({
    district: "",
    municipal: "",
    ward: "",
  })

  useEffect(() => {
    const getData = async () => {
      let test = await getDefaultData()
      setDefaultData(test)
    }
    getData()
  }, [])

  useEffect(() => {
    if(defaultData?.district && !formData?.district){
      dispatch(getMunicipalities({ districtCode: defaultData?.district?.toString() } , startLoading, stopLoading ))
      setFormData({...formData, district : defaultData?.district })
    }
  }, [defaultData])
  useEffect(() => {
    if(defaultData?.municipal && formData?.district){
      dispatch(getWard({ municipalId: defaultData?.municipal?.toString() }, startLoading, stopLoading ))
      setFormData({...formData, municipal : defaultData?.municipal })
    }
  }, [formData?.district])
  useEffect(() => {
    if(defaultData?.ward && formData?.municipal){
      setFormData({...formData, ward : defaultData?.ward })
    }
  }, [formData?.municipal])

  useEffect(() => {
    dispatch(getDistrict(startLoading, stopLoading))
    // dispatch(getFamilyById(addFamilyData?.id))
    return (() => {
      dispatch(getfamilymemberSuccess([]))
      dispatch(getFamilyListSuccess([]));
      // setData(null)
    })
  }, [])
  useEffect(() => {
    if (getfamilymemberList?.length > 0 ) setMemberList(getfamilymemberList)
  }, [getfamilymemberList])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const onFamilyHeadSelect = (e) => {
    dispatch(getfamilymemberSuccess([]))
      dispatch(getFamilyListSuccess([]));
    setSelectedFamilyHead(e.target.value)
    // dispatch(getfamilymember(e.target.value, startLoading, stopLoading))
    if(e.target.value == ""){
      setData(null)
    }
  }

  useEffect(() => {
    if(getFamilyListDataApi?.content?.length == 1){
      dispatch(getfamilymember(getFamilyListDataApi?.content?.[0]?.family_id,startLoading, stopLoading))
      dispatch(getFamilyById(+getFamilyListDataApi?.content?.[0]?.family_id,startLoading, stopLoading))
    }else{
      dispatch(getfamilymemberSuccess([]))
      // dispatch(getFamilyListSuccess([]));
    }

  }, [getFamilyListDataApi])
  const handleSearch = () => {
    // if(formData?.district && formData?.municipal && formData?.ward && selectedFamilyHead !=""){
      dispatch(getFamilyList({...formData, searchByParivar : selectedFamilyHead},startLoading, stopLoading))

        // dispatch(getfamilymember(selectedFamilyHead, startLoading, stopLoading))
        // dispatch(getFamilyById(+selectedFamilyHead))

    // }else{
    //   toast.error("Please select all fields")
    // }


      }

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const viewMoreMember = (index, value) => {
    let newData = memberList?.map((v, i) => index == i ? { ...v, memberDetailsMore: value } : v)
    setMemberList(newData)
  }

//   useEffect(() => {
//     if(getfamilymemberList){
// setData(getfamilymemberList)
//     }
//   }, [getfamilymemberList])

  return (
    <>
      <Box mt={3}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('district')}
              name="district"
              options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
              value={formData?.district}
              onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value }, startLoading, stopLoading)) }}
              requried
            />


          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={t('selectVillage')}
              name="municipal"
              options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}
              disabled={formData?.district != "" ? false : true}
              value={formData?.municipal}
              onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value }, startLoading, stopLoading)) }}
              requried
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
              requried
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
          <InputFieldWithIcon
          title={t('searchByParivarIdorRationNo')}
          // icon={<IoIosDocument size={20} />}
          placeholder=""
          type="text"
          name="hof"
          value={selectedFamilyHead}
          disabled={formData?.district != "" && formData?.municipal != ""  && formData?.ward != "" ? false : true}
          requried
                        onChange={onFamilyHeadSelect}
          onKeyDown={(e) => {
            if (!isAlphanumericKey(e.key)) {
              e.preventDefault();
            }
          }}
        />

          </Grid>
          {getFamilyListDataApi?.content?.length > 1 && <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={"Select HOF"}
              name="selectedHof"
              options={getFamilyListDataApi?.content?.map(v => ({ value: v?.family_id, label: v?.headMemberName+" ("+v?.himParivarId+")" })) || []}
              value={formData?.selectedHof}
              onChange={(e) => {
                handleChange(e);
                dispatch(getfamilymember(e.target.value, startLoading, stopLoading))
                    dispatch(getFamilyById(+e.target.value,startLoading, stopLoading))

               }}
            />


          </Grid>}
          <Grid item xs={12} sm={4} md={4} mt={3}>
            <SubmitButton label={"Search"} icon={<MdSearch size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSearch}
            />
          </Grid>
        </Grid>
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Family Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.tablewrapper} style={{ margin: "0" }}>
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
                  <td className={style.td}>{getFamilyByIdData?.himParivarId}</td>
                  <td className={style.td}>{getFamilyByIdData?.district}</td>
                  <td className={style.td}>{getFamilyByIdData?.municipalName}</td>
                  <td className={style.td}>{ getFamilyByIdData?.wardName}</td>
                  <td className={style.td}>{getFamilyByIdData?.rationCardNo}</td>
                  <td className={style.td}>{getFamilyByIdData?.economic}</td>
                  <td className={style.td}>

                    <div className="action">
                        {isFamilyMore ? <CloseBtn title="Close" onClick={() => { setIsFamilyMore(false) }} />
                        :<MoreBtn title="More" onClick={() => { setIsFamilyMore(true) }} /> }

                    </div>
                  </td>
                </tr>
                {isFamilyMore && <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>District:</b> {getFamilyByIdData?.district}</p>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {getFamilyByIdData?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>House No.:</b> {getFamilyByIdData?.houseAddress}</p>
                        <p className={style.expandMargin}><b>Declaration Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Consent")?.fileName} target='_' style={{color : "blue"}}>View</a></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Municipal:</b> {getFamilyByIdData?.municipalName}</p>
                        <p className={style.expandMargin}><b>Economic Status:</b> {getFamilyByIdData?.economic}</p>
                        <p className={style.expandMargin}><b>Mobile No.:</b> {getFamilyByIdData?.mobileNumber?.replace(/^(\d{5})(\d{1,5})/, '$1-$2')}</p>
                        {getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName &&<p className={style.expandMargin}><b>Supporting Document:</b> <a href={getFamilyByIdDataDoc?.find(k => k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}


                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ward:</b> {getFamilyByIdData?.wardName}</p>
                        <p className={style.expandMargin}><b>Category:</b> {getFamilyByIdData?.socialCategory}</p>
                        {getFamilyByIdData?.socialSubCategory &&<p className={style.expandMargin}><b>Sub Category:</b> {getFamilyByIdData?.socialSubCategory}</p>}

                      </Grid>
                    </Grid>
                  </td>
                </tr>}
              </tbody>
            </table>


          </div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) &&<div className={style.heading} style={{ marginTop: "20px" , marginBottom : "5px"}}>Member Details</div>}
        {(getfamilymemberList?.length > 0 && selectedFamilyHead ) ?
          <div className={style.tablewrapper} style={{margin : 0}} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Him Member ID	</th>
                  <th className={style.th}>Name	</th>
                  <th className={style.th}>Head of Family	</th>
                  <th className={style.th}>Birth Date	</th>
                  <th className={style.th}>Category	</th>
                  {/* <th className={style.th}>SOCIAL CATEGORY	</th> */}
                  <th className={style.th}>Aadhaar No.</th>
                  <th className={style.th}>Profession</th>
                  <th className={style.th}></th>
                </tr>
              </thead>
              <tbody>{memberList?.map((v, index) => (
                <>
                <tr className={style.tr}>
                  <td className={style.td}>{v?.himMemberId}	</td>
                  <td className={style.td}>{v?.memberName}	</td>
                  <td className={style.td}>{v?.isHead == "true" ? "Yes" : "No"}	</td>
                  <td className={style.td}>{formatDate(v?.date_of_birth)}</td>
                  <td className={style.td}>{v?.socialCategory}	</td>
                  {/* <td className={style.td}>{v?.socialCategory}</td> */}
                  <td className={style.td}>{FormatAadharNumber(v?.aadhaarNo)}</td>
                  <td className={style.td}>{v?.profession}</td>
                  <td className={style.td}>

                    <div className="action">

                      {v?.memberDetailsMore ? <CloseBtn title="Close" onClick={() => { viewMoreMember(index, false) }} />
                        : <MoreBtn title="More" onClick={() => { viewMoreMember(index, true) }} />}
                    </div>
                  </td>
                </tr>
                {v?.memberDetailsMore && <tr  >
                  <td colspan="6" style={{ padding: "20px 20px 0 20px" }}>

                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Member Name:</b> {v?.memberName}</p>
                        <p className={style.expandMargin}><b>Date of Birth:</b> {formatDate(v?.date_of_birth)}</p>
                        <p className={style.expandMargin}><b>Gender:</b> {v?.gender}</p>
                        <p className={style.expandMargin}><b>Bonafide Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Bonafide Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>



                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Reference No.:</b> {v?.reference_no}</p>
                        <p className={style.expandMargin}><b>Religion:</b> {v?.religion}</p>
                        <p className={style.expandMargin}><b>Category:</b> { v?.socialCategory}</p>
                        {getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName && <p className={style.expandMargin}><b>Supporting Document:</b> <a href={getfamilymemberDoc?.find(k => k?.memberId == v?.familyMemberId && k?.document == "Cast Certificate")?.fileName} target='_' style={{color : "blue"}}>View</a></p>}

                      </Grid>
                      <Grid item xs={4}>
                        <p className={style.expandMargin}><b>Ration Card No.:</b> {v?.rationCardNo}</p>
                        <p className={style.expandMargin}><b>Aadhaar No.:</b> {FormatAadharNumber(v?.aadhaarNo)}</p>
                        {v?.socialSubCategory &&<p className={style.expandMargin}><b>Sub Category:</b> {v?.socialSubCategory}</p>}


                      </Grid>
                    </Grid>
                  </td>
                </tr>}
                </>
              ))}




              </tbody>
            </table>


          </div>
          : (getfamilymemberList?.length == 0 && selectedFamilyHead ) ?
            <Typography></Typography> : ""
        }
        {selectedFamilyHead && getfamilymemberList?.length > 0  && <div style={{ float: "none", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <SubmitButton label="Add Member" icon={<MdAdd size={18} style={{ marginTop: "5px", marginRight: "5px" }} />} onClick={handleClickOpen} />
        </div>}
      </Box>
      <AddMemberModal handleClose={handleCloseModal} open={openModal} setMemberList={[]} memberList={{}} getFamilyByIdData={getFamilyByIdData} />

    </>
  )
}

export default AddMember
