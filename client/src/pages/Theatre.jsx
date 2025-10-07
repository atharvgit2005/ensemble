import { useState } from 'react';
import { Theater, Play, Calendar, Star, Heart, Zap, Crown, Sparkles } from 'lucide-react';

const Theatre = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for theatre activities
  const theatreActivities = [
    {
      id: 1,
      title: 'Shakespeare\'s Hamlet',
      date: '2024-09-25',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'classical',
      description: 'Classic tragedy brought to life with modern interpretation'
    },
    {
      id: 2,
      title: 'Comedy Night',
      date: '2024-08-18',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'comedy',
      description: 'Laugh-out-loud comedy sketches and improvisation'
    },
    {
      id: 3,
      title: 'Musical Theatre',
      date: '2024-07-28',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
      category: 'musical',
      description: 'Singing, dancing, and acting combined in spectacular fashion'
    },
    {
      id: 4,
      title: 'One-Act Plays',
      date: '2024-06-22',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'drama',
      description: 'Intimate dramatic performances in small venues'
    },
    {
      id: 5,
      title: 'Improv Workshop',
      date: '2024-05-15',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'improv',
      description: 'Spontaneous creativity and quick thinking on stage'
    },
    {
      id: 6,
      title: 'Monologue Showcase',
      date: '2024-04-20',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'monologue',
      description: 'Powerful solo performances showcasing individual talent'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Theater },
    { id: 'classical', name: 'Classical', icon: Crown },
    { id: 'comedy', name: 'Comedy', icon: Heart },
    { id: 'musical', name: 'Musical', icon: Star },
    { id: 'drama', name: 'Drama', icon: Zap },
    { id: 'improv', name: 'Improv', icon: Sparkles },
    { id: 'monologue', name: 'Monologue', icon: Star }
  ];

  const filteredActivities = selectedCategory === 'all' 
    ? theatreActivities 
    : theatreActivities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-lime-green to-neon-yellow rounded-2xl flex items-center justify-center mr-4">
              <Theater className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-glow-green">
              Theatre Club
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where stories come alive and characters find their voice. Our Theatre Club brings together 
            actors, directors, and theatre enthusiasts to create compelling performances that move and inspire.
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
                    ? 'bg-gradient-to-r from-lime-green to-neon-yellow text-white shadow-lime-green'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-lime-green'
                }`}
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
              
              <h3 className="text-xl font-bold mb-2 text-glow-green">
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
            <Theater className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-glow-pink">
            Explore Our Tools
          </h2>
          
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Coming Soon! Future tools for Theatre enthusiasts including script analysis software, 
            character development tools, and virtual stage design platforms.
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
          <h2 className="text-3xl font-bold mb-6 text-glow-blue">
            Join Our Theatrical Journey
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're an experienced actor or someone who's always wanted to try theatre, 
            our club provides a supportive environment to explore the dramatic arts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-doodle text-white font-semibold px-8 py-4 rounded-xl text-lg"
            >
              Join Theatre Club
            </a>
            <a
              href="/about"
              className="btn-doodle-secondary text-white font-semibold px-8 py-4 rounded-xl text-lg"
            >
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theatre;

