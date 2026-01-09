import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, total, isOpen, toggleCart } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <h2 className="text-xl font-serif text-white">Your Selection ({cart.length})</h2>
              <button onClick={toggleCart} className="text-neutral-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <p className="text-neutral-500 mb-4">Your selection is empty.</p>
                   <Button variant="outline" onClick={toggleCart}>Browse Gallery</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.cartId} 
                    className="flex gap-4 bg-neutral-950 p-4 rounded-sm border border-neutral-800"
                  >
                    <div className="w-20 h-20 bg-neutral-800 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-medium line-clamp-1">{item.title}</h4>
                        <p className="text-sm text-neutral-500">{item.artist}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-white text-sm">${item.price.toLocaleString()}</span>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-neutral-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-950">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-400">Total</span>
                  <span className="text-2xl font-serif text-white">${total.toLocaleString()}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    toggleCart();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
