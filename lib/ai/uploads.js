class Uploads {
    constructor(apiKey, apiUrl = 'https://api.bytarch.dpdns.org') {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }

    async create(filePathOrStream, options = {}) {
        const isNode = typeof window === 'undefined';
        const formData = new FormData();

        // Handle file input - varies by environment
        if (typeof filePathOrStream === 'string') {
            if (!isNode) {
                throw new Error('File paths are not supported in browser. Provide a File or Blob object.');
            }
            // Node.js: Assume it's a file path
            const fs = await import('fs');
            const fileBuffer = fs.readFileSync(filePathOrStream);
            const fileName = filePathOrStream.split('/').pop() || 'file';
            formData.append('file', new Blob([fileBuffer]), fileName);
        } else if (isNode && (filePathOrStream instanceof Buffer || filePathOrStream.readable)) {
            // Handle Buffer or Readable stream (Node.js only)
            formData.append('file', new Blob([filePathOrStream]), options.fileName || 'file');
        } else if (filePathOrStream instanceof Blob) {
            // Handle Blob or File (works on both client and server)
            formData.append('file', filePathOrStream, options.fileName || 'file');
        } else {
            throw new Error('Invalid file input. On server: file path, Buffer, or stream. On client: File or Blob.');
        }

        const response = await fetch(`${this.apiUrl}/v1/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    async list() {
        const response = await fetch(`${this.apiUrl}/v1/sky/media`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
                }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch uploads: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }
}

export default Uploads;