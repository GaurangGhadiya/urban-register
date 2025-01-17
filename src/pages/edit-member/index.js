import SelectDropdown from '@/components/SelectDropdown';
import MainLayout from '@/layout/MainLayout'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import style from "./editMember.module.css"
import InputFieldWithIcon from '@/components/InputFieldWithIcon';
import { isAlphabateKey } from '@/utils/regex';
import TextArea from '@/components/TextArea';
import FileUpload from '@/components/FileUpload';
import SubmitButton from '@/components/SubmitBtn';
import { getEditType } from '@/network/actions/getEditType';
import translateToHindi, { translateToHindi2 } from '@/utils/translate';
import { getDocumentList } from '@/network/actions/getDocumentList';
import formatDate, { formatDateTime } from '@/utils/formatDate';
import DatePicker from '@/components/DatePicker';
import { getRelation } from '@/network/actions/getRelation';
import { getCategory } from '@/network/actions/getCategory';
import { getReligion } from '@/network/actions/getReligion';
import { getGender } from '@/network/actions/getGender';
import { getQualification } from '@/network/actions/getQualification';
import { getProfession } from '@/network/actions/getProfession';
import { editMember } from '@/network/actions/editMember';
import { getMemberStatus } from '@/network/actions/getMemberStatus';
import { getfamilymember } from '@/network/actions/getfamilymember';
import { getUpdateHistory } from '@/network/actions/getUpdateHistory';
import { BaseURL } from '@/network/apiData';
import FormatAadharNumber from '@/utils/formatAadharNumber';
import { getDistrict } from '@/network/actions/getDistrict';
import { getMunicipalities } from '@/network/actions/getMunicipalities';
import { getWard } from '@/network/actions/getWard';
import { getBlock } from '@/network/actions/getBlock';
import { getPanchayat } from '@/network/actions/getPanchayat';
import { getTransferType } from '@/network/actions/getTransferType';
import { TransferMember } from '@/network/actions/TransferMember';
import { useLoading } from '@/utils/LoadingContext';
import Loader from '@/utils/Loader';
import { getImagePath } from '@/utils/CustomImagePath';
import toast from 'react-hot-toast';
import { MdOutlineSave } from 'react-icons/md';
import Image from 'next/image';
import withAuth from '@/utils/withAuth';

