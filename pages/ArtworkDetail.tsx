import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { artworks } from '../data';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  
  const artwork = artworks.find(a => a.id === id);
  const isInCart = cart.some(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!artwork) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Artwork not found</h2>
        <Button onClick={() => navigate('/gallery')} variant="outline">Back to Gallery</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative bg-neutral-900 rounded-sm overflow-hidden"
          >
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="w-full h-auto object-contain max-h-[85vh]"
            />
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">{artwork.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">{artwork.title}</h1>
            
            <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-light border-l-2 border-neutral-800 pl-6">
              {artwork.description}
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm mb-12">
              <div>
                <span className="block text-neutral-600 mb-1">Artist</span>
                <span className="text-white">{artwork.artist}</span>
              </div>
              <div>
                <span className="block text-neutral-600 mb-1">Year</span>
                <span className="text-white">{artwork.year}</span>
              </div>
              <div>
                <span className="block text-neutral-600 mb-1">Dimensions</span>
                <span className="text-white">{artwork.dimensions}</span>
              </div>
              <div>
                <span className="block text-neutral-600 mb-1">Orientation</span>
                <span className="text-white capitalize">{artwork.orientation}</span>
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-3xl font-serif text-white">
                ${artwork.price.toLocaleString()}
              </div>
              
              {isInCart ? (
                <Button disabled variant="secondary" className="w-full md:w-auto flex items-center gap-2">
                  <Check size={18} /> In Selection
                </Button>
              ) : (
                <Button onClick={() => addToCart(artwork)} className="w-full md:w-auto">
                  Add to Selection
                </Button>
              )}
            </div>
            
            <p className="mt-6 text-xs text-neutral-600 text-center md:text-left">
              *Certificate of authenticity included with purchase.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
