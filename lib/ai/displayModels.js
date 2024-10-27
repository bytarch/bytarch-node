import { fetchModels } from './getModels.js'; // Ensure the path is correct

export async function displayModels() {
    try {
        const models = await fetchModels();
        return models.map((model) => {
            const label = `${model.label_part1} ${model.label_part2}`.trim();
            return {
                name: label,
                model: model.value,
                description: model.description
            };
        });
    } catch (error) {
        console.error('Error fetching models:', error);
        return null; // Return null to indicate failure
    }
}
