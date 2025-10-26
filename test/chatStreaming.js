
import { BytArch } from '../lib/index.js'; 

    const client = new BytArch({
         apiKey: "",  
    });

   
    
    try {
        const stream = await client.chat.completions.create({
            model: "phind-405b",
            messages: [{ role: 'user', content: 'Say this is a test' }],
            stream: true,
        });

        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
        }
        console.log(); // Add newline after streaming
    } catch (error) {
        console.error('Error streaming chat completion:', error);
    }


