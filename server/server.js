import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package

// Import the routers for your routes
import plantsRouter from './routes/plants.js';
import potsRouter from './routes/pots.js';
import soilTypesRouter from './routes/soilTypes.js';
import accessoriesRouter from './routes/accessories.js';
import customKitsRouter from './routes/customKits.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/plants', plantsRouter);
app.use('/api/pots', potsRouter);
app.use('/api/soilTypes', soilTypesRouter);
app.use('/api/accessories', accessoriesRouter);
app.use('/api/customKits', customKitsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
