import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "", label: "Select enquiry type" },
    { value: "general", label: "General Query" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "wholesale", label: "Wholesale / Bulk Orders" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit your enquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "Thank you for your enquiry. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", category: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="section-padding pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4 opacity-0 animate-fade-in">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 opacity-0 animate-fade-in animate-delay-100">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in animate-delay-200">
            Have a question or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div className="opacity-0 animate-fade-in animate-delay-300">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3">
                    Enquiry Type
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-4 bg-secondary border-0 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-4 bg-secondary border-0 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="opacity-0 animate-fade-in animate-delay-400">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Connect With Us</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
                      Email
                    </p>
                    <a 
                      href="mailto:hello@alphaandomega.co" 
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      hello@alphaandomega.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-foreground">India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
                      Support Hours
                    </p>
                    <p className="text-foreground">Mon - Sat: 10 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-serif text-xl mb-6">Quick Info</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-1">Shipping (India Only)</p>
                    <p className="text-muted-foreground">
                      Flat rate: ₹70 | Free delivery on orders above ₹1,500
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Returns</p>
                    <p className="text-muted-foreground">
                      14-day return window from delivery. Return shipping paid by customer (unless defective).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
