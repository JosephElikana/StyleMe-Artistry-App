import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { cart, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif tracking-tight text-white z-50">
          StyleMe Artist
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={toggleCart} className="relative group text-neutral-300 hover:text-white transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-neutral-950 min-h-screen flex flex-col items-center justify-center space-y-8 z-40"
            >
              <Link to="/" className="text-3xl font-serif text-white">Home</Link>
              <Link to="/gallery" className="text-3xl font-serif text-white">Gallery</Link>
              <Link to="/contact" className="text-3xl font-serif text-white">Contact</Link>
              <button onClick={() => { toggleCart(); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-2xl font-serif text-neutral-300">
                <span>Selection</span>
                <span className="bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`text-sm tracking-wide transition-colors ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
      {children}
    </Link>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-neutral-950 py-16 border-t border-neutral-900">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">StyleMe Artist</h2>
          <p className="text-neutral-500 text-sm max-w-xs">Exploring the boundaries between organic chaos and digital structure.</p>
        </div>
        <div className="flex space-x-6 mt-8 md:mt-0">
          <SocialLink href="#" icon={<Instagram size={20} />} />
          <SocialLink href="#" icon={<Twitter size={20} />} />
          <SocialLink href="mailto:hello@styleme.artist" icon={<Mail size={20} />} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between text-neutral-600 text-xs pt-8 border-t border-neutral-900">
        <p>&copy; {new Date().getFullYear()} StyleMe Artist. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-neutral-400">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <a href={href} className="text-neutral-500 hover:text-white transition-colors duration-300 border border-neutral-800 p-2 rounded-full hover:border-neutral-600">
    {icon}
  </a>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};