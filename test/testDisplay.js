import { displayModels } from '../lib/index.js'; 

  
console.log("Fetching models...");
 
 const models = await displayModels();
 console.log(models);

