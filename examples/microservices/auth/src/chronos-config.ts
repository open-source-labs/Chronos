import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Create __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// Debugging logs to check if .env variables are loaded correctly
console.log(' Loaded CHRONOS_URI:', process.env.CHRONOS_URI);
console.log(' Loaded CHRONOS_MODE:', process.env.CHRONOS_MODE);
console.log(' Loaded CHRONOS_DB:', process.env.CHRONOS_DB);
console.log(' Loaded CHRONOS_CONNECTION:', process.env.CHRONOS_CONNECTION);

const chronosConfig = {
  microservice: 'auth',
  interval: 5000,
  mode: (process.env.CHRONOS_MODE as 'kafka' | 'kubernetes' | 'microservices' | 'docker') || 'microservices', // ✅ Default mode
  dockerized: false,
  database: {
    connection: (process.env.CHRONOS_CONNECTION as 'REST' | 'gRPC') || 'REST', // ✅ Ensure only valid values
    type: (process.env.CHRONOS_DB as 'MongoDB' | 'PostgreSQL') || 'MongoDB', // ✅ Default to MongoDB
    URI: process.env.CHRONOS_URI ?? 'mongodb://127.0.0.1:27017/auth', // ✅ Ensure URI is always a string
  },
  notifications: [],
};

export default chronosConfig;


//CHRONOS_URI=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5