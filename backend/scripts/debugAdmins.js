import { supabase } from '../lib/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

async function debugAdmins() {
    console.log('Checking admins table...');
    const { data: admins, error } = await supabase.from('admins').select('*');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(`Found ${admins.length} admins:`);
    admins.forEach(a => {
        console.log(`ID: ${a.id}`);
        console.log(`Email: |${a.email}|`); // | markers to see whitespace
        console.log(`Active: ${a.active}`);
        console.log('---');
    });

    console.log('Environment Debug:');
    console.log(`ADMIN_EMAIL: |${process.env.ADMIN_EMAIL}|`);
}

debugAdmins();
