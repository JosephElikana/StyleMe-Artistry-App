import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Artwork } from '../types';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm transition-all duration-300 font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-neutral-900 hover:bg-neutral-200",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700",
    outline: "border border-neutral-700 text-neutral-300 hover:border-white hover:text-white",
    ghost: "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- Input ---
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full bg-neutral-900 border border-neutral-800 text-neutral-100 px-4 py-3 rounded-sm focus:border-white focus:outline-none transition-colors placeholder-neutral-600 ${className}`}
    {...props}
  />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea
    className={`w-full bg-neutral-900 border border-neutral-800 text-neutral-100 px-4 py-3 rounded-sm focus:border-white focus:outline-none transition-colors placeholder-neutral-600 ${className}`}
    {...props}
  />
);

// --- Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-neutral-800 rounded-sm ${className}`} />
);

// --- Artwork Card ---
export const ArtworkCard: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative mb-8 break-inside-avoid"
    >
      <Link to={`/artwork/${artwork.id}`} className="block overflow-hidden relative rounded-sm">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="relative"
        >
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-white text-lg font-serif italic">{artwork.title}</span>
            <span className="text-neutral-300 text-sm mt-1">${artwork.price.toLocaleString()}</span>
          </div>
        </motion.div>
      </Link>
      
      {/* Mobile-friendly detail summary below image */}
      <div className="mt-3 flex justify-between items-start">
        <div>
          <h3 className="text-neutral-200 font-medium group-hover:text-white transition-colors">{artwork.title}</h3>
          <p className="text-neutral-500 text-sm">{artwork.category}</p>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(artwork);
          }}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Add to Selection"
        >
          <Plus size={20} />
        </button>
      </div>
    </motion.div>
  );
};
