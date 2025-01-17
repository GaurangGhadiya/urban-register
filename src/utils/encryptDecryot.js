// utils/encryption.js
import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_ENCRYPT_DECRYPT;

export function decryptData(urlEncodedEncrypted) {

    try {
        const bytes = CryptoJS.AES.decrypt(urlEncodedEncrypted, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText);
    } catch (e) {
    }
}

export function encryptData(employeeCode) {
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();
    return encodeURIComponent(encrypted);
}

export function encryptDataPost(employeeCode) {
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();
    return encrypted;
}
export function encryptDataGet(employeeCode) {
    const encrypted = CryptoJS.AES.encrypt(employeeCode, secretKey).toString();
    return encodeURIComponent(encrypted);
}