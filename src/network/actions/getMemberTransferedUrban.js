// actions/someActions.js

import {
    GET_MEMBER_TRANSFER_URBAN_SUCCESS,
    GET_MEMBER_TRANSFER_URBAN_FALIURE,
} from "../action_types";
import { encryptDataGet } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";

// Action Creators
export const getMemberTransferedUrbanSuccess = (data) => ({
    type: GET_MEMBER_TRANSFER_URBAN_SUCCESS,
    payload: data,
});

export const getMemberTransferedUrbanFaliure = (error) => ({
    type: GET_MEMBER_TRANSFER_URBAN_FALIURE,
    payload: error,
});

export const getMemberTransferedUrban = (body, startLoading = () => { }, stopLoading = () => { }) => {
    return async (dispatch) => {
        startLoading()
        try {
            let newBody = {
                district_id: typeof body?.district_id == "number" ? JSON.stringify(body?.district_id) : body?.district_id,
                municipal: typeof body?.municipal == "number" ? JSON.stringify(body?.municipal) : body?.municipal,
                ward_id: typeof body?.ward_id == "number" ? JSON.stringify(body?.ward_id) : body?.ward_id,

            }
            console.log('body', newBody)

            const response = await ApiPostNoAuth(`/urbanregister/get-memberTransferedUrban?district=${encryptDataGet(newBody?.district_id)}&mc=${encryptDataGet(newBody?.municipal)}&ward=${encryptDataGet(newBody?.ward_id)}`, {});
            dispatch(getMemberTransferedUrbanSuccess(JSON.parse(response)));
            console.log('JSON.parse(response)', JSON.parse(response))
            stopLoading()
        } catch (error) {
            stopLoading()
            dispatch(getMemberTransferedUrbanFaliure(error));
        }
    };
};
