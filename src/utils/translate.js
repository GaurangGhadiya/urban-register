const axios = require('axios');

// Function to translate English word to Hindi using Google Translate API
export default async function translateToHindi(word) {
    try {
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(word)}`);
        // Parsing the translated text from the response
        const translatedWord = response.data[0][0][0];
        return translatedWord;
    } catch (error) {
        console.error('Error translating word:', error);
        return null;
    }
}
export async function translateToHindi2(word) {
    try {
        const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(word)}`);
        // Parsing the translated text from the response
        const translatedWord = response.data[0][0][0];
        return  new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(translatedWord); // Simulated translation result
            }, 1000); // Simulating asynchronous operation
          });;
    } catch (error) {
        console.error('Error translating word:', error);
        return null;
    }
}