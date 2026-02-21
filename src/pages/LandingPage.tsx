import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg"; // Using existing asset for now

const LandingPage = () => {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105 hover:scale-110"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <p className="text-primary font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
                        Premium Spiritual Apparel
                    </p>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 opacity-0 animate-fade-in animate-delay-100 leading-tight">
                        Alpha <span className="text-primary">&</span> Omega
                    </h1>
                    <p className="text-gray-200 text-lg md:text-2xl font-light tracking-wide mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in animate-delay-200">
                        Timeless fashion that speaks to your soul. Designed for the beginning, the end, and everything in between.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fade-in animate-delay-300">
                        <Link to="/shop" className="btn-gold min-w-[200px]">
                            Shop Collection
                        </Link>
                        <Link to="/about" className="btn-gold-outline text-white border-white hover:bg-white hover:text-foreground min-w-[200px]">
                            Our Story
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-px h-24 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
                </div>
            </section>

            {/* Value Props */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Star,
                                title: "Premium Quality",
                                desc: "Expertly crafted with the finest materials for lasting comfort and style."
                            },
                            {
                                icon: Shield,
                                title: "Timeless Design",
                                desc: "Minimalist aesthetics that transcend fleeting trends. Wear your faith."
                            },
                            {
                                icon: Heart,
                                title: "Spiritual Essence",
                                desc: "Each piece carries a deeper meaning, connecting you to your purpose."
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center group p-8 rounded-2xl hover:bg-white hover:shadow-soft transition-all duration-500">
                                <div className="w-16 h-16 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-serif text-2xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collections Categories */}
            <section className="py-24 bg-secondary/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block opacity-0 animate-fade-in">Curated Selections</span>
                        <h2 className="font-serif text-4xl md:text-5xl opacity-0 animate-fade-in animate-delay-100">Shop by Category</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Plain T-Shirts */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-hover">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <div className="aspect-[4/5] bg-gray-100 relative">
                                {/* Placeholder for Plain Tee Image */}
                                <div className="absolute inset-0 bg-neutral-200" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                                <h3 className="font-serif text-3xl mb-4 group-hover:text-primary transition-colors">1. Plain T-Shirts</h3>
                                <div className="space-y-4 text-gray-200 text-sm md:text-base mb-6 transform transition-all duration-500 translate-y-4 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Design:</span> Solid colors only</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Style:</span> No prints or graphics. Pure minimalism.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Classic Colors:</span> Black, White, Blue, Grey, Red</p>
                                    </div>
                                </div>
                                <Link to="/shop?category=plain" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold hover:text-white transition-colors">
                                    Shop Plain <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Printed T-Shirts */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-hover">
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent z-10" />
                            <div className="aspect-[4/5] bg-gray-100 relative">
                                {/* Placeholder for Printed Tee Image */}
                                <div className="absolute inset-0 bg-slate-300" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                                <h3 className="font-serif text-3xl mb-4 group-hover:text-primary transition-colors">2. Printed T-Shirts</h3>
                                <div className="space-y-4 text-gray-200 text-sm md:text-base mb-6 transform transition-all duration-500 translate-y-4 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Design:</span> Printed patterns or spiritual graphics</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Color Style:</span> Fade-based / gradient designs</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p><span className="font-medium text-white">Effects:</span> Ombre prints, faded logos, gradient effects</p>
                                    </div>
                                </div>
                                <Link to="/shop?category=printed" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold hover:text-white transition-colors">
                                    Shop Printed <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured Preview */}
            <section className="py-32 bg-navy text-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2">
                            <span className="text-primary tracking-widest uppercase text-sm font-medium mb-4 block">New Arrivals</span>
                            <h2 className="font-serif text-5xl md:text-6xl mb-6">The Genesis Collection</h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-md">
                                Inspired by the beginning. Our latest collection blends modern streetwear with spiritual symbolism.
                            </p>
                            <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors uppercase tracking-widest text-sm font-medium group">
                                View All Products
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                        {/* Visual placeholder for products */}
                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="aspect-[3/4] bg-white/5 rounded-lg animate-pulse" />
                            <div className="aspect-[3/4] bg-white/5 rounded-lg animate-pulse mt-8" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
