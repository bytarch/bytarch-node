import { displayModels } from '../lib/index.js'; 

  
console.log("Fetching all models...");
const allModels = await displayModels();
console.log(`Total models: ${allModels?.data?.length || 0}`);

console.log("\nFetching free models only...");
const freeModels = await displayModels({ free: true });
console.log(`Free models: ${freeModels?.data?.length || 0}`);
console.log(freeModels?.data?.map(model => model.id) || []);

console.log("\nFetching Sky models...");
const skyModels = await displayModels({ sky: true });
console.log(`Sky extension models: ${skyModels?.data?.length || 0}`);
console.log(skyModels?.data?.map(model => `${model.name} (${model.id})`) || []);

