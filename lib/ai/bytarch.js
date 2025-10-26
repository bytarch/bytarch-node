import OpenAI from 'openai';
import Uploads from './uploads.js';
import Public from './public.js';

const isValidUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};

class BytArch {
    constructor({ apiKey, apiUrl }) {
        if (!isValidUUID(apiKey)) {
            throw new Error('Invalid API key format. Get your API key from https://bytarch.netlify.app/dashboard?section=profile');
        }
        this.apiKey = apiKey;
        this.apiUrl = apiUrl || 'https://api.bytarch.dpdns.org';
        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: `${this.apiUrl}/openai/v1`,
        });
        this.uploads = new Uploads(apiKey, this.apiUrl);
        this.public = new Public(this.apiUrl);
    }

    chat = {
        completions: {
            create: async (params) => {
                return await this.openai.chat.completions.create(params);
            },
        },
    };
}

export default BytArch;
