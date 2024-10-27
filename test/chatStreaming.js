
import { BytArch } from '../lib/index.js'; 

    const client = new BytArch({
        apiKey: "BytArch_API_KEY", 
    });

   
    
    try {
        const stream = await client.chat.completions.create({
            model: "byt-gpt-4o",
            messages: [{ role: 'user', content: 'Say this is a test' }],
            stream: true,
        });

        for await (const chunk of stream) {
            console.log(chunk.choices[0]?.delta?.content || ''); 
        }
    } catch (error) {
        console.error('Error streaming chat completion:', error);
    }


