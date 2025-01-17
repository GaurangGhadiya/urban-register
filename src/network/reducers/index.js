// reducers/index.js
import { combineReducers } from "redux";

import authDetails from "./auth";
import survayAnalysis from "./survayAnalysis";
import getDistrict from "./getDistrict";
import getMunicipalities from "./getMunicipalities";
import getWard from "./getWard";
import getEconomicStatus from "./economicStatus";
import getCategory from "./getCategory";
import getMemberStatus from "./getMemberStatus";
import getQualification from "./getQualification";
import getProfession from "./getProfession";
import getReligion from "./getReligion";
import getGender from "./getGender";
import getRationDetails from "./getRationDetails";
import addFamily from "./addFamily";
import getFamilyById from "./getFamilyById";
import getRelation from "./getRelation";
import addfamilymember from "./addfamilymember";
import getfamilymember from "./getfamilymember";
import getFamilyList from "./getFamilyList";
import updateFamily from "./updateFamily";
import updateFamilyMember from "./updateFamilyMember";
import deleteFamilyMember from "./deleteFamilyMember";
import getFamilyHeadList from "./getFamilyHeadList";
import getEditType from "./getEditType";
import getDocumentList from "./getDocumentList";
import editMember from "./editMember";
import getUpdateHistory from "./getUpdateHistory";
import separateMember from "./separateMember";
import TransferMember from "./TransferMember";
import memberTransferList from "./memberTransferList";
import AddTransferMember from "./AddTransferMember";
import getparivarnakal from "./getparivarnakal";
import getFamilyUpdationList from "./getFamilyUpdationList";
import getBlock from "./getBlock";
import getPanchayat from "./getPanchayat";
import getTransferType from "./getTransferType";
import deleteFamily from "./deleteFamily";
import checkUser from "./checkUser";
import getVerificationReport from "./getVerificationReport";
import VerifyFamily from "./VerifyFamily";
import dashboardCount from "./dashboardCount";
import getGenderReport from "./getGenderReport";
import getMemberTransferedUrban from "./getMemberTransferedUrban";


const rootReducer = combineReducers({
	authDetails,
	survayAnalysis,
	getDistrict,
	getMunicipalities,
	getWard,
	getEconomicStatus,
	getCategory,
	getGender,
	getMemberStatus,
	getQualification,
	getProfession,
	getReligion,
	getRationDetails,
	addFamily,
	getFamilyById,
	getRelation,
	addfamilymember,
	getfamilymember,
	getFamilyList,
	updateFamily,
	updateFamilyMember,
	deleteFamilyMember,
	getFamilyHeadList,
	getEditType,
	getDocumentList,
	editMember,
	getUpdateHistory,
	separateMember,
	TransferMember,
	memberTransferList,
	AddTransferMember,
	getparivarnakal,
	getFamilyUpdationList,
	getBlock,
	getPanchayat,
	getTransferType,
	deleteFamily,
	checkUser,
	getVerificationReport,
	VerifyFamily,
	dashboardCount,
	getGenderReport,
	getMemberTransferedUrban
});

export default rootReducer;
