-- Add slug column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Update existing products with slugs
UPDATE products SET slug = 'goat-tee' WHERE name = 'GOAT Tee';
UPDATE products SET slug = 'jesus-way-tee' WHERE name = 'The Way Tee';
UPDATE products SET slug = 'king-of-kings-tee' WHERE name = 'King of Kings Tee';
UPDATE products SET slug = 'victory-tee' WHERE name = 'Victory Tee';
UPDATE products SET slug = 'blessed-tee' WHERE name = 'Blessed Tee';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
