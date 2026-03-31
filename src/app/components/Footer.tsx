import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#414833] border-t border-[#656d4a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p
          className="text-[#656d4a] text-sm"
          style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
        >
          © 2024 Omoke Ogao. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#b6ad90] hover:text-[#a68a64] transition-colors"
            aria-label="Follow on Instagram"
          >
            <Instagram className="w-5 h-5" />
            <span
              className="text-sm"
              style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
            >
              @omoke_ogao
            </span>
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-[#a68a64] hover:text-[#b6ad90] transition-colors"
          style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
