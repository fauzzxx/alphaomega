import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center px-6">
        <h1 className="font-serif text-6xl md:text-8xl mb-4 text-primary">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The path you seek has yet to be written. Return home and begin again.
        </p>
        <Link to="/" className="btn-gold inline-flex items-center gap-3">
          <Home size={18} />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