const EditMember = () => {
  const { t } = useTranslation("translation");
  const { loading, startLoading, stopLoading } = useLoading();

  const router = useRouter();
  const dispatch = useDispatch()
  const getEditTypeList = useSelector((state) => state.getEditType?.data)
  const documentList = useSelector((state) => state.getDocumentList?.data)
  const getDistrictList = useSelector((state) => state.getDistrict?.data)
  const relationlist = useSelector((state) => state.getRelation?.data)
  const categorylist = useSelector((state) => state.getCategory?.data)
  const religionList = useSelector((state) => state.getReligion?.data)
  const genderlist = useSelector((state) => state.getGender?.data)
  const qualificationList = useSelector((state) => state.getQualification?.data)
  const profesionList = useSelector((state) => state.getProfession?.data)
  const memberStatusList = useSelector((state) => state.getMemberStatus?.data)
  const getfamilymemberList = useSelector((state) => state.getfamilymember?.data?.familyData || [])
  const getUpdateHistoryList = useSelector((state) => state.getUpdateHistory?.data)
  const municipalList = useSelector((state) => state.getMunicipalities?.data)
  const wardList = useSelector((state) => state.getWard?.data)
  const getBlockList = useSelector((state) => state.getBlock?.data)
  const getPanchayatList = useSelector((state) => state.getPanchayat?.data)
  const getTransferTypeList = useSelector((state) => state.getTransferType?.data)

  const [userData, setUserData] = useState({})
  const [selectedEditType, setSelectedEditType] = useState(null)
  const [selectedDocumentType, setSelectedDocumentType] = useState(null)
  const [upoadedDocument, setUpoadedDocument] = useState("")
  const [remarks, setRemarks] = useState("")
  const [translatedText, setTranslatedText] = useState('');
  const [oldValue, setOldValue] = useState({})
  const [errors, setErrors] = useState({});
  const [tnxID, setTnxID] = useState();
  const [OtpSent, setOtpSent] = useState(false);
  const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(59);
  const [aadhaarDetails, setAadhaarDetails] = useState({});
  const [otp, setOTP] = useState("");
  const [otpVerified, setOtpVerified] = useState(false)



	const [disableOtp, setdisableOtp] = useState(false);



  const [currentValue, setCurrentValue] = useState({})


  useEffect(() => {
    setSelectedDocumentType(null)
    setUpoadedDocument(null)
    setRemarks(null)
    dispatch(getUpdateHistory({ familymember_id: userData?.familyMemberId, editType_id: selectedEditType?.toString() }))
  }, [selectedEditType])

  useEffect(() => {
    if (router?.query?.state) {
      const stateObject = JSON.parse(router?.query?.state) || "";
      setUserData(stateObject)
      router.replace(router.pathname)
    }
  }, [router])

  useEffect(() => {
    dispatch(getEditType())
    dispatch(getRelation())
    dispatch(getCategory())
    dispatch(getReligion())
    dispatch(getGender())
    dispatch(getQualification())
    dispatch(getProfession())
    dispatch(getMemberStatus())
    dispatch(getDistrict(startLoading, stopLoading))
    dispatch(getTransferType())



  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const text = await translateToHindi2(userData?.relation + " " + userData?.relativeName); // Replace with actual data source or dynamic value
      if (text) {
        setTranslatedText(text);
      }

    };

    if (userData?.relation) fetchData();
    dispatch(getfamilymember(userData?.familyId,startLoading, stopLoading))
  }, [userData]);

  useEffect(() => {
    if (userData && selectedEditType) {
      // dispatch(updateMemberHistory())
      setCurrentValue(null)
      if (selectedEditType == 1) {
        setOldValue({ englishName: userData?.memberName, hindiName: userData?.memberNameH })
        setCurrentValue({ englishName: userData?.memberName, hindiName: userData?.memberNameH })
      }
      if (selectedEditType == 2) {
        setOldValue({
          EnglishRelation: userData?.relationId, EnglishRelativeName: userData?.relativeName,
          HindiRelation: translatedText
        })
        setCurrentValue({
          EnglishRelation: userData?.relationId,
          // EnglishRelativeName: userData?.relativeName,
          // HindiRelativeName : changeLang(userData?.relativeName,"HindiRelativeName"),
          HindiRelation: changeLang(relationlist?.find(k => k?.id == userData?.relationId)?.nameE, "HindiRelation")
        })

      }
      if (selectedEditType == 3) {
        setOldValue({ birthDate: userData?.date_of_birth })
        setCurrentValue({ birthDate: userData?.date_of_birth })

      }
      if (selectedEditType == 4) {
        setOldValue({ category: userData?.socialCategoryId, subCategory: userData?.socialSubCategory || "NA" })
        setCurrentValue({ category: userData?.socialCategoryId, subCategory: userData?.socialSubCategory || "NA" })

      }
      if (selectedEditType == 5) {
        setOldValue({ aadhaarNo: userData?.aadhaarNo })
        setCurrentValue({ aadhaarNo: userData?.aadhaarNo })
      }
      if (selectedEditType == 6) {
        setOldValue({ religion: userData?.religionId })
        setCurrentValue({ religion: userData?.religionId })
      }
      if (selectedEditType == 7) {
        setOldValue({ memberStatus: userData?.memberStatusId })
        // setCurrentValue({ memberStatus: userData?.memberStatusId })


      }
      if (selectedEditType == 8) {
        setOldValue({ memberStatus: userData?.memberStatusId, district: userData?.district, municipal: userData?.municipalName, ward: userData?.wardName })
        // setCurrentValue({ memberStatus: "5" })


      }
      if (selectedEditType == 9) {
        setOldValue({ englishName: userData?.memberName, hindiName: userData?.memberNameH })
        setCurrentValue({ englishName: userData?.memberName, hindiName: userData?.memberNameH })
      }
      if (selectedEditType == 10) {
        setOldValue({ gender: userData?.genderId, qualification: userData?.qualificationId, profession: userData?.professionId, rationCardNo: userData?.rationCardNo })
        setCurrentValue({ gender: userData?.genderId, qualification: userData?.qualificationId, profession: userData?.professionId, rationCardNo: userData?.rationCardNo })
      }
    }

  }, [userData, selectedEditType])

  function getSelectedText(id) {
    // Get the select element
    var selectElement = document.getElementById(id);

    // Get the selected option
    var selectedOption = selectElement.options[selectElement.selectedIndex];

    // Get the text content of the selected option
    var selectedText = selectedOption.textContent;

    // Display the selected text (for demonstration purposes)
    // alert("Selected text: " + selectedText);
    return selectedText
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "district" || name == "municipal" || name == "ward" || name == "block" || name == "panchayat") {

      setCurrentValue({ ...currentValue, [name]: value, [name + "Name"]: getSelectedText(name) })
    } else {

      setCurrentValue({ ...currentValue, [name]: name == "aadhaarNo" ? value?.replaceAll(" ", "") : value })
    }
  }

  const validateForm = () => {
    const errors = {};
    if (!selectedDocumentType) {
      errors.selectedDocumentType = t('validateDocType');
    }
    if (!upoadedDocument) {
      errors.upoadedDocument = t('validateUploadedDoc');
    }
    // if (Object.keys(currentValue)?.length == 0 ) {
    //   errors.upoadedDocument = t('validateUploadedDoc');
    // }

    return errors;
  };

  function processObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key].includes("_")) {
          obj[key] = obj[key].split("_")[0];
        }
      }
    }
  }

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      let body = {
        documentFiles: upoadedDocument,
        memberUpdate: { "memberId": userData?.familyMemberId, "editTypeId": selectedEditType, "oldValue": JSON.stringify(oldValue), "currentValue": JSON.stringify({ ...currentValue, memberStatus: currentValue?.transferType == "1" ? "3" : "5" }), "documentId": selectedDocumentType, remarks: remarks, familyId: userData?.familyId }
      }
      const extra = () => {
        dispatch(getUpdateHistory({ familymember_id: userData?.familyMemberId, editType_id: selectedEditType?.toString() }))
        setSelectedDocumentType("")
        setUpoadedDocument(null)
        setRemarks(null)
        setOTP(null)
        router.push(`update?id=${userData?.rationCardNo}`)
        // setOldValue(null)
        // setCurrentValue("")

      }
      dispatch(editMember(body, extra, startLoading, stopLoading))
    } else {
      setErrors(validationErrors);
    }

  }

  const changeLang = async (name, key = "") => {
    if (name) {

      const text = await translateToHindi(name);
      if (text && key) {
        setCurrentValue({ ...currentValue, [key]: text })
      } else if (text) {

        setCurrentValue({ ...currentValue, hindiName: text })
        // return text
      }
    }
  }

  const getOldValue = (data) => {
    let value = JSON.parse(data)
    if (selectedEditType == 1) {
      return value?.englishName || "-"
    }
    if (selectedEditType == 2) {
      return relationlist?.find(v => v?.id == value?.EnglishRelation)?.nameE + (value?.EnglishRelativeName == "other" ? value?.EnglishRelativeNameOther : value?.EnglishRelativeName) || "-"
    }
    if (selectedEditType == 3) {
      return formatDate(value?.birthDate) || "-"
    }
    if (selectedEditType == 4) {
      return <div>
        <p>Category: {categorylist?.find(v => v?.id == value?.category)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Subcategory: {value?.subCategory || "-"}</p>
      </div>
    }
    if (selectedEditType == 5) {
      return FormatAadharNumber(value?.aadhaarNo) || "-"
    }
    if (selectedEditType == 6) {
      return religionList?.find(v => v?.id == value?.religion)?.nameE || "-"
    }
    if (selectedEditType == 7) {
      return "-"
    }
    if (selectedEditType == 8) {
      return <div>
        <p>District: {value?.district}</p>
        {value?.municipal && <p style={{ marginTop: "5px" }}>Municipal: {value?.municipal}</p>}
        {value?.ward && <p style={{ marginTop: "5px" }}>Ward: {value?.ward}</p>}
        {value?.block && <p style={{ marginTop: "5px" }}>Block: {value?.block}</p>}
        {value?.panchayat && <p style={{ marginTop: "5px" }}>Panchayat: {value?.panchayat}</p>}
      </div>
    }
    if (selectedEditType == 9) {
      return value?.englishName || "-"
    }
    if (selectedEditType == 10) {
      return <div>
        <p>Gender: {genderlist?.find(v => v?.id == value?.gender)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Education: {qualificationList?.find(v => v?.id == value?.qualification)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Means of Leaving: {profesionList?.find(v => v?.id == value?.profession)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Ration Card Number: {value?.rationCardNo || "-"}</p>
      </div>
    }
  }
  const getCurrentValue = (data) => {
    let value = JSON.parse(data)
    if (selectedEditType == 1) {
      return value?.englishName || "-"
    }
    if (selectedEditType == 2) {
      return relationlist?.find(v => v?.id == value?.EnglishRelation)?.nameE + (value?.EnglishRelativeName == "other" ? value?.EnglishRelativeNameOther : value?.EnglishRelativeName) || "-"
    }
    if (selectedEditType == 3) {
      return formatDate(value?.birthDate) || "-"
    }
    if (selectedEditType == 4) {
      return <div>
        <p>Category: {categorylist?.find(v => v?.id == value?.category)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Subcategory: {value?.subCategory || "-"}</p>
      </div>
    }
    if (selectedEditType == 5) {
      return FormatAadharNumber(value?.aadhaarNo) || "-"
    }
    if (selectedEditType == 6) {
      return religionList?.find(v => v?.id == value?.religion)?.nameE || "-"
    }
    if (selectedEditType == 7) {
      return formatDate(value?.deadDate) || "-"
    }
    if (selectedEditType == 8) {
      return <div>
        <p>District: {value?.districtName}</p>
        {value?.municipal && <p style={{ marginTop: "5px" }}>Municipal: {value?.municipalName}</p>}
        {value?.ward && <p style={{ marginTop: "5px" }}>Ward: {value?.wardName}</p>}
        {value?.block && <p style={{ marginTop: "5px" }}>Block: {value?.blockName}</p>}
        {value?.panchayat && <p style={{ marginTop: "5px" }}>Panchayat: {value?.panchayatName}</p>}
      </div>
    }
    if (selectedEditType == 9) {
      return value?.englishName || "-"
    }
    if (selectedEditType == 10) {
      return <div>
        <p>Gender: {genderlist?.find(v => v?.id == value?.gender)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Education: {qualificationList?.find(v => v?.id == value?.qualification)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Means of Leaving: {profesionList?.find(v => v?.id == value?.profession)?.nameE || "-"}</p>
        <p style={{ marginTop: "5px" }}>Ration Card Number: {value?.rationCardNo || "-"}</p>
      </div>
    }
  }



  const sendAadhaarOTP = async () => {


    if (currentValue?.aadhaarNo?.length > 11) {
      startLoading()
      const dataToSend = {
        aadhaarNumber: currentValue?.aadhaarNo,
      };

      fetch(getImagePath("/api/aadhaar-otp"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(dataToSend), // Convert the data to JSON format
      })
        .then((response) => {
          stopLoading()
          setMinutes(0);
          setSeconds(59);

          setdisableOtp(true);

          if (response.status === 500) {
            toast.error("Unable to send OTP. Please try again.")



            return;
          }

          if (!response.ok) {
            // throw new Error("Failed to post data");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setTnxID(data);
            setOtpSent(true);
            setAadhaarDetails("");
            // setAadhaarVerified(1);
            stopLoading()
          }
        })
        .catch((error) => {
          stopLoading()
          if (error?.response?.data?.error) {
            toast.error(error?.response?.data?.error)

          } else if (error?.response?.data) {
            toast.error(error?.response?.data)

          } else {
            toast.error(error?.message)

          }
        });
    }
  }


  const verifyOTP = () => {
		if (otp.length === 6) {
      startLoading()

			const dataToSend = {
				aadhaarNumber: currentValue?.aadhaarNo,
				otp: otp,
				tnxID: tnxID,
			};
			fetch(getImagePath("/api/verify-otp"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Specify the content type as JSON
				},
				body: JSON.stringify(dataToSend), // Convert the data to JSON format
			})
				.then((response) => {
					if (!response.ok) {
            toast.error("Unable to connect to UIDAI Please try again")

					}else{
            toast.success("Successfully verified!")
            setOtpVerified(true)
          }
					return response.json();
				})
				.then(async (data) => {
					const { uidData, vault } = data || {};

					// if (vault.$.aadhaarReferenceNumber) {
					// 	setVaultId(vault.$.aadhaarReferenceNumber);
					// }

					setAadhaarDetails(data);

					// getErrorColors(profileDetails, data);

					try {

						// const formattedDate = convertToDDMMYYYY(uidData.Poi.$.dob);

						// if (formattedDate) {
						// 	//setDob(uidData.Poi.$.dob);
						// 	setAadhaarDob(formattedDate);

						// 	setdobVerify(true);
						// } else {
						// 	setAadhaarDob("");

						// 	setdobVerify(false);
						// }
					} catch (e) {}




					stopLoading()

					// setActiveStep(activeStep + 1)
				})
				.catch((error) => {
					// Handle errors

					stopLoading()

					if (error?.response?.data?.error) {
            toast.error(error.response.data.error)
					} else if (error?.response?.data) {
            toast.error(error.response.data)

					} else {
            toast.error(error.message)

					}
				});
		} else {
      toast.error("Please Enter Correct OTP")
		}
	};

  useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}

			if (seconds === 0) {
				if (minutes === 0) {
					setdisableOtp(false);
					clearInterval(interval);
				} else {
					setSeconds(59);
					setMinutes(minutes - 1);
				}
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [seconds]);

  return (
    <MainLayout>
      <Box>
      <div className={style.heading} style={{ marginBottom: "20px" }}>Edit Member ({userData?.memberName} {userData?.himMemberId ? "- " + userData?.himMemberId : ""})</div>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={4} md={4}>
            <SelectDropdown
              title={`${t('typeEdit')}`}
              name="district"
              options={getEditTypeList?.map(v => ({ value: v?.id, label: v?.editType })) || []}
              value={selectedEditType}
              onChange={(e => { setSelectedEditType(+e.target.value); dispatch(getDocumentList(e.target.value)) })}
              requried
            />


          </Grid>
          {/* <Grid item xs={12} sm={8} md={8} mt={3} style={{float : "right"}}>
              <Typography>Edit Member: {userData?.memberName} {userData?.himMemberId &&  `(${userData?.himMemberId})`}</Typography>

          </Grid> */}
        </Grid>
        {selectedEditType && <><Divider style={{ margin: "30px 0" }} />
          {getUpdateHistoryList?.length > 0 && <><div className={style.heading} style={{ marginBottom: "5px" }}>Editing History</div>
            <div className={style.tablewrapper} >
              <table className={style.table}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                    <th className={style.th}>Change In	</th>
                    <th className={style.th}>Details Before Editing	</th>
                    <th className={style.th}>Details After Editing</th>
                    <th className={style.th}>Date & Time	</th>
                    <th className={style.th}>IP</th>
                    <th className={style.th}>Supporting Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {getUpdateHistoryList?.map(v => <tr className={style.tr}>
                    <td className={style.td}>{getEditTypeList?.find(k => k?.id == v?.editTypeId)?.editType}	</td>
                    <td className={style.td}>{getOldValue(v?.oldValue)}	</td>
                    <td className={style.td}>{getCurrentValue(v?.currentValue)}</td>
                    <td className={style.td}>{formatDateTime(v?.createdOn)}	</td>
                    <td className={style.td}>{v?.clientIp}</td>
                    <td className={style.td}><p style={{ color: "blue", cursor: "pointer" }} onClick={() => window.open(v?.filePath)}>{documentList?.find(k => k?.id == v?.documentId)?.documentName}</p></td>
                    {/* <td className={style.td}>{BaseURL+v?.filePath}</td> */}
                  </tr>)}
                </tbody>
              </table>
            </div></>}

          <div className={style.heading} style={{ marginBottom: "5px", marginTop: "30px" }}>Change in {getEditTypeList?.find(k => k?.id == selectedEditType)?.editType}</div>

          <div className={style.tablewrapper} >
            <table className={style.table}>
              <thead className={style.thead}>
                <tr className={style.tr}>
                  <th className={style.th}>Changes In</th>
                  <th className={style.th}>Existing Details</th>
                  <th className={style.th}>New Details</th>
                </tr>
              </thead>
              {selectedEditType == 1 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Name (English)	</td>
                  <td className={style.td}>{oldValue?.englishName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="englishName"
                    style={{ width: "80%" }}
                    value={currentValue?.englishName || ""}
                    onChange={handleChange}
                    onBlur={(e) => changeLang(e.target.value)}

                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Name (Hindi)	</td>
                  <td className={style.td}>{oldValue?.hindiName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="hindiName"
                    style={{ width: "80%" }}
                    disabled
                    value={currentValue?.hindiName || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>





              </tbody>}
              {selectedEditType == 2 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Relative's Name (English)	</td>
                  <td className={style.td}>{userData?.relation + " " + userData?.relativeName || ""}	</td>
                  <td className={style.td} style={{ display: "flex", marginRight: "45px" }}>

                    <SelectDropdown
                      name="EnglishRelation"
                      value={currentValue?.EnglishRelation}
                      onChange={handleChange}
                      topStyle={{ width: '100%' }}
                      style={{ paddingTop: "5.5px", paddingBottom: "5.5px" }}
                      options={relationlist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                      onBlur={(e) => { changeLang(relationlist?.find(v => v?.id == e.target.value)?.nameE, "HindiRelation") }}

                    />
                    <SelectDropdown
                      name="EnglishRelativeName"
                      topStyle={{ width: '100%' }}
                      value={currentValue?.EnglishRelativeName}
                      onChange={handleChange}
                      style={{ paddingTop: "5.5px", paddingBottom: "5.5px" }}
                      onBlur={(e) => { changeLang(e.target.value, "HindiRelativeName") }}

                      options={[{ value: "other", label: "Other" }, ...getfamilymemberList?.map(v => ({ value: v?.memberName, label: v?.memberName }))]}

                    />
                    {currentValue?.EnglishRelativeName == "other" && <InputFieldWithIcon
                      style={{ width: "100%" }}
                      topStyle={{ width: '100%' }}
                      type="text"
                      name="EnglishRelativeNameOther"
                      value={currentValue?.EnglishRelativeNameOther}
                      onBlur={(e) => { changeLang(e.target.value, "HindiRelativeNameOther") }}

                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />}
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Relative's Name (Hindi)	</td>
                  <td className={style.td}>{translatedText && translatedText || ""}	</td>
                  <td className={style.td} style={{ display: "flex", marginRight: "45px" }}>

                    <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelation"
                      value={currentValue?.HindiRelation || ""}
                      disabled
                      topStyle={{ width: '100%' }}

                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelativeName"
                      value={currentValue?.HindiRelativeName || ""}
                      disabled
                      topStyle={{ width: '100%' }}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {currentValue?.EnglishRelativeName == "other" && <InputFieldWithIcon

                      style={{ width: "100%" }}
                      name="HindiRelativeNameOther"
                      value={currentValue?.HindiRelativeNameOther || ""}
                      disabled
                      topStyle={{ width: '100%' }}
                      onKeyDown={(e) => {
                        if (!isAlphabateKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />}</td>
                </tr>





              </tbody>}
              {selectedEditType == 3 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Date of Birth	</td>
                  <td className={style.td}>{formatDate(oldValue?.birthDate) || ""}	</td>
                  <td className={style.td}>  <DatePicker
                    // title={t('dateOfBirth')}
                    // style={{width : "80%"}}
                    type="date"
                    // requried
                    name="birthDate"
                    value={currentValue?.birthDate || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 4 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Category	</td>
                  <td className={style.td}>{userData?.socialCategory || ""}	</td>
                  <td className={style.td}> <SelectDropdown
                    name="category"
                    style={{ width: "80%" }}
                    options={categorylist?.map(v => ({ value: v?.id, label: v?.nameE }))}
                    value={currentValue?.category || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
                {currentValue?.category == "2" && <tr className={style.tr}>
                  <td className={style.td}>Sub Category</td>
                  <td className={style.td}>{userData?.socialSubCategory || "-"}	</td>
                  <td className={style.td}>
                    <SelectDropdown
                      // title={t('tribesCategory')}
                      name="subCategory"
                      options={[{ value: 'General', label: "General" }, { value: 'Scheduled Caste', label: "Scheduled Caste" }]}
                      value={currentValue?.subCategory || ""}
                      onChange={handleChange}
                      style={{ width: "80%" }}

                    />

                    {/* <InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="subCategory"
                    style={{ width: "80%" }}
                    value={currentValue?.subCategory || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    /> */}
                  </td>
                </tr>}
              </tbody>}
              {selectedEditType == 5 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Aadhaar Number</td>
                  <td className={style.td}>{FormatAadharNumber(userData?.aadhaarNo) || ""}	</td>
                  <td className={style.td} >
                    <div style={{ display: selectedEditType == 5 ? "flex" : "", alignItems: "center", justifyContent : "space-between", marginRight : "20px" }}>
                    <InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="aadhaarNo"
                    value={currentValue?.aadhaarNo?.replace(/(\d{4})(?=\d)/g, '$1 ') || ""}
                    style={{ width: "80%" }}
                    onChange={(e) => e.target.value?.length > 14 ? null : handleChange(e)}

                  />
                    {selectedEditType == 5 && <><SubmitButton label={"Get OTP"}
                    							disabled={disableOtp ? true : false}
                                  style={{cursor :disableOtp ? "not-allowed" : "pointer" }}
 onClick={() => {
                      sendAadhaarOTP();
                    }} /></>}
                     {OtpSent && !aadhaarDetails && (
									<Box sx={{ display: "flex", justifyContent: "center" }}>
										<div className="countdown-text">
											{seconds > 0 || minutes > 0 ? (
												<Typography variant="body2">
													Time Remaining:{" "}
													{minutes < 10 ? `0${minutes}` : minutes}:
													{seconds < 10 ? `0${seconds}` : seconds}
												</Typography>
											) : (
												<Typography variant="body2" component="body2">
													{" Didn't recieve code? "}
												</Typography>
											)}

											<button
												disabled={seconds > 0 || minutes > 0}
												style={{
													color:
														seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                            marginLeft : "10px"
												}}
												onClick={() => sendAadhaarOTP()}
											>
												{" "}Resend OTP
											</button>
										</div>
									</Box>
								)}</div>
                   {Object.keys(aadhaarDetails).length === 0 && OtpSent && <Grid
										item
										mt={1}
										container
										rowSpacing={2}

										columnSpacing={{ xs: 1, sm: 2, md: 3 }}
										sx={{}}
									>
										<Grid item xs={2}>
											<p style={{marginTop : "10px", fontSize : "16px"}}>Enter OTP:</p>
										</Grid>

										<Grid item xs={4}>
                    <InputFieldWithIcon
type="number"
value={otp}
onChange={(e) => e.target.value?.length > 6 ? null : setOTP(e.target.value)}


/>

										</Grid>

										<Grid
											item
											xs={3}
											sx={{
												// padding: 3,
												// justifyContent: "center",
												// alignItems: "center",
											}}
										>
											<SubmitButton
												onClick={() => {
													verifyOTP();
												}}
                        label={"Perform EKYC"}
												style={{ width: 120, background: "green", color : "white", marginTop : "4px" }}
											/>

										</Grid>
									</Grid>}
                    </td>

                </tr>
                <tr>
                  <td colspan="12" style={{ padding: "0px 20px 20px 20px" }}>
                {aadhaarDetails?.uidData?.Poi?.$?.name && (
									<Grid
										mt={1}
										container
										columnSpacing={{ xs: 1, sm: 2, md: 3 }}
										xs={12}
									>
										<Grid item xs={6}>
											<Stack
												direction={"row"}
												style={{ background: "#dedede", padding: 8 }}
											>
												<Image
													src={getImagePath("/HPGovt.png")}
													alt="Background Image"
													width={30}
													height={20}
													objectFit="cover"
												/>

												<Typography
													style={{
														fontSize: 14,
														fontWeight: 600,
														marginLeft: 10,
													}}
												>
													Existing Details
												</Typography>
											</Stack>

											<div className="table">
												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Name{""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.nameError ? "red" : "green",
															}}
														>
															{userData?.memberName ? userData?.memberName : "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row">
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																fontWeight: 600,
															}}
														>
															Date of Birth
														</Typography>
													</div>
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																color: errors.dobError ? "red" : "green",
															}}
														>
															{" "}
															{userData?.date_of_birth ? formatDate(userData?.date_of_birth) : "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Care of S/o {""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.coError ? "red" : "green",
															}}
														>
															{userData?.relativeName ? userData?.relativeName : "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Gender:{""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.genderError ? "red" : "green",
															}}
														>
															{" "}
															{userData?.gender ? userData?.gender : "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															State{" "}
														</Typography>
													</div>
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																color: errors.stateError ? "red" : "green",
															}}
														>
                              Himachal Pradesh
															{/* {state ? state : "N.A"} */}
														</Typography>
													</div>
												</div>
												<div className="row">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															District
														</Typography>
													</div>
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																color: errors.distError ? "red" : "green",
															}}
														>
															{userData?.district ? userData?.district : "N.A"}
														</Typography>
													</div>
												</div>

												{/* Add more rows and cells as needed */}
											</div>
										</Grid>

										<Grid item xs={6}>
											<Stack
												direction={"row"}
												style={{ background: "#dedede", padding: 8 }}
											>
												<Image
													src={getImagePath("/aadhaar.svg")}
													width={30}
													height={20}
												/>

												<Typography
													style={{
														fontSize: 14,
														fontWeight: 600,
														marginLeft: 10,
													}}
												>
													Aadhaar Details
												</Typography>
											</Stack>

											<div className="table">
												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Name{""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.nameError ? "red" : "green",
															}}
														>
															{aadhaarDetails?.uidData?.Poi?.$?.name
																? aadhaarDetails?.uidData.Poi.$.name
																: "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Date of Birth
														</Typography>
													</div>
													<div className="cell">

															<Typography
																style={{
																	fontSize: 12,
																	color: errors.dobError ? "red" : "green",
																}}
															>
																{" "}
																{aadhaarDetails?.uidData?.Poi?.$?.dob
																? aadhaarDetails?.uidData.Poi.$.dob
																: "N.A"}
															</Typography>

													</div>
												</div>

												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Care of S/o {""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.coError ? "red" : "green",
															}}
														>
															{aadhaarDetails?.uidData?.Poa?.$?.co
																? aadhaarDetails?.uidData?.Poa?.$?.co
																: "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															Gender:{""}{" "}
														</Typography>
													</div>
													<div className="cell">
														{" "}
														<Typography
															style={{
																fontSize: 12,
																color: errors.genderError ? "red" : "green",
															}}
														>
															{" "}
															{aadhaarDetails.uidData?.Poi?.$?.gender
																? aadhaarDetails.uidData?.Poi?.$?.gender
																: "N.A"}
														</Typography>
													</div>
												</div>

												<div className="row header">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															State{" "}
														</Typography>
													</div>
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																color: errors.stateError ? "red" : "green",
															}}
														>
															{aadhaarDetails.uidData?.Poa?.$?.state
																? aadhaarDetails.uidData?.Poa?.$?.state
																: "N.A"}
														</Typography>
													</div>
												</div>
												<div className="row">
													<div className="cell">
														<Typography
															style={{ fontSize: 12, fontWeight: 600 }}
														>
															District
														</Typography>
													</div>
													<div className="cell">
														<Typography
															style={{
																fontSize: 12,
																color: errors.distError ? "red" : "green",
															}}
														>
															{aadhaarDetails.uidData?.Poa?.$?.dist
																? aadhaarDetails.uidData?.Poa?.$?.dist
																: "N.A"}
														</Typography>
													</div>
												</div>

												{/* Add more rows and cells as needed */}
											</div>
										</Grid>
									</Grid>
								)}
                </td>
                </tr>
              </tbody>}
              {selectedEditType == 6 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Religion</td>
                  <td className={style.td}>{userData?.religion || ""}	</td>
                  <td className={style.td}> <SelectDropdown
                    // title={t('district')}
                    name="religion"
                    value={currentValue?.religion || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={religionList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 7 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Status</td>
                  <td className={style.td}>{userData?.memberStatus || ""}	</td>
                  <td className={style.td}> <DatePicker
                    // title={t('dateOfBirth')}
                    // style={{width : "80%"}}
                    type="date"
                    // requried
                    name="deadDate"
                    value={currentValue?.deadDate || ""}
                    onChange={handleChange}
                  /></td>
                </tr>
              </tbody>}
              {selectedEditType == 8 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Status</td>
                  <td className={style.td}>{userData?.memberStatus || ""}	</td>
                  <td className={style.td}>
                    <Grid container spacing={3}>
                      <Grid item sm={4}> <SelectDropdown
                        title={"Transfer Type"}
                        name="transferType"
                        value={currentValue?.transferType || ""}
                        onChange={handleChange}
                        style={{ width: "80%" }}
                        options={getTransferTypeList?.map(v => ({ value: v?.id, label: v?.transferType }))}

                      /></Grid>
                      <Grid item sm={4}>  <SelectDropdown
                        title={"Transfer To"}
                        name="transferTo"
                        value={currentValue?.transferTo || ""}
                        onChange={handleChange}
                        style={{ width: "80%" }}
                        options={[{ value: "", label: "Select..." },
                        { value: "urban", label: "Urban" },
                        { value: "rural", label: "Rural" },
                        { value: "other", label: "Other State" }
                        ]}

                      /></Grid>
                      <Grid item sm={4}>
                        <DatePicker
                          title={"Transfer Date"}
                          // style={{width : "80%"}}
                          type="date"
                          // requried

                          name="date"
                          value={currentValue?.date || ""}
                          onChange={handleChange}
                        />

                      </Grid>
                      {(currentValue?.transferTo == "urban" || currentValue?.transferTo == "rural") && <Grid item sm={4}>  <SelectDropdown
                        title={t('district')}
                        name="district"
                        id="district"
                        value={currentValue?.district || ""}
                        onChange={(e) => {
                          handleChange(e); currentValue?.transferTo == "urban" ? dispatch(getMunicipalities({ districtCode: e.target.value },startLoading, stopLoading)) :
                            dispatch(getBlock({ districtCode: e.target.value }))
                        }}

                        style={{ width: "80%" }}
                        options={getDistrictList?.map(v => ({ value: v?.lgdCode, label: v?.nameE }))}

                      /></Grid>}
                      {currentValue?.transferTo == "rural" ?
                        <><Grid item sm={4}>  <SelectDropdown
                          title={"Block"}
                          name="block"
                          id="block"
                          value={currentValue?.block || ""}
                          // onChange={handleChange}
                          onChange={(e) => { handleChange(e); dispatch(getPanchayat({ municipalId: e.target.value },startLoading, stopLoading)) }}

                          style={{ width: "80%" }}
                          options={getBlockList?.map(v => ({ value: v?.lgdCode, label: v?.nameE }))}

                        /></Grid>
                          <Grid item sm={4}>  <SelectDropdown
                            title={"Panchayat"}
                            name="panchayat"
                            id="panchayat"
                            value={currentValue?.panchayat || ""}
                            onChange={handleChange}
                            style={{ width: "80%" }}
                            options={getPanchayatList?.map(v => ({ value: v?.lgdCode, label: v?.nameE }))}

                          /></Grid></> : currentValue?.transferTo == "urban" ?
                          <><Grid item sm={4}>  <SelectDropdown
                            title={"Municipality"}
                            name="municipal"
                            id="municipal"
                            value={currentValue?.municipal || ""}
                            onChange={(e) => { handleChange(e); dispatch(getWard({ municipalId: e.target.value },startLoading, stopLoading)) }}

                            style={{ width: "80%" }}
                            options={municipalList?.map(v => ({ value: v?.id, label: v?.name }))}

                          /></Grid>
                            <Grid item sm={4}>  <SelectDropdown
                              title={"Ward"}
                              name="ward"
                              id="ward"
                              value={currentValue?.ward || ""}
                              onChange={handleChange}
                              style={{ width: "80%" }}
                              options={wardList?.map(v => ({ value: v?.id, label: v?.name }))}

                            /></Grid> </> : ""}
                    </Grid>

                  </td>
                </tr>
              </tbody>}
              {selectedEditType == 9 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Name (English)	</td>
                  <td className={style.td}>{oldValue?.englishName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="englishName"
                    style={{ width: "80%" }}
                    value={currentValue?.englishName || ""}
                    onChange={handleChange}
                    onBlur={(e) => changeLang(e.target.value)}

                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Name (Hindi)	</td>
                  <td className={style.td}>{oldValue?.hindiName || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="hindiName"
                    style={{ width: "80%" }}
                    disabled
                    value={currentValue?.hindiName || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!isAlphabateKey(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /></td>
                </tr>





              </tbody>}
              {selectedEditType == 10 && <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>Gender</td>
                  <td className={style.td}>{userData?.gender || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="gender"
                    value={currentValue?.gender || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={genderlist?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Educational Status</td>
                  <td className={style.td}>{userData?.qualification || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="qualification"
                    value={currentValue?.qualification || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={qualificationList?.map(v => ({ value: v?.id, label: v?.nameE }))}

                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Means of Leaving</td>
                  <td className={style.td}>{userData?.profession || ""}	</td>
                  <td className={style.td}><SelectDropdown
                    // title={t('district')}
                    name="profession"
                    value={currentValue?.profession || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                    options={profesionList?.map(v => ({ value: v?.id, label: v?.nameE }))}
                  // options={districtList?.map(v => ({ value: v?.lgdCode, label: v?.nameE })) || []}
                  // value={formData?.district}
                  // onChange={(e) => { handleChange(e); dispatch(getMunicipalities({ districtCode: e.target.value })) }}
                  // requried
                  /></td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>Ration Card Number</td>
                  <td className={style.td}>{userData?.rationCardNo || ""}	</td>
                  <td className={style.td}><InputFieldWithIcon


                    title={""}
                    subTitle=""
                    placeholder=""
                    type="text"
                    name="rationCardNo"
                    value={currentValue?.rationCardNo || ""}
                    onChange={handleChange}
                    style={{ width: "80%" }}
                  // value={memberDetailsExtra?.memberName}
                  // onChange={handleChangeMemberDetails}
                  // onKeyDown={(e) => {
                  //   if (!isAlphabateKey(e.key)) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  /></td>
                </tr>

              </tbody>}
            </table>


          </div>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography fontSize={14} fontWeight={"bold"}>{t('remarks')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextArea
                placeholder="Add remarks..."
                name="remarks"
                value={remarks || ""}
                onChange={(e) => setRemarks(e.target.value)}

              />
            </Grid>
            <Grid item xs={2}>
              <Typography fontSize={14} fontWeight={"bold"}>{t('uploadDocuments')}</Typography>
            </Grid>
            <Grid item xs={4}>
              <SelectDropdown
                name="document"
                options={[{ value: "", label: "Select..." }, ...documentList?.map(v => ({ value: v?.id, label: v?.documentName }))]}

                value={selectedDocumentType || ""}
                onChange={(e) => setSelectedDocumentType(+e.target.value)}
              />
              {errors?.selectedDocumentType && <p className="error">{errors?.selectedDocumentType}</p>}

            </Grid>
            {selectedDocumentType && <Grid item xs={4}>
              <FileUpload
                name="dastavage"
                onChange={(e) => {
                  if(e.target.files?.[0]?.type?.includes("image/") || e.target.files?.[0]?.type?.includes('/pdf')){
                    setUpoadedDocument(e.target.files?.[0])
                  }else{
                    setUpoadedDocument(null)
                  }

                 }}                accept="image/*"

              />
              {upoadedDocument && <a href={URL.createObjectURL(upoadedDocument)} target="_" style={{marginTop : "3px", fontSize :"14px", float : "right", color : "blue"}}>View Uploaded File</a>}
              {errors?.upoadedDocument && <p className="error">{errors?.upoadedDocument}</p>}

            </Grid>}
          </Grid>

          <Box display={"flex"} justifyContent={"center"} mt={5}>
          {selectedEditType != 5 && <SubmitButton label="Update Details" icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}}/>} onClick={handleSubmit} />}
            {selectedEditType == 5 && otpVerified && <SubmitButton label="Update Details" icon={<MdOutlineSave size={18} style={{marginTop : "5px", marginRight : "5px"}} />} onClick={handleSubmit} />}
          </Box></>}

      </Box>
    </MainLayout>
  )
}

// export default EditMember
export default withAuth(EditMember)
