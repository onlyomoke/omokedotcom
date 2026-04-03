import { Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 bg-ebony border-t border-dusty-olive">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="font-sans text-dusty-olive text-sm font-normal">
          © 2024 Omoke Ogao. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-khaki-beige hover:text-camel transition-colors"
            aria-label="Follow on Instagram"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-sans text-sm font-normal">
              @omoke_ogao
            </span>
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="font-sans text-sm text-camel hover:text-khaki-beige transition-colors font-medium"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}