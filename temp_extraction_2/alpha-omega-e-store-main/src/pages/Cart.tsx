import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from "@/data/products";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const orderTotal = totalPrice + shippingCost;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center px-6">
          <ShoppingBag size={64} className="mx-auto mb-6 text-muted-foreground/30" />
          <h1 className="font-serif text-2xl md:text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Begin your journey with Alpha & Omega. Discover pieces crafted with purpose.
          </p>
          <Link to="/shop" className="btn-gold">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="font-serif text-3xl md:text-4xl opacity-0 animate-fade-in">
              Your Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Free Shipping Progress */}
          {amountToFreeShipping > 0 && (
            <div className="mb-8 p-4 bg-secondary opacity-0 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Truck size={18} className="text-primary" />
                <p className="text-sm">
                  Add {formatPrice(amountToFreeShipping)} more for <span className="font-medium text-primary">free shipping</span>
                </p>
              </div>
              <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="space-y-8 mb-12">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-6 pb-8 border-b border-border opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-24 md:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-serif text-lg hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      Size: {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-secondary hover:bg-foreground/10 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-secondary hover:bg-foreground/10 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex items-center gap-6">
                      <p className="font-medium text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.size)
                        }
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-secondary p-8 opacity-0 animate-fade-in animate-delay-300">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shippingCost === 0 ? "text-primary" : ""}>
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium text-primary text-lg">
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>

            <button className="btn-gold w-full flex items-center justify-center gap-3">
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
