import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Truck, RotateCcw } from "lucide-react";
import { getProductById, getFeaturedProducts, formatPrice, SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = getProductById(id || "");
  const relatedProducts = getFeaturedProducts()
    .filter((p) => p.id !== id)
    .slice(0, 3);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Product not found</h1>
          <Link to="/shop" className="btn-gold-outline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    if (product.stock < quantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${product.stock} items available.`,
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="pt-24">
      {/* Back Button */}
      <div className="px-6 md:px-12 lg:px-20 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Product Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="opacity-0 animate-fade-in">
              <div className="aspect-[3/4] bg-secondary overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center opacity-0 animate-fade-in animate-delay-200">
              {/* Category */}
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-2xl text-primary font-medium mb-4">
                {formatPrice(product.price)}
              </p>

              {/* Stock Status */}
              {isOutOfStock && (
                <p className="text-destructive text-sm mb-4">Out of Stock</p>
              )}
              {isLowStock && (
                <p className="text-amber-600 text-sm mb-4">
                  Only {product.stock} left in stock
                </p>
              )}

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <p className="text-xs font-medium tracking-widest uppercase mb-4">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedSize === size
                          ? "bg-foreground text-background"
                          : "bg-secondary text-foreground hover:bg-foreground/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs font-medium tracking-widest uppercase mb-4">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center bg-secondary hover:bg-foreground/10 transition-colors disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={isOutOfStock || quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center bg-secondary hover:bg-foreground/10 transition-colors disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart} 
                disabled={isOutOfStock}
                className="btn-gold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? "Out of Stock" : `Add to Cart — ${formatPrice(product.price * quantity)}`}
              </button>

              {/* Shipping & Returns Info */}
              <div className="mt-8 p-6 bg-secondary space-y-4">
                <div className="flex items-start gap-3">
                  <Truck size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Shipping (India Only)</p>
                    <p className="text-muted-foreground">
                      Flat rate: {formatPrice(SHIPPING_RATE)} | Free delivery on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Returns</p>
                    <p className="text-muted-foreground">
                      14-day return window. Return shipping paid by customer (unless defective).
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Material</p>
                    <p>Premium Cotton</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Care</p>
                    <p>Machine Wash Cold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
                You May Also Like
              </p>
              <h2 className="font-serif text-2xl md:text-3xl">
                Complete the Collection
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
