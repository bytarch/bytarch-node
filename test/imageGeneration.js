import { BytArch } from '../lib/index.js'; 

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

try {
    const styles = [
        {
            model: 'img-flux-realism',
            prompt: 'Create an image of a serene landscape.'
        },
        {
            model: 'img-flux-anime',
            prompt: 'Create a vibrant anime-style character in a fantasy setting.'
        },
        {
            model: 'img-flux',
            prompt: 'Create a modern abstract piece of art.'
        },
        {
            model: 'img-flux-3d',
            prompt: 'Create a 3D render of a futuristic city.'
        },
        {
            model: 'img-flux-disney',
            prompt: 'Create a whimsical scene with a magical castle and fairies.'
        },
        {
            model: 'img-flux-pixel',
            prompt: 'Create a pixel art scene of a retro video game world.'
        },
        {
            model: 'img-flux-4o',
            prompt: 'Create an artistic interpretation with a unique 4O flair.'
        },
        {
            model: 'img-any-dark',
            prompt: 'Create a dark-themed image of a haunted forest.'
        }
    ];

    for (const { model, prompt } of styles) {
        const saveResult = await client.image.generate({
            model: model,
            prompt: prompt,
            saveToFile: `output/${model.split('-')[2]}_image.png`,
        });
        console.log(saveResult);

        const bufferResult = await client.image.generate({
            model: model,
            prompt: prompt,
            returnBuffer: true,
        });
        console.log(bufferResult);

        const urlResult = await client.image.generate({
            model: model,
            prompt: prompt,
        });
        console.log(urlResult);
    }
} catch (error) {
    console.error(error.message);
}
