import { supabase } from '../lib/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.ADMIN_EMAIL.trim().toLowerCase();

async function testQuery() {
    console.log('🔍 Testing Supabase Query...');
    console.log(`Target Email: '${EMAIL}'`);

    // 1. Check connection
    const { data: health, error: healthError } = await supabase.from('admins').select('count').limit(1);
    if (healthError) {
        console.error('❌ Connection Check Failed:', healthError.message);
        return;
    }
    console.log('✅ Connection Check Passed');

    // 2. Exact Query from auth.js
    console.log('Running Query (eq email, eq active, single)...');
    const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', EMAIL)
        .eq('active', true)
        .single();

    if (error) {
        console.error('❌ Query Failed:', error);

        // 3. Debug: Try finding it via List
        console.log('--- Debugging via List ---');
        const { data: list } = await supabase.from('admins').select('*');
        console.log('All Admins in DB:', list);
    } else {
        console.log('✅ Query SUCCEEDED!');
        console.log('Admin found:', data);
    }
}

testQuery();
