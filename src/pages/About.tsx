import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-6 opacity-0 animate-fade-in">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 opacity-0 animate-fade-in animate-delay-100">
            The Beginning & The End
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed opacity-0 animate-fade-in animate-delay-200">
            Alpha & Omega is more than a brand. It's a philosophy woven into fabric.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-secondary pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <p className="opacity-0 animate-fade-in">
              In ancient Greek, <span className="text-primary font-serif text-xl">α</span> (Alpha) 
              represents the beginning, and <span className="text-primary font-serif text-xl">ω</span> (Omega) 
              signifies the end. Together, they symbolize completeness—the full circle of existence, 
              purpose, and identity.
            </p>
            <p className="opacity-0 animate-fade-in animate-delay-100">
              We founded Alpha & Omega with a singular vision: to create apparel that carries meaning. 
              In a world of fast fashion and fleeting trends, we chose to build something timeless. 
              Something that speaks to the soul before it adorns the body.
            </p>
            <p className="opacity-0 animate-fade-in animate-delay-200">
              Every piece in our collection is designed with intention. The materials are sourced 
              with care—organic cotton from sustainable farms, Egyptian weaves from master artisans, 
              bamboo blends that honor the earth. We don't rush production. We don't cut corners. 
              We create garments worthy of the symbolism they carry.
            </p>
            <p className="opacity-0 animate-fade-in animate-delay-300">
              When you wear Alpha & Omega, you're not just wearing clothing. You're wearing a 
              reminder of who you are and who you're becoming. From your first breath to your 
              final legacy—you are complete. You are the Alpha. You are the Omega.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: "Purpose Over Profit",
                description:
                  "Every decision we make is guided by meaning, not margins. We create for those who seek substance in style.",
              },
              {
                title: "Quality Without Compromise",
                description:
                  "Premium materials, ethical production, and meticulous craftsmanship. We refuse to sacrifice quality for speed.",
              },
              {
                title: "Timeless Over Trendy",
                description:
                  "Our designs transcend seasons. We create pieces meant to be worn, loved, and passed down.",
              },
              {
                title: "Conscious Creation",
                description:
                  "Sustainability isn't a feature—it's foundational. From sourcing to shipping, we minimize our footprint.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-px h-16 bg-primary mt-1" />
                  <div>
                    <h3 className="font-serif text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8 italic">
            "Clothe yourselves with purpose, for what you wear speaks before you do."
          </blockquote>
          <p className="text-background/50 text-sm uppercase tracking-widest">
            — The Alpha & Omega Manifesto
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Begin Your Journey
          </h2>
          <p className="text-muted-foreground mb-8">
            Discover the collection and find the piece that speaks to you.
          </p>
          <Link to="/shop" className="btn-gold">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
