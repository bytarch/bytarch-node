
# @bytarch/ai

The official javascript library for the BytArch API
## Features

- Generate images using different artistic styles such as Realism, Anime, 3D, Disney, and more.
- Stream chat completions in real-time.
- Fetch chat completions for a given message.
- Save generated images to a specified file, retrieve them as a Buffer, or obtain a URL to the generated image.
- User-friendly API that simplifies the image generation process.

## Installation

To install @bytarch/ai, you can use npm:

```bash
npm install @bytarch/ai
```

## Usage

To get started, you need to import the `BytArch` class and create an instance by providing your API key.

```javascript
import { BytArch } from '@bytarch/ai';

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });
```

## Generating Images

You can generate images by calling the `generate` method on the `image` property of the `client` instance. Below are examples demonstrating how to generate images in various art styles.

### Example Code

#### Image Generation with Different Styles

```javascript
import { BytArch } from '@bytarch/ai'; 

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
```

#### Streaming Chat Completions

```javascript
import { BytArch } from '@bytarch/ai'; 

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

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
```

#### Fetching Chat Completions

```javascript
import { BytArch } from '@bytarch/ai'; 

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

try {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: "byt-gpt-4o",
    });
    console.log('Chat Completion:', chatCompletion.choices[0].message.content); 
} catch (error) {
    console.error('Error fetching chat completion:', error);
}

```

#### Displaying Available Models

```javascript
import { displayModels } from '@bytarch/ai'; 

console.log("Fetching models...");

const models = await displayModels();
console.log(models);
```

## Parameters

- **model**: The model to use for image generation (e.g., `img-flux-realism`).
- **prompt**: A string describing the image you want to generate.
- **saveToFile**: (Optional) A string specifying the file path to save the generated image.
- **returnBuffer**: (Optional) A boolean indicating if you want the image returned as a Buffer.

## Error Handling

The library throws errors when:
- An invalid API key is provided.
- The model name does not match the required format.
- Image generation fails due to API issues.

## Contributing

Contributions are welcome! If you would like to enhance this project, please submit issues or pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to the project maintainers.
```

### Final Notes

- Remember to adjust the API key placeholder and any specific details you feel necessary to include based on your project requirements.
- Ensure that the `output` directory exists for saving images before running the examples.
- Customize any sections based on additional features or preferences you might want to highlight.
