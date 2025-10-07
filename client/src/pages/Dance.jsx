import { useState } from 'react';
import { Users, Play, Calendar, Zap, Heart, Star, Sparkles } from 'lucide-react';

const Dance = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for dance activities
  const danceActivities = [
    {
      id: 1,
      title: 'Bharatanatyam Performance',
      date: '2024-09-20',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'classical',
      description: 'Graceful classical Indian dance performance'
    },
    {
      id: 2,
      title: 'Hip-Hop Battle',
      date: '2024-08-15',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'hiphop',
      description: 'High-energy hip-hop dance competition'
    },
    {
      id: 3,
      title: 'Contemporary Workshop',
      date: '2024-07-25',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
      category: 'contemporary',
      description: 'Exploring modern contemporary dance techniques'
    },
    {
      id: 4,
      title: 'Bollywood Fusion',
      date: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'bollywood',
      description: 'Vibrant Bollywood dance with modern twists'
    },
    {
      id: 5,
      title: 'Salsa Night',
      date: '2024-05-22',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'latin',
      description: 'Passionate Latin dance evening'
    },
    {
      id: 6,
      title: 'Street Dance Showcase',
      date: '2024-04-18',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'street',
      description: 'Urban street dance styles and techniques'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Users },
    { id: 'classical', name: 'Classical', icon: Star },
    { id: 'hiphop', name: 'Hip-Hop', icon: Zap },
    { id: 'contemporary', name: 'Contemporary', icon: Heart },
    { id: 'bollywood', name: 'Bollywood', icon: Sparkles },
    { id: 'latin', name: 'Latin', icon: Heart },
    { id: 'street', name: 'Street', icon: Zap }
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? danceActivities 
    : danceActivities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-electric-blue rounded-2xl flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-glow-pink">
              Dance Club
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where movement becomes art and rhythm tells stories. Our Dance Club celebrates the beauty 
            of expression through various dance forms, from classical traditions to modern innovations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-neon-pink to-electric-blue text-white shadow-neon-pink'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-neon-pink'
                }`}
                data-cursor="action"
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="card-doodle group hover:scale-105 transition-all duration-300"
              data-cursor="discovery" data-cursor-label="Explore"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 p-3 rounded-full">
                    <Play className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-glow-pink">
                {activity.title}
              </h3>
              
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">
                  {new Date(activity.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border-2 border-doodle text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-glow to-orange-burst rounded-2xl flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-glow-pink">
            Explore Our Tools
          </h2>
          
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Coming Soon! Future tools for Dance enthusiasts including choreography planning software, 
            movement analysis tools, and virtual dance classes with AI feedback.
          </p>
          
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
              <span>Development in Progress</span>
            </div>
          </div>
          
          <button
            disabled
            className="px-8 py-4 bg-gray-600 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
          >
            Coming Soon!
          </button>
        </div>

        {/* Join Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-glow-green">
            Join Our Dance Family
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a trained dancer or someone who loves to move, our club welcomes all. 
            Express yourself through the universal language of dance!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-doodle text-white font-semibold px-8 py-4 rounded-xl text-lg"
              data-cursor="action"
            >
              Join Dance Club
            </a>
            <a
              href="/about"
              className="btn-doodle-secondary text-white font-semibold px-8 py-4 rounded-xl text-lg"
              data-cursor="action"
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dance;

