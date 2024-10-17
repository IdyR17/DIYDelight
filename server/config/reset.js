import { pool } from './database.js';

const createTables = async () => {
    try {
        const plantTable = `
            CREATE TABLE IF NOT EXISTS Plants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                light_requirements VARCHAR(50) NOT NULL,
                water_needs VARCHAR(50) NOT NULL,
                difficulty_level VARCHAR(50) NOT NULL,
                image_url TEXT NOT NULL,
                description TEXT
            );`;

        const potTable = `
            CREATE TABLE IF NOT EXISTS Pots (
                id SERIAL PRIMARY KEY,
                style VARCHAR(255) NOT NULL,
                color VARCHAR(50) NOT NULL,
                size VARCHAR(50) NOT NULL,
                material VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url TEXT NOT NULL
            );`;

        const soilTable = `
            CREATE TABLE IF NOT EXISTS SoilTypes (
                id SERIAL PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                description TEXT,
                compatible_plants TEXT,
                price DECIMAL(10, 2) NOT NULL
            );`;

        const accessoriesTable = `
            CREATE TABLE IF NOT EXISTS Accessories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                image_url TEXT NOT NULL
            );`;

        const customKitsTable = `
            CREATE TABLE IF NOT EXISTS CustomKits (
                id SERIAL PRIMARY KEY,
                user_id INTEGER,
                plant_id INTEGER REFERENCES Plants(id),
                pot_id INTEGER REFERENCES Pots(id),
                soil_id INTEGER REFERENCES SoilTypes(id),
                accessories JSON,
                total_price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`;

        // Execute the queries to create the tables
        await pool.query(plantTable);
        await pool.query(potTable);
        await pool.query(soilTable);
        await pool.query(accessoriesTable);
        await pool.query(customKitsTable);

        console.log('Tables created successfully.');

        // Insert initial data
        const insertPlants = `
            INSERT INTO Plants (name, light_requirements, water_needs, difficulty_level, image_url, description)
            VALUES 
                ('Snake Plant', 'Low', 'Low', 'Easy', 'https://example.com/snake_plant.jpg', 'Great for beginners and low light areas.'),
                ('Fiddle Leaf Fig', 'Bright Indirect', 'Moderate', 'Intermediate', 'https://example.com/fiddle_leaf_fig.jpg', 'Requires consistent watering and light.'),
                ('Succulent', 'Bright', 'Low', 'Easy', 'https://example.com/succulent.jpg', 'Drought tolerant, perfect for dry conditions.');`;

        const insertPots = `
            INSERT INTO Pots (style, color, size, material, price, image_url)
            VALUES 
                ('Modern', 'White', 'Small', 'Ceramic', 15.99, 'https://example.com/modern_white_small.jpg'),
                ('Classic', 'Terracotta', 'Medium', 'Clay', 12.99, 'https://example.com/classic_terracotta_medium.jpg'),
                ('Hanging', 'Green', 'Large', 'Plastic', 18.99, 'https://example.com/hanging_green_large.jpg');`;

        const insertSoils = `
            INSERT INTO SoilTypes (type, description, compatible_plants, price)
            VALUES 
                ('Cactus Mix', 'Ideal for succulents and cacti, fast-draining.', 'Succulent, Cactus', 5.99),
                ('All-purpose Potting Mix', 'Suitable for a variety of houseplants.', 'Snake Plant, Fiddle Leaf Fig', 4.99),
                ('Orchid Bark', 'Great for orchids and other epiphytes.', 'Orchid', 6.99);`;

        const insertAccessories = `
            INSERT INTO Accessories (name, type, description, price, image_url)
            VALUES 
                ('Watering Can', 'Tool', 'A small watering can for indoor plants.', 10.99, 'https://example.com/watering_can.jpg'),
                ('Grow Light', 'Lighting', 'Provides additional light for indoor plants.', 25.99, 'https://example.com/grow_light.jpg'),
                ('Pruning Shears', 'Tool', 'Helps keep your plants neatly trimmed.', 8.99, 'https://example.com/pruning_shears.jpg');`;

        // Execute the queries to insert initial data
        await pool.query(insertPlants);
        await pool.query(insertPots);
        await pool.query(insertSoils);
        await pool.query(insertAccessories);

        console.log('Initial data inserted successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        pool.end();
    }
};

createTables();
