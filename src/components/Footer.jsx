import { Facebook, Instagram, Twitter, Coffee } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-neutral-950 text-zinc-200 py-16 px-10 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Coffee size={32} className="text-amber-400" />
            <h2 className="text-2xl font-bold text-zinc-50 font-fjalla tracking-wide">
              Coffee Club
            </h2>
          </div>
          <p className="text-zinc-400">
            Crafted for coffee lovers who crave perfection in every sip. Brew Haven delivers luxury, freshness, and passion — straight to your cup.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-zinc-100 font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-zinc-100 font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#" className="hover:text-amber-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-amber-400 transition">Return Policy</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-zinc-100 font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-amber-400 hover:text-black transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Coffee Club. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
