import { clearAllCookies, getCookieValues, removeCookie } from '@/utils/cookies';
import { decryptData, encryptDataGet, encryptDataPost } from '@/utils/encryptDecryot';
import JsonToFormData from '@/utils/jsonToFormData';
import toast from 'react-hot-toast';

// export const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const axios = require('axios').default;
export const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

function checkForKey(obj, substring) {
  for (let key in obj) {
    if (key.includes(substring)) {
      return true; // Found a key that includes the substring
    }
  }
  return false; // No key includes the substring
}


function objectToQueryString(obj) {
  const queryParams = [];
  try {

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        queryParams.push(`${key}=${encryptDataGet(obj[key])}`);
      }
    }
    return queryParams.join('&');
  } catch (error) {
    console.warn('error 123', error)
  }
}

export const logoutFunction =async (error) => {
  const userData = await getCookieValues("userData")
  if (userData) {
    if (userData?.email?.includes("himaccess.hp.gov.in")) {

      await clearAllCookies();
      await removeCookie('userData')
      if (error) {
        toast.error(error,
          {
            id: 'clipboard',
          }
        )
      }
      setTimeout(() => {
        window.location.pathname = "/urbanregister"
      }, 500);
    } else {
      await clearAllCookies();
      await removeCookie('userData')
      if (error) {
        toast.error(error,
          {
            id: 'clipboard',
          }
        )
      }
      const logoutURL = `https://sso.hp.gov.in/official/site/logout?onboardingapp=${process.env.NEXT_PUBLIC_ONBOARDING_APP}&user_name=${userData?.email || userData?.username}`;
      window.location.href = logoutURL
    }
  }

}

export const ApiPostNoAuth =async (url, body) => {

  let includesLE = checkForKey(body, 'documentFiles');
  let includesLE2 = checkForKey(body, 'consentDocName');
  let includesLE3 = checkForKey(body, 'TransferMembers');
  let encryptedBody
  if (includesLE) {
    let formData = new FormData();
    formData.append("documentFiles", body?.documentFiles)
    formData.append("memberUpdate", encryptDataPost(JSON.stringify(body?.memberUpdate)))
    encryptedBody = formData
  } else if (includesLE2) {
    let formData = new FormData();
    formData.append("consentDocName", body?.consentDocName)
    formData.append("AddFamily", encryptDataPost(JSON.stringify(body?.AddFamily)))
    if (body?.SeparateMembers) formData.append("SeparateMembers", encryptDataPost(JSON.stringify(body?.SeparateMembers)))
    if (body?.TransferMembers) formData.append("TransferMembers", encryptDataPost(JSON.stringify(body?.TransferMembers)))
    encryptedBody = formData
  } else if (includesLE3) {
    let formData = new FormData();
    formData.append("TransferMembers", encryptDataPost(JSON.stringify(body?.TransferMembers)))
    encryptedBody = formData
  }
  else {

    encryptedBody = encryptDataPost(JSON.stringify(body))
  }

  const userData = await getCookieValues("userData")
  return new Promise(async(resolve, reject) => {
    let defaultHeaders = {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
        "X-Frame-Options": "DENY",
        // 'Authorization': `Bearer ${userData || ""}`,

      },
    }
    let defaultHeadersToken = {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
        "X-Frame-Options": "DENY",
        'Authorization': `Bearer ${userData?.jwtToken || "aaa"}`,

      },
    }
   await axios
      .post(
        BaseURL + url,
        encryptedBody,
        // defaultHeaders
        url.includes("auth/login") ? defaultHeaders : defaultHeadersToken
      )
      .then((responseJson) => {
        const data = decryptData(responseJson?.data?.data);
        resolve(data);
      })

      .catch(async(error) => {
        if (error?.response?.status == 401) {
          logoutFunction("Access denied!")
        } else {
          if (
            error &&
            error.hasOwnProperty('response') &&
            error.response &&
            error.response.hasOwnProperty('data') &&
            error.response.data &&
            error.response.data.hasOwnProperty('message') &&
            error.response.data.error
          ) {
            reject(error.response.data);
          } else {

            reject(error);
          }
        }

      });
  });
};


export const ApiPostFormData = async(url, body) => {
  const userData = await getCookieValues("userData")
  let defaultHeaders = {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      "X-Frame-Options": "DENY",
      // 'Authorization': `Bearer ${userData || ""}`,

    },
  }
  let defaultHeadersToken = {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      "X-Frame-Options": "DENY",
      'Authorization': `Bearer ${userData?.jwtToken || "aaa"}`,

    },
  }
  return new Promise(async(resolve, reject) => {
  await  axios
      .post(
        BaseURL + url,
        body,
        // defaultHeaders
        url.includes("auth/login") ? defaultHeaders : defaultHeadersToken
      )
      .then((responseJson) => {
        const data = decryptData(responseJson?.data?.data);
        resolve(data);
      })

    .catch(async (error) => {
      if (error?.response?.status == 401) {
        logoutFunction("Access denied!")
      } else {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('message') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {

          reject(error);
        }
      }

    });
  });
};

export const ApiGetNoAuth =async (url, params = {}) => {
  const userData = await getCookieValues("userData")
  let defaultHeaders = {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      "X-Frame-Options": "DENY",
      // 'Authorization': `Bearer ${userData || ""}`,

    },
  }
  let defaultHeadersToken = {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
      "X-Frame-Options": "DENY",
      'Authorization': `Bearer ${userData?.jwtToken || "aaa"}`,

    },
  }
  let apiUrl = url + objectToQueryString(params)
  return new Promise(async(resolve, reject) => {
   await axios
      .get(BaseURL + apiUrl,
        // defaultHeaders
        url.includes("auth/login") ? defaultHeaders : defaultHeadersToken
)
      .then(async (responseJson) => {
        const data = decryptData(responseJson?.data?.data);
        resolve(data);
      })
      .catch(async (error) => {
        if (error?.response?.status == 401) {
          logoutFunction("Access denied!")
        } else {
          if (
            error &&
            error.hasOwnProperty('response') &&
            error.response &&
            error.response.hasOwnProperty('data') &&
            error.response.data &&
            error.response.data.hasOwnProperty('message') &&
            error.response.data.error
          ) {
            reject(error.response.data);
          } else {

            reject(error);
          }
        }

      });
  });
};
