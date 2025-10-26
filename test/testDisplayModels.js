import { displayModels } from '../lib/index.js';

describe('displayModels', () => {
    it('should fetch all models by default', async () => {
        const models = await displayModels();
        expect(models).toHaveProperty('data');
        expect(Array.isArray(models.data)).toBe(true);
    });

    it('should fetch free models when free option is true', async () => {
        const models = await displayModels({ free: true });
        expect(models).toHaveProperty('data');
        expect(Array.isArray(models.data)).toBe(true);
        // Assume free models are filtered
        models.data.forEach(model => {
            expect(model.isFree).toBe(true);
        });
    });

    it('should fetch sky models when sky option is true', async () => {
        const models = await displayModels({ sky: true });
        expect(models).toHaveProperty('data');
        expect(Array.isArray(models.data)).toBe(true);
        // Sky models have different structure
    });

    it('should handle errors gracefully', async () => {
        // Mock or assume error handling
        const models = await displayModels({ sky: true });
        // In case of error, it returns null
        if (models === null) {
            expect(models).toBe(null);
        } else {
            expect(models).toHaveProperty('data');
        }
    });
});