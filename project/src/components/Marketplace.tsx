import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { MarketplaceItem } from '../types';

interface MarketplaceProps {
  onBack: () => void;
  onSelectGame: (jsonUrl: string) => void;
}

export function Marketplace({ onBack, onSelectGame }: MarketplaceProps) {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/LLRIX-ofc/GAME/refs/heads/main/index.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.sort((a: MarketplaceItem, b: MarketplaceItem) => b.rating - a.rating));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white mb-8 hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Menu
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => onSelectGame(item.link)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/000000/FFFFFF?text=No+Image';
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-white">{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}