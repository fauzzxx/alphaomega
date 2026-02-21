import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderHistory = () => {
    // Mock data
    const orders = [
        {
            id: "ORD-7782-XJ",
            date: "Dec 18, 2024",
            total: "₹2,499",
            status: "Delivered",
            items: ["Alpha Tee (M)", "Spiritual Dad Cap"]
        },
        {
            id: "ORD-9921-MC",
            date: "Nov 03, 2024",
            total: "₹1,299",
            status: "Delivered",
            items: ["Omega Hoodie (L)"]
        }
    ];

    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">Your Orders</h1>
                <span className="bg-secondary text-xs px-2 py-1 rounded-full text-muted-foreground">{orders.length} orders</span>
            </div>

            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white border border-border rounded-xl p-6 transition-all hover:shadow-soft group">
                            <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-border/50 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-serif font-medium text-lg">{order.id}</span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> {order.status}
                                        </span>
                                    </div>
                                    <p className="text-secondary-foreground text-sm">Placed on {order.date}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                                    <p className="font-serif font-semibold text-xl text-primary">{order.total}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full md:w-auto mt-4 md:mt-0 hover:border-primary hover:text-primary transition-colors gap-2 group/btn">
                                    View Details <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-secondary/30 rounded-xl">
                        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                        <h3 className="font-serif text-xl mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-8">Start your journey with us.</p>
                        <Link to="/shop" className="btn-gold">Start Shopping</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
