import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Button, Input } from '../components/UI';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, total } = useCart();

  if (cart.length === 0) {
     return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
             <h2 className="text-2xl text-white mb-4">Your selection is empty</h2>
             <Link to="/gallery">
                <Button>Return to Gallery</Button>
             </Link>
        </div>
     )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-8 border-b border-neutral-800 pb-4">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email Address" type="email" className="md:col-span-2" />
              <Input placeholder="Phone Number" type="tel" className="md:col-span-2" />
            </div>
          </section>

          <section>
             <h2 className="text-xl text-white mb-4">Shipping Address</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input placeholder="Street Address" className="md:col-span-2" />
               <Input placeholder="Apartment, suite, etc." className="md:col-span-2" />
               <Input placeholder="City" />
               <Input placeholder="Postal Code" />
               <Input placeholder="Country" />
             </div>
          </section>

          <section>
             <h2 className="text-xl text-white mb-4">Payment</h2>
             <div className="p-6 border border-neutral-800 rounded-sm bg-neutral-900/50 text-center">
                 <p className="text-neutral-500 mb-4">Payment integration placeholder</p>
                 <Button className="w-full md:w-auto" size="lg">Pay ${total.toLocaleString()}</Button>
             </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
           <div className="bg-neutral-900 p-6 rounded-sm sticky top-24">
              <h3 className="text-lg font-medium text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                   <div key={item.cartId} className="flex justify-between items-start text-sm">
                      <span className="text-neutral-300 w-2/3">{item.title}</span>
                      <span className="text-white font-medium">${item.price.toLocaleString()}</span>
                   </div>
                ))}
              </div>
              <div className="border-t border-neutral-800 pt-4 space-y-2">
                 <div className="flex justify-between text-neutral-400 text-sm">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-neutral-400 text-sm">
                    <span>Shipping (Insured)</span>
                    <span>Calculated next</span>
                 </div>
              </div>
              <div className="border-t border-neutral-800 pt-4 mt-4 flex justify-between text-xl font-serif text-white">
                 <span>Total</span>
                 <span>${total.toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
