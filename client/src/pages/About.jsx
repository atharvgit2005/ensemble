import { useState, useEffect } from 'react';
import { Mail, Users, Music, Theater, Crown, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for team members
  const mockMembers = [
    {
      id: '1',
      name: 'Atharv Paharia',
      role: 'President',
      club: 'CORE',
      bio: 'Passionate leader with 5+ years of experience in cultural activities. Dedicated to fostering creativity and building a strong community.',
      contactEmail: 'atharv.paharia@adypu.edu.in'
    },
    {
      id: '2',
      name: 'Yashpreet Gupta',
      role: 'Vice President',
      club: 'CORE',
      bio: 'Creative visionary who brings fresh ideas to the table. Specializes in event coordination and team management.',
      contactEmail: 'yashpreet.gupta@adypu.edu.in'
    },
    {
      id: '3',
      name: 'Sarthak Ghoderao',
      role: 'Dance Coordinator',
      club: 'DANCE',
      bio: 'Classical and contemporary dance expert with 8 years of training. Leads our dance troupe with grace and precision.',
      contactEmail: 'sarthak.ghoderao@adypu.edu.in'
    },
    {
      id: '4',
      name: 'Bhavish Dhar',
      role: 'Music Coordinator',
      club: 'MUSIC',
      bio: 'Multi-instrumentalist and vocalist with a passion for both traditional and modern music. Inspires our musicians to reach new heights.',
      contactEmail: 'bhavish.dhar@adypu.edu.in'
    },
    {
      id: '5',
      name: 'Khyati Kapil',
      role: 'Theatre Coordinator',
      club: 'THEATRE',
      bio: 'Theatre enthusiast with extensive experience in acting and direction. Brings stories to life with passion and creativity.',
      contactEmail: 'khyati.kapil@adypu.edu.in'
    }
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // In a real app, you would fetch from the API
        // const response = await axios.get('http://localhost:3001/api/public/members');
        // setMembers(response.data.members);
        
        // For now, use mock data
        setMembers(mockMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers(mockMembers); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'President':
        return Crown;
      case 'Vice President':
        return UserCheck;
      case 'Dance Coordinator':
        return Users;
      case 'Music Coordinator':
        return Music;
      case 'Theatre Coordinator':
        return Theater;
      default:
        return Users;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue mx-auto mb-4"></div>
          <p className="text-secondary text-xl">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              Meet Our Team
            </h1>
            <p className="section-subtitle">
              The passionate individuals who make Ensemble a vibrant community of artists, 
              creators, and performers. Each member brings unique talents and dedication to our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="content-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              return (
                <div key={member.id} className="text-center p-6 bg-secondary rounded-lg">
                  {/* Profile Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue rounded-full flex items-center justify-center">
                    <RoleIcon className="w-8 h-8 text-white" />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {member.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue text-white">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-secondary mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Contact Button */}
                  <a
                    href={`mailto:${member.contactEmail}`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-tertiary hover:bg-blue text-secondary hover:text-white rounded-lg transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Ensemble Section */}
      <section className="content-section">
        <div className="container">
          <div className="bg-secondary rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">
              About Ensemble
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue">
                  Our Mission
                </h3>
                <p className="text-secondary leading-relaxed">
                  Ensemble is more than just a club - it's a community where creativity flourishes, 
                  friendships are forged, and artistic dreams come to life. We believe in the power 
                  of the arts to bring people together and create lasting memories.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue">
                  Our Vision
                </h3>
                <p className="text-secondary leading-relaxed">
                  To be the premier cultural organization that nurtures talent, celebrates diversity, 
                  and creates a platform for students to express themselves through dance, music, and theatre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="content-section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Active Members' },
              { number: '25+', label: 'Events Per Year' },
              { number: '3', label: 'Creative Clubs' },
              { number: '5+', label: 'Years of Excellence' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-blue">
                  {stat.number}
                </div>
                <div className="text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="content-section">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Whether you're an experienced performer or just starting your artistic journey, 
              there's a place for you in Ensemble. Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
              <Link to="/shop" className="btn-secondary">
                Shop Merchandise
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;