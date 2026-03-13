import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import heroBg from "@/assets/hero-bg.jpg";
import Logo from "@/components/Logo";

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 opacity-0 animate-fade-in flex justify-center">
            <Logo href="/" size="hero" imgClassName="drop-shadow-xl brightness-0 invert" />
          </div>
          <p className="text-background/80 text-lg md:text-xl font-light tracking-wide mb-4 opacity-0 animate-fade-in animate-delay-200">
            The Beginning & The End
          </p>
          <p className="text-background/60 text-sm md:text-base max-w-xl mx-auto mb-12 opacity-0 animate-fade-in animate-delay-300">
            Timeless apparel for those who understand that purpose is not found—it is lived.
            Each piece carries meaning. Each thread tells a story.
          </p>
          <Link
            to="/shop"
            className="btn-gold opacity-0 animate-fade-in animate-delay-400"
          >
            Discover Collection
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animate-delay-500">
          <div className="w-px h-16 bg-gradient-to-b from-background/0 via-background/50 to-background/0" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
              The Collection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              Curated for the Conscious
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Five pieces, each with purpose. Premium materials meet spiritual significance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mt-8 md:mt-12">
            {featuredProducts.slice(3, 5).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index + 3} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-foreground hover:text-primary transition-colors duration-300 group"
            >
              View All
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-8">
            Our Philosophy
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8 text-foreground">
            "I am the <span className="text-primary">Alpha</span> and the{" "}
            <span className="text-primary">Omega</span>, the First and the Last,
            the Beginning and the End."
          </blockquote>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We believe clothing is more than fabric. It's a statement of who you are
            and who you're becoming. Alpha & Omega exists to remind you of your
            purpose—from where you began to where you're destined to be.
          </p>
          <Link to="/about" className="btn-gold-outline">
            Our Story
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Premium Materials",
                description:
                  "Organic cotton, Egyptian weaves, and bamboo blends. Every thread is chosen with intention.",
              },
              {
                title: "Timeless Design",
                description:
                  "Minimalist aesthetics that transcend trends. Pieces you'll cherish for years to come.",
              },
              {
                title: "Meaningful Craft",
                description:
                  "Each garment carries spiritual significance. Symbols that speak to the soul.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-px h-12 bg-primary mx-auto mb-6" />
                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-foreground text-background">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
            Join the Journey
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            First to know. First to wear.
          </h2>
          <p className="text-background/60 text-sm mb-8">
            Subscribe for exclusive drops, spiritual insights, and early access.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-4 bg-transparent border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
