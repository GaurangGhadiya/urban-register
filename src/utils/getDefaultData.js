const { getCookieValues } = require("./cookies")

const getDefaultData =async () => {
    const data =await getCookieValues("userData")
    if (data) {

        let obj = {
            district : data?.district_code,
            municipal: data?.municipality_id,
            ward : data?.ward_id
        }
        return obj
    }
}

export default getDefaultData;