
# @bytarch/ai

The official javascript library for the BytArch API
## Features

- Fetch and display available AI models from the BytArch API.
- Filter models to show only free models or Sky extension models.
- Generate AI-powered chat completions and stream responses in real-time.
- Upload files (images, documents) to the BytArch platform.
- List uploaded media files.
- Access public uploads, chats, and retrieve items by ID.
- Simple and intuitive API for interacting with BytArch services.

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
## AI Chat Completions

The `BytArch` library provides access to AI-powered chat completions through an OpenAI-compatible interface.

### Non-Streaming Chat Completion

```javascript
import { BytArch } from '@bytarch/ai';

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

try {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: "phind-405b",
    });
    console.log('Chat Completion:', chatCompletion.choices[0].message.content);
} catch (error) {
    console.error('Error fetching chat completion:', error);
}
```

### Streaming Chat Completions

```javascript
import { BytArch } from '@bytarch/ai';

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

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
```

## Displaying Available Models

```javascript
import { displayModels } from '@bytarch/ai';

console.log("Fetching all models...");
const allModels = await displayModels();
console.log(`Total models: ${allModels?.data?.length || 0}`);

console.log("\nFetching free models only...");
const freeModels = await displayModels({ free: true });
console.log(`Free models: ${freeModels?.data?.length || 0}`);

console.log("\nFetching Sky models...");
const skyModels = await displayModels({ sky: true });
console.log(`Sky extension models: ${skyModels?.data?.length || 0}`);
```

## File Uploads

Upload files to the BytArch platform:

```javascript
import { BytArch } from '@bytarch/ai';

const client = new BytArch({ apiKey: 'BytArch_API_KEY' });

// Upload a file from path
const uploadResult = await client.uploads.create('/path/to/your/file.jpg');
console.log('Upload result:', uploadResult);

// Upload a Buffer
const fs = await import('fs');
const fileBuffer = fs.readFileSync('/path/to/your/file.jpg');
const bufferUpload = await client.uploads.create(fileBuffer, { fileName: 'my-image.jpg' });

// List uploaded files
const uploads = await client.uploads.list();
console.log('Uploaded files:', uploads);
```

## Public API Access

Access public content without authentication:

```javascript
import { BytArch } from '@bytarch/ai';

const publicClient = new BytArch().public; // No API key needed for public access

// List public uploads
const publicUploads = await publicClient.listUploads();
console.log('Public uploads:', publicUploads);

// List public chats
const publicChats = await publicClient.listChats();
console.log('Public chats:', publicChats);

// Get specific item by ID
const item = await publicClient.getById('some-id');
console.log('Public item:', item);
```

## Error Handling

The library throws errors when:
- An invalid API key format is provided (must be valid UUID).
- Network requests fail.
- File uploads are invalid.

## Available Scripts

The package.json includes several scripts for testing different functionalities:

- `npm run models` - Test displaying available models
- `npm run chat` - Test chat completion
- `npm run stream` - Test streaming chat completion

## Contributing

Contributions are welcome! If you would like to enhance this project, please submit issues or pull requests.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to the project maintainers.
