const FormatAadharNumber = (value) => {
    return  `XXXX-XXXX-${value
        ?.toString()
        .slice(-4)}` || ""
}

export default FormatAadharNumber

const isValidMobileNumber = (number) =>  {
    // Regular expression to match numbers starting with 6, 7, 8, or 9
    const regex = /^[6-9]\d{9}$/;
    if(regex.test(number)){
        return true
    }else{
        return false
    }
  }

export { isValidMobileNumber };