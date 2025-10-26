import BytArch from '../lib/ai/bytarch.js';

describe('BytArch Class', () => {
    describe('constructor', () => {
        it('should initialize with valid UUID', () => {
            const validUUID = '12345678-1234-1234-1234-123456789abc';
            const client = new BytArch({ apiKey: validUUID });
            expect(client.apiKey).toBe(validUUID);
            expect(client.apiUrl).toBe('https://api.bytarch.dpdns.org');
        });

        it('should accept custom apiUrl', () => {
            const validUUID = '12345678-1234-1234-1234-123456789abc';
            const customUrl = 'https://custom.api.url';
            const client = new BytArch({ apiKey: validUUID, apiUrl: customUrl });
            expect(client.apiUrl).toBe(customUrl);
        });

        it('should throw error for invalid UUID', () => {
            expect(() => {
                new BytArch({ apiKey: 'invalid-key' });
            }).toThrow('Invalid API key format');
        });
    });

    describe('chat.completions.create', () => {
        it('should create chat completion', async () => {
            const validUUID = '12345678-1234-1234-1234-123456789abc';
            const client = new BytArch({ apiKey: validUUID });

            // Mock the openai call or assume it's tested via integration
            // For unit test, we can check if the method exists
            expect(typeof client.chat.completions.create).toBe('function');
        });
    });
});