// Quick script to verify the orders table has the new columns
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyColumns() {
    try {
        // Try to select the new columns
        const { data, error } = await supabase
            .from('orders')
            .select('id, order_reference, source')
            .limit(1);

        if (error) {
            console.error('❌ Error querying orders table:', error.message);
            console.log('\n⚠️  The columns might not exist yet. Please run the SQL migration.');
            return;
        }

        console.log('✅ Success! The orders table has the new columns:');
        console.log('   - order_reference');
        console.log('   - source');
        console.log('\n🎉 You can now test the checkout flow!');
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

verifyColumns();
