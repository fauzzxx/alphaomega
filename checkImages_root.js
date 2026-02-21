import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkProducts() {
    console.log('--- Checking Product Images ---');
    console.log('URL:', process.env.SUPABASE_URL);

    const { data, error } = await supabase
        .from('products')
        .select('name, images')
        .limit(5);

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No products found.');
        return;
    }

    data.forEach(p => {
        console.log(`Product: ${p.name}`);
        console.log(`Images: ${JSON.stringify(p.images)}`);
        console.log('---');
    });
}

checkProducts();
