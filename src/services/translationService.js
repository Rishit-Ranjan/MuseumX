// Securely load the key from environment variables
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || '';
export const translateText = async (text, target) => {
    if (!text)
        return '';
    if (!API_KEY) {
        console.warn('Google Translate API Key is missing in environment variables (process.env.GOOGLE_TRANSLATE_API_KEY). returning original text.');
        return text;
    }
    const API_URL = 'https://translation.googleapis.com/language/translate/v2';
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: target,
                format: 'text',
                source: 'en'
            })
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        if (data.data && data.data.translations && data.data.translations.length > 0) {
            return data.data.translations[0].translatedText;
        }
        return text; // Fallback
    }
    catch (error) {
        console.error("Translation Service Error:", error);
        return text;
    }
};
