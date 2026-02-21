/**
 * Vercel serverless entry: forwards all /api/* requests to the Express app in backend.
 */
import app from '../backend/server.js';

export default app;
