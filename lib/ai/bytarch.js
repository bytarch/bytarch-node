import Uploads from './uploads.js';
import Public from './public.js';

const isValidUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
};

class BytArch {
    constructor({ apiKey, apiUrl }) {
        this.apiUrl = apiUrl || 'https://api.bytarch.dpdns.org';
        if (apiKey) {
            if (!isValidUUID(apiKey)) {
                throw new Error('Invalid API key format. Get your API key from https://bytarch.netlify.app/dashboard?section=profile');
            }
            this.apiKey = apiKey;
            // Use SDK in Node.js, fetch in browser
            this.useSdk = typeof window === 'undefined';
            if (this.useSdk) {
                // Dynamic import to avoid browser issues
                import('openai').then(OpenAI => {
                    this.openai = new OpenAI.default({
                        apiKey: apiKey,
                        baseURL: `${this.apiUrl}/openai/v1`,
                    });
                });
            }
            this.uploads = new Uploads(apiKey, this.apiUrl);
        } else {
            this.useFetch = true;
        }
        this.public = new Public(this.apiUrl);
    }

    streamResponse(response) {
        return {
            async *[Symbol.asyncIterator]() {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop(); // Keep incomplete line in buffer

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') continue;
                                try {
                                    const chunk = JSON.parse(data);
                                    yield chunk;
                                } catch (e) {
                                    // Ignore invalid JSON
                                }
                            }
                        }
                    }
                } finally {
                    reader.releaseLock();
                }
            },
        };
    }

    chat = {
        completions: {
            create: async (params) => {
                if (this.useFetch || !this.useSdk) {
                    if (params.stream) {
                        const response = await fetch(`${this.apiUrl}/openai/v1/chat/completions`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(params),
                        });
                        if (!response.ok) {
                            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
                        }
                        return this.streamResponse(response);
                    } else {
                        const response = await fetch(`${this.apiUrl}/openai/v1/chat/completions`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(params),
                        });
                        if (!response.ok) {
                            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
                        }
                        return await response.json();
                    }
                } else {
                    // Wait for SDK to be loaded if not yet
                    if (!this.openai) {
                        await import('openai').then(OpenAI => {
                            this.openai = new OpenAI.default({
                                apiKey: this.apiKey,
                                baseURL: `${this.apiUrl}/openai/v1`,
                            });
                        });
                    }
                    return await this.openai.chat.completions.create(params);
                }
            },
        },
    };
}

export default BytArch;
