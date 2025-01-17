import nookies from "nookies";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { decryptData, encryptDataPost } from "./encryptDecryot";

export async function setCookiesValues(keyName, data) {
	// Regular expression to match various date formats

	try {
	await setCookie(null, keyName, encryptDataPost(JSON.stringify(data)), {
			maxAge: 1800,  //30 minit
			// maxAge: 120,  //2 minit
			// maxAge: 120000000000,  //unlimited
			path: "/urbanregister",
		});

		return true;
	} catch (error) {
		return false;
	}

	return {};
}

export async function getCookieValues(keyName) {
	// Regular expression to match various date formats

	try {
		const cookies = await parseCookies();

		const returnValue = await decryptData(cookies?.[keyName]); // Access the value using dynamic keyName

		return returnValue;
	} catch (error) {
		return null;
	}
}

export async function removeCookie(key) {
	const cookies = await parseCookies();
	if (cookies[key]) {
		// Delete the 'token' cookie
		await nookies.destroy(null, key);
	} else {
	}
	// If we are on the client side, remove the cookie directly
	await nookies.destroy(null, key);

}

export async function clearAllCookies() {
	// Get all cookies
	const cookies = await document.cookie.split(';');

	// Iterate over all cookies
	await cookies.forEach(cookie => {
		// Extract cookie name
		const [name] = cookie.split('=');

		// Clear the cookie by setting its expiration date to a past date
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
	});
}
