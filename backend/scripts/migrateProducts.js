
import { supabase } from '../lib/supabase.js';

const products = [
    {
        name: "GOAT Tee",
        price: 1499,
        description: "God Over All Things. A bold declaration of faith featuring a minimalist cross design integrated into the text. Crafted from premium cotton for comfort and durability.",
        short_description: "God Over All Things. Premium cotton.",
        images: ["products/goat_shirt.png"],
        sizes: ["S", "M", "L", "XL"],
        stock: 50,
        category: "Statement",
        featured: true,
        active: true
    },
    {
        name: "The Way Tee",
        price: 1499,
        description: "JESUS: The Way, The Truth, The Life. A modern, typographic design that speaks volumes. Soft, breathable fabric perfect for everyday wear.",
        short_description: "The Way, The Truth, The Life.",
        images: ["products/jesus_way_shirt.png"],
        sizes: ["S", "M", "L", "XL"],
        stock: 45,
        category: "Essentials",
        featured: true,
        active: true
    },
    {
        name: "King of Kings Tee",
        price: 1799,
        description: "A powerful graphic representation of the King of Kings. Intricate typography forming the image of Christ. High-quality print on heavyweight cotton.",
        short_description: "Intricate typographic design.",
        images: ["products/king_shirt.png"],
        sizes: ["S", "M", "L", "XL"],
        stock: 30,
        category: "Premium",
        featured: true,
        active: true
    },
    {
        name: "Victory Tee",
        price: 1699,
        description: "Jesus Always Wins. Featuring a dynamic basketball-themed design symbolizing victory and perseverance. Athletic fit and feel.",
        short_description: "Jesus Always Wins. Athletic fit.",
        images: ["products/jesus_wins_shirt.png"],
        sizes: ["S", "M", "L", "XL"],
        stock: 35,
        category: "Sport",
        featured: true,
        active: true
    },
    {
        name: "Blessed Tee",
        price: 1999,
        description: "Simply Blessed. A clean, vertical typographic design on the side. Understated elegance for those who walk in grace.",
        short_description: "Clean, vertical typography.",
        images: ["products/blessed_shirt.png"],
        sizes: ["S", "M", "L", "XL"],
        stock: 20,
        category: "Minimalist",
        featured: true,
        active: true
    },
];

async function migrateProducts() {
    console.log('Starting migration...');

    for (const product of products) {
        console.log(`Migrating: ${product.name}`);

        // Check if product already exists to avoid duplicates
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('name', product.name)
            .single();

        if (existing) {
            console.log(`- Product "${product.name}" already exists. Skipping.`);
            continue;
        }

        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) {
            console.error(`- Error migrating "${product.name}":`, error.message);
        } else {
            console.log(`- Successfully added "${product.name}" (ID: ${data.id})`);
        }
    }

    console.log('Migration complete!');
}

migrateProducts();
