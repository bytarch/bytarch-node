import fetch from 'node-fetch';

const API_URL = 'https://blue-lion-79.telebit.io/v2/assets/ai/models.json';

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
