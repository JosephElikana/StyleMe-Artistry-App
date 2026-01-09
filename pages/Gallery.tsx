import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../data';
import { ArtworkCard } from '../components/UI';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(artworks.map(a => a.category)))];

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter(a => a.category === filter);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">The Gallery</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm tracking-wide px-4 py-2 rounded-full border transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout using CSS Columns */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {filteredArtworks.map((art) => (
             <ArtworkCard key={art.id} artwork={art} />
          ))}
        </motion.div>
        
        {filteredArtworks.length === 0 && (
            <div className="text-center py-20 text-neutral-500">
                <p>No artworks found in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
