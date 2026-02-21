
import { supabase } from '../lib/supabase.js';

async function seedProduct() {
    const dummyProduct = {
        name: 'Test Product for Deletion',
        description: 'This is a test product created to verify the delete functionality.',
        short_description: 'Test product',
        price: 999,
        stock: 10,
        category: 'Statement',
        sizes: ['S', 'M', 'L'],
        images: ['https://placehold.co/600x400'],
        featured: true,
        active: true
    };

    const { data, error } = await supabase
        .from('products')
        .insert(dummyProduct)
        .select()
        .single();

    if (error) {
        console.error('Error seeding product:', error);
    } else {
        console.log('Successfully added test product:', data.name);
    }
}

seedProduct();
