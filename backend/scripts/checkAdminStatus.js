import { supabase } from '../lib/supabase.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkAdmins() {
    console.log('🕵️‍♀️ Inspecting Admins Table...');
    console.log(`Target Email from ENV: '${process.env.ADMIN_EMAIL}'`);

    // 1. Get ALL admins
    const { data: allAdmins, error } = await supabase
        .from('admins')
        .select('*');

    if (error) {
        console.error('❌ Error fetching admins:', error.message);
        return;
    }

    console.log(`\n📋 Found ${allAdmins.length} Total Admin Records:`);
    allAdmins.forEach(a => {
        console.log(` - ID: ${a.id}`);
        console.log(`   Email: '${a.email}'`);
        console.log(`   Active: ${a.active}`);
        console.log(`   Role: ${a.role}`);
        console.log('   ----------------');
    });

    // 2. Specific Check
    const target = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const match = allAdmins.find(a => a.email === target);

    if (match) {
        console.log(`\n✅ MATCH FOUND for '${target}'`);
        if (!match.active) console.warn('⚠️ BUT... Account is INACTIVE!');
    } else {
        console.error(`\n❌ NO MATCH FOUND for '${target}'`);
    }
}

checkAdmins();
