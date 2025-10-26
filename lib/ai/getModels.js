
const API_URL = 'https://api.bytarch.dpdns.org/openai/v1/models';

export async function fetchModels() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }
        const models = await response.json();
        return models;
    } catch (error) {
        throw new Error(`Error fetching models: ${error.message}`);
    }
}
