import goatTee from "@/assets/products/goat_shirt.png";
import jesusWayTee from "@/assets/products/jesus_way_shirt.png";
import kingTee from "@/assets/products/king_shirt.png";
import jesusWinsTee from "@/assets/products/jesus_wins_shirt.png";
import blessedTee from "@/assets/products/blessed_shirt.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  sizes: string[];
  stock: number;
  category: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "goat-tee",
    name: "GOAT Tee",
    price: 1499,
    description: "God Over All Things. A bold declaration of faith featuring a minimalist cross design integrated into the text. Crafted from premium cotton for comfort and durability.",
    shortDescription: "God Over All Things. Premium cotton.",
    images: [goatTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    category: "Statement",
    featured: true,
  },
  {
    id: "jesus-way-tee",
    name: "The Way Tee",
    price: 1499,
    description: "JESUS: The Way, The Truth, The Life. A modern, typographic design that speaks volumes. Soft, breathable fabric perfect for everyday wear.",
    shortDescription: "The Way, The Truth, The Life.",
    images: [jesusWayTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
    category: "Essentials",
    featured: true,
  },
  {
    id: "king-of-kings-tee",
    name: "King of Kings Tee",
    price: 1799,
    description: "A powerful graphic representation of the King of Kings. Intricate typography forming the image of Christ. High-quality print on heavyweight cotton.",
    shortDescription: "Intricate typographic design.",
    images: [kingTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    category: "Premium",
    featured: true,
  },
  {
    id: "victory-tee",
    name: "Victory Tee",
    price: 1699,
    description: "Jesus Always Wins. Featuring a dynamic basketball-themed design symbolizing victory and perseverance. Athletic fit and feel.",
    shortDescription: "Jesus Always Wins. Athletic fit.",
    images: [jesusWinsTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    category: "Sport",
    featured: true,
  },
  {
    id: "blessed-tee",
    name: "Blessed Tee",
    price: 1999,
    description: "Simply Blessed. A clean, vertical typographic design on the side. Understated elegance for those who walk in grace.",
    shortDescription: "Clean, vertical typography.",
    images: [blessedTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    category: "Minimalist",
    featured: true,
  },
];

// Shipping constants
export const SHIPPING_RATE = 70;
export const FREE_SHIPPING_THRESHOLD = 1500;

// Returns policy
export const RETURNS_POLICY = {
  window: 14,
  customerPaysReturn: true,
};

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

