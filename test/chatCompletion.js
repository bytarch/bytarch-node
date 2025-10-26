import { BytArch } from '../lib/index.js';

const client = new BytArch({
    apiKey: "",  
});

try {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: "phind-405b",
    });
    console.log('Chat Completion:', chatCompletion.choices[0].message.content); 
} catch (error) {
    console.error('Error fetching chat completion:', error);
}
