import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

class BytArch {
    constructor({ apiKey }) { 
        if (!apiKey.startsWith('byt-')) {
            throw new Error('Invalid API key: It must start with "byt-".');
        }
        this.apiKey = apiKey; 
        this.APIUrl = 'https://blue-lion-79.telebit.io/api/v2/ai/bylearn/completions';
    }

    chat = {
        completions: {
            create: async (params) => {
                const model = params.model; 
                if (model.startsWith('img-flux') || model.startsWith('img')) {
                    throw new Error(`Invalid model: ${model}.`);
                }
                const API_URL = this.APIUrl;
                const body = JSON.stringify({
                    model: model,
                    messages: params.messages,
                    stream: params.stream || false,
                    max_tokens: params.max_tokens || 1600,
                });

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                    body: body,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch completions. Status code: ${response.status}`);
                }

                if (params.stream) {
                    const textResponse = await response.text(); 
                    if (!textResponse) {
                        return { [Symbol.asyncIterator]() { return { next: () => ({ done: true }) }; } }; 
                    }

                    const words = textResponse.trim().split(/\s+/); 
                    let index = 0; 

                    return {
                        [Symbol.asyncIterator]() {
                            return {
                                next: () => {
                                    if (index < words.length) {
                                        const word = words[index++]; 
                                        return Promise.resolve({ 
                                            value: { 
                                                id: `bytcmpl-${Date.now()}`, 
                                                object: 'chat.completion',
                                                created: Math.floor(Date.now() / 1000),
                                                model: model,
                                                choices: [{ delta: { index, content: word + ' ' } }] 
                                            }, 
                                            done: false 
                                        }); 
                                    } else {
                                        return Promise.resolve({ done: true }); 
                                    }
                                },
                            };
                        },
                    };
                } else {
                    const data = await response.json();
                    const responseData = {
                        id: `bytcmpl-${Date.now()}`, 
                        object: 'chat.completion',
                        created: Math.floor(Date.now() / 1000), 
                        model: model,
                        choices: [
                            {
                                index: 0,
                                message: {
                                    role: 'assistant',
                                    content: data.response,
                                },
                            },
                        ],
                    };
                    
                    return responseData;
                }
            },
        },
    };

    image = {
        generate: async (params) => {
            const model = params.model; 
            if (!model.startsWith('img-flux') && !model.startsWith('img')) {
                throw new Error(`Invalid model: ${model}.`);
            }

            const API_URL = this.APIUrl; 
            const body = JSON.stringify({
                messages: [{ role: 'user', content: params.prompt }],
                model: model,
            });

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': this.apiKey,
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch images. Status code: ${response.status}`);
            }

            const data = await response.json();
            if (data.response) {
                const imageUrl = data.response; 

                if (params.saveToFile) {
                    const dir = path.dirname(params.saveToFile);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    const imageResponse = await fetch(imageUrl);
                    if (!imageResponse.ok) {
                        throw new Error(`Failed to download image. Status code: ${imageResponse.status}`);
                    }
                    const buffer = await imageResponse.arrayBuffer();
                    fs.writeFileSync(params.saveToFile, Buffer.from(buffer));
                    return { message: 'Image saved successfully!', file: params.saveToFile };
                } else if (params.returnBuffer) {
                    const imageResponse = await fetch(imageUrl);
                    if (!imageResponse.ok) {
                        throw new Error(`Failed to download image. Status code: ${imageResponse.status}`);
                    }
                    return Buffer.from(await imageResponse.arrayBuffer());
                } else {
                    return imageUrl; 
                }
            }

            throw new Error('No image data found in the response.');
        },
    };
}

export default BytArch;
