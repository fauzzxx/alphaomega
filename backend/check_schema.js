import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
    // We can't use information_schema easily via the client, but we can try to select one row and see the keys
    const { data, error } = await supabase.from('orders').select('*').limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (data.length > 0) {
        console.log('Columns found in first row:', Object.keys(data[0]));
    } else {
        console.log('No rows found. Attempting to get columns by selecting a non-existent column to trigger an error with hints...');
        const { error: error2 } = await supabase.from('orders').select('non_existent_column');
        console.log('Error hint (if any):', error2?.message);
    }
}

checkSchema();
