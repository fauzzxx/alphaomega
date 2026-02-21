
import { supabase } from '../lib/supabase.js';

async function listProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log(`Found ${data.length} products:`);
        data.forEach(p => console.log(`- ${p.name} (ID: ${p.id})`));
    }
}

listProducts();
