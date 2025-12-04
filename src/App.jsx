import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold">TrendAI</span>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-400 hover:text-purple-400"
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('explore')}
              className="text-gray-400 hover:text-purple-400"
            >
              Explore
            </button>
          </div>
        </div>
      </nav>

      {currentPage === 'home' && (
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Trending
            </span>
            <br />
            <span>AI-Generated Videos</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Track trending AI videos across TikTok, Instagram, YouTube, and Facebook
          </p>
          <button 
            onClick={() => setCurrentPage('explore')}
            className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
          >
            Start Exploring
          </button>
        </div>
      )}

      {currentPage === 'explore' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-4">Explore Trending Videos</h1>
          <p className="text-gray-400 mb-8">Your TikTok scraper will appear here!</p>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-2xl">🚀 Your app is LIVE on Vercel!</p>
            <p className="text-gray-400 mt-4">Now we can add all the features</p>
          </div>
        </div>
      )}
    </div>
  );
}
