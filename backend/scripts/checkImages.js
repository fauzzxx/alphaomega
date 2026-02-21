import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkProducts() {
    console.log('--- Checking Product Images ---');
    const { data, error } = await supabase
        .from('products')
        .select('name, images')
        .limit(5);

    if (error) {
        console.error('Error:', error);
        return;
    }

    data.forEach(p => {
        console.log(`Product: ${p.name}`);
        console.log(`Images: ${JSON.stringify(p.images)}`);
        console.log('---');
    });
}

checkProducts();
