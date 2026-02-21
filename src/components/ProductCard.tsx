import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/products";
import { getImageUrl } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group product-card block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-6">
        <img
          src={getImageUrl(product.images[0])}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-700"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

        {/* Quick View */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <span className="block w-full py-3 text-center text-xs font-medium tracking-widest uppercase bg-background/95 backdrop-blur-sm">
            View Details
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-medium tracking-widest uppercase bg-background/90 backdrop-blur-sm px-3 py-1.5">
            {product.category}
          </span>
        </div>

        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-medium tracking-widest uppercase bg-destructive/90 text-destructive-foreground px-3 py-1.5">
              Sold Out
            </span>
          </div>
        )}
        {isLowStock && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-medium tracking-widest uppercase bg-amber-500/90 text-white px-3 py-1.5">
              Low Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="text-center">
        <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {product.shortDescription}
        </p>
        <p className="text-primary font-medium">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
