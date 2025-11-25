import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get API URL from environment variable or use default
const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

// Warn if using default in what looks like a production build
if (!process.env.VITE_API_URL && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  WARNING: VITE_API_URL not set, using default localhost URL');
}

console.log('Building with API URL:', API_URL);

// Create .env file for Vite
const envContent = `VITE_API_URL=${API_URL}\n`;

// Write to .env file in the frontend directory
const envPath = join(__dirname, '.env');
writeFileSync(envPath, envContent, 'utf8');

console.log('Created .env file with VITE_API_URL:', API_URL);

