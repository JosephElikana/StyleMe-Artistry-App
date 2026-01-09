import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, ArtworkCard } from '../components/UI';
import { artworks } from '../data';

const Home: React.FC = () => {
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0 opacity-30">
           {/* Abstract background visual */}
           <img 
            src="https://picsum.photos/seed/bg-art/1920/1080" 
            alt="Background Art" 
            className="w-full h-full object-cover grayscale"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif tracking-tighter text-white mb-6"
          >
            Visual Silence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light"
          >
            A curated collection of minimalist abstract expressionism exploring the void between thought and reality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/gallery">
              <Button size="lg" className="group">
                View Collection
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Selected Works</h2>
              <p className="text-neutral-500">Recent additions to the gallery.</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center text-sm text-white hover:text-neutral-300 transition-colors">
              View All <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/gallery">
               <Button variant="outline" className="w-full">View All Works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial / Trust */}
      <section className="py-24 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-2xl font-serif text-white mb-12">"Art that doesn't just decorate a space, but transforms the atmosphere entirely."</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 text-neutral-500 text-sm tracking-widest uppercase">
            <span>Architectural Digest</span>
            <span>Vogue Living</span>
            <span>Modern Art Weekly</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
