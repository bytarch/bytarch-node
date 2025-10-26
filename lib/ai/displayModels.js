import { fetchModels } from './getModels.js'; // Ensure the path is correct

export async function displayModels(options = {}) {
    try {
        const models = await fetchModels();
        if (options.free) {
            return {
                ...models,
                data: models.data.filter(model => model.isFree === true)
            };
        }
        if (options.sky) {
            const response = await fetch('https://flow-models.bytarch.dpdns.org/genie-extension.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch Sky extension models. Status code: ${response.status}`);
            }
            return await response.json();
        }
        return models;
    } catch (error) {
        console.error('Error fetching models:', error);
        return null; // Return null to indicate failure
    }
}
