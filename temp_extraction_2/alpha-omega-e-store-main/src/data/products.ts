import genesisTee from "@/assets/products/genesis-tee.jpg";
import revelationTee from "@/assets/products/revelation-tee.jpg";
import eternalTee from "@/assets/products/eternal-tee.jpg";
import ascensionTee from "@/assets/products/ascension-tee.jpg";
import covenantTee from "@/assets/products/covenant-tee.jpg";

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
    id: "genesis-tee",
    name: "Genesis Tee",
    price: 1499,
    description: "In the beginning was the Word. The Genesis Tee embodies the power of creation and new beginnings. Crafted from 100% premium organic cotton, this piece features our signature α symbol subtly embroidered on the chest. A testament to fresh starts and infinite possibilities.",
    shortDescription: "The beginning of all things. Premium organic cotton.",
    images: [genesisTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    category: "Essentials",
    featured: true,
  },
  {
    id: "revelation-tee",
    name: "Revelation Tee",
    price: 1499,
    description: "And I am the Omega. The Revelation Tee represents the completion of the journey, the fulfillment of purpose. Made from the finest Egyptian cotton, featuring the Ω symbol elegantly placed. For those who understand that every ending is a new beginning.",
    shortDescription: "The completion of purpose. Egyptian cotton.",
    images: [revelationTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
    category: "Essentials",
    featured: true,
  },
  {
    id: "eternal-tee",
    name: "Eternal Tee",
    price: 1799,
    description: "Beyond time, beyond space. The Eternal Tee transcends the temporal with its timeless design. Features both α & Ω symbols in our signature spiritual gold, representing the complete cycle of existence. Premium heavyweight cotton for a luxurious feel.",
    shortDescription: "Timeless design, eternal meaning. Heavyweight cotton.",
    images: [eternalTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    category: "Premium",
    featured: true,
  },
  {
    id: "ascension-tee",
    name: "Ascension Tee",
    price: 1699,
    description: "Rise above the ordinary. The Ascension Tee is designed for those who seek higher understanding. Minimalist design with subtle vertical lines representing spiritual elevation. Crafted from bamboo-blend fabric for supreme comfort and sustainability.",
    shortDescription: "Elevate your spirit. Bamboo-blend comfort.",
    images: [ascensionTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
    category: "Premium",
    featured: true,
  },
  {
    id: "covenant-tee",
    name: "Covenant Tee",
    price: 1999,
    description: "A promise written in cloth. The Covenant Tee represents the unbreakable bond between vision and reality. Our most premium offering, featuring hand-finished details and limited production. Each piece is numbered and comes with a certificate of authenticity.",
    shortDescription: "Limited edition. Hand-finished details.",
    images: [covenantTee],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    category: "Limited Edition",
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
