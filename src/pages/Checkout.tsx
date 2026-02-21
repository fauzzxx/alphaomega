
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatPrice, SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Smartphone, QrCode } from "lucide-react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";

const UPI_ID = "jerushageorge17@okhdfcbank";
const WHATSAPP_NUMBER = "917439482446";

const Checkout = () => {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { toast } = useToast();

    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
    });

    const [paymentMethod, setPaymentMethod] = useState<"UPI" | "WhatsApp">("UPI");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
    const grandTotal = totalPrice + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleWhatsAppOrder = () => {
        if (!formData.name || !formData.street || !formData.city) { // Basic validation
            toast({ title: "Please fill in your details", variant: "destructive" });
            return;
        }

        const message = `Hello, I want to place an order:

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.street}, ${formData.city}, ${formData.state} - ${formData.zipCode}

*Order Details:*
${items.map(item => `- ${item.product.name} (${item.size}) x${item.quantity}`).join('\n')}

*Total Amount:* ${formatPrice(grandTotal)}

Please confirm my order.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast({ title: "Cart is empty", variant: "destructive" });
            return;
        }



        setIsSubmitting(true);

        try {
            const orderPayload = new FormData();
            orderPayload.append("customer", JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                }
            }));

            const itemsPayload = items.map(item => ({
                product: (item.product as any).id || (item.product as any)._id,
                quantity: item.quantity,
                size: item.size
            }));

            console.log('🛒 Cart Items being sent:', itemsPayload);
            console.log('🔍 First product ID:', itemsPayload[0]?.product);

            orderPayload.append("items", JSON.stringify(itemsPayload));

            // Set payment method and source
            if (paymentMethod === "WhatsApp") {
                orderPayload.append("paymentMethod", "WhatsApp Manual");
                orderPayload.append("source", "whatsapp");
            } else {
                orderPayload.append("paymentMethod", "UPI Manual");
                orderPayload.append("source", "website");
            }



            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                body: orderPayload,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to place order");
            }

            const orderRef = data.orderReference || "PENDING";

            // If WhatsApp, redirect to WhatsApp with pre-filled message
            if (paymentMethod === "WhatsApp") {
                const message = `🛒 *New Order* \n\n` +
                    `*Order ID:* ${orderRef}\n` +
                    `*Customer:* ${formData.name}\n` +
                    `*Phone:* ${formData.phone}\n` +
                    `*Address:* ${formData.city}, ${formData.state}\n\n` +
                    `*Items:*\n${items.map(item => `- ${item.product.name} (${item.size}) x${item.quantity}`).join('\n')}\n\n` +
                    `*Total:* ${formatPrice(grandTotal)}\n\n` +
                    `Payment Method: WhatsApp Manual`;

                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
            }

            toast({
                title: "Order Placed Successfully!",
                description: paymentMethod === "WhatsApp" ? "Redirecting to WhatsApp..." : "We will verify your payment shortly.",
            });

            clearCart();
            // Navigate to success page with order reference
            navigate("/order-success", { state: { orderReference: orderRef } });

        } catch (error: any) {
            toast({
                title: "Order Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-4">
                <h2 className="font-serif text-3xl mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">Add some items to get started.</p>
                <button onClick={() => navigate("/shop")} className="btn-gold">Return to Shop</button>
            </div>
        )
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <button
                    onClick={() => navigate("/cart")}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Back to Cart
                </button>

                <h1 className="font-serif text-3xl md:text-4xl mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Form */}
                    <div>
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl border-b border-border pb-2">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl border-b border-border pb-2">Shipping Address</h3>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider font-medium">Street Address</label>
                                    <input
                                        type="text"
                                        name="street"
                                        required
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        placeholder="123 Main St, Apt 4B"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full bg-secondary p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider font-medium">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            disabled
                                            value="India"
                                            className="w-full bg-secondary p-3 text-sm text-muted-foreground cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl border-b border-border pb-2">Payment Method</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod("UPI")}
                                        className={`p-4 border cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === "UPI" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                    >
                                        <QrCode className="w-5 h-5" />
                                        <span className="font-medium text-sm">Pay via UPI</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setPaymentMethod("WhatsApp");
                                        }}
                                        className={`p-4 border cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === "WhatsApp" ? "border-green-500 bg-green-50" : "border-border hover:border-green-500/50"}`}
                                    >
                                        <Smartphone className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-sm">Order on WhatsApp</span>
                                    </div>
                                </div>
                            </div>

                            {/* UPI Payment Section */}
                            {paymentMethod === "UPI" && (
                                <div className="bg-secondary p-6 space-y-6 animate-fade-in">
                                    <div className="text-center">
                                        <h4 className="font-serif text-lg mb-2">Scan to Pay</h4>
                                        <div className="bg-white p-4 w-64 mx-auto mb-4 border rounded-lg">
                                            <img src="/payment/upi_qr_code.png" alt="UPI QR Code" className="w-full h-auto" />
                                        </div>
                                        <p className="text-sm font-medium">UPI ID: <span className="text-primary font-bold copy-to-clipboard cursor-pointer" onClick={() => { navigator.clipboard.writeText(UPI_ID); toast({ title: "Copied UPI ID" }) }}>{UPI_ID}</span></p>
                                    </div>

                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 text-sm font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${paymentMethod === "WhatsApp"
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "btn-gold"
                                    }`}
                            >
                                {isSubmitting ? "Processing..." : paymentMethod === "WhatsApp" ? "Send Order on WhatsApp" : `Place Order — ${formatPrice(grandTotal)}`}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div>
                        <div className="bg-secondary p-8 sticky top-24">
                            <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-16 h-20 bg-background overflow-hidden flex-shrink-0">
                                            <img
                                                src={getImageUrl(item.product.images[0])}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                                            <p className="text-xs text-muted-foreground mb-1">Size: {item.size}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                </div>
                            </div>

                            <div className="border-t border-border mt-4 pt-4 flex justify-between font-serif text-xl">
                                <span>Total</span>
                                <span>{formatPrice(grandTotal)}</span>
                            </div>

                            <div className="mt-8 bg-background p-4 text-xs text-muted-foreground leading-relaxed">
                                By placing this order, you agree to our Terms of Service and Privacy Policy. Manual payments are verified within 24 hours.
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Checkout;
