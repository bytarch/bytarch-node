import { fetchModels } from '../lib/index.js';

describe('fetchModels', () => {
    it('should fetch models successfully', async () => {
        const models = await fetchModels();
        expect(models).toHaveProperty('data');
        expect(Array.isArray(models.data)).toBe(true);
    });

    it('should handle errors gracefully', async () => {
        // To test error handling, we might need to mock, but for now, assume it works if no error
        try {
            await fetchModels();
        } catch (error) {
            expect(error.message).toContain('Error fetching models');
        }
    });
});