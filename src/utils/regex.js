export const isAlphanumericKey = (key) => {
    return /^[a-zA-Z0-9 ]+$/.test(key);
  };
export const isValidRationCardNumber = (key) => {
    return/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(key);
  };
export const isAlphabateKey = (key) => {
    return /^[a-zA-Z ]+$/.test(key);
  };
export const isNumericKeyWithSpace = (key) => {
    return /^[0-9 \b]+$/.test(key);
  };
export const isNumericKeyWithHifan = (key) => {
    return /^[0-9-]+$/.test(key);
  };