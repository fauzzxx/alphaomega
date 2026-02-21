import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkProductsSchema() {
    const { data, error } = await supabase.from('products').select('*').limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (data.length > 0) {
        console.log('Columns found in products table:', Object.keys(data[0]));
        console.log('Sample row:', data[0]);
    } else {
        console.log('No rows found in products table.');
    }
}

checkProductsSchema();
