
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderReference } = location.state || {};

    useEffect(() => {
        if (!orderReference) {
            navigate("/");
        }
    }, [orderReference, navigate]);

    if (!orderReference) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center bg-background">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
                <div className="flex justify-center">
                    <div className="relative">
                        <CheckCircle className="w-24 h-24 text-primary animate-pulse" />
                        <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
                        Order Received
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-primary tracking-wide">
                        THANKS FOR SHOPPING FROM ALPHA OMEGA
                    </p>
                </div>

                <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 space-y-4 shadow-xl">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">Order Reference</p>
                        <p className="text-3xl font-mono font-bold text-foreground">{orderReference}</p>
                    </div>

                    <div className="pt-4 border-t border-primary/10">
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                            We've received your order! Our team will verify your payment and process your shipment within 24 hours. You'll receive updates as we progress.
                        </p>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/shop" className="btn-gold min-w-[200px] flex items-center justify-center gap-2 group">
                        Continue Shopping
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="pt-12 text-xs text-muted-foreground/60 italic">
                    Need help? Contact us on WhatsApp or Email for immediate assistance.
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
