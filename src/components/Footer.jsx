import { Facebook, Instagram, Twitter, Coffee } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-neutral-950 text-zinc-200 py-10 md:py-16 px-6 md:px-20 border-t border-zinc-800 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Coffee size={28} className="text-amber-400" />
            <h2 className="text-xl md:text-2xl font-bold text-zinc-50 font-fjalla tracking-wide">
              Coffee Club
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Crafted for coffee lovers who crave perfection in every sip. Brew Haven delivers luxury, freshness, and passion — straight to your cup.
          </p>
        </div>

        {/* Quick Links */}
        <div className="sm:pl-4 lg:pl-0">
          <h3 className="text-zinc-100 font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
          <ul className="space-y-2 text-zinc-400 text-sm md:text-base">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-zinc-100 font-semibold text-base md:text-lg mb-3 md:mb-4">Support</h3>
          <ul className="space-y-2 text-zinc-400 text-sm md:text-base">
            <li><a href="#" className="hover:text-amber-400 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Return Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-zinc-100 font-semibold text-base md:text-lg mb-3 md:mb-4">Follow Us</h3>
          <div className="flex gap-3 md:gap-4">
            <a href="#" className="p-2.5 md:p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition-all" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2.5 md:p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition-all" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2.5 md:p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition-all" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-900 mt-10 pt-6 text-center text-zinc-500 text-xs md:text-sm">
        © {new Date().getFullYear()} Coffee Club. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
