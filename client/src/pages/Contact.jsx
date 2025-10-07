import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['info@ensemble.com', 'contact@ensemble.com'],
      color: 'from-neon-pink to-electric-blue'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'from-electric-blue to-lime-green'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 University Avenue', 'Campus Building, Room 456', 'City, State 12345'],
      color: 'from-lime-green to-neon-yellow'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'from-neon-yellow to-purple-glow'
    }
  ];

  const clubs = [
    {
      name: 'Dance Club',
      coordinator: 'Sarthak Ghoderao',
      email: 'sarthak.ghoderao@adypu.edu.in',
      icon: Users,
      color: 'from-neon-pink to-electric-blue'
    },
    {
      name: 'Music Club',
      coordinator: 'Bhavish Dhar',
      email: 'bhavish.dhar@adypu.edu.in',
      icon: Users,
      color: 'from-electric-blue to-lime-green'
    },
    {
      name: 'Theatre Club',
      coordinator: 'Khyati Kapil',
      email: 'khyati.kapil@adypu.edu.in',
      icon: Users,
      color: 'from-lime-green to-neon-yellow'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow-pink">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with the Ensemble team. We'd love to hear from you and answer any questions 
            you might have about our clubs, events, or how to join our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-doodle">
            <h2 className="text-3xl font-bold mb-6 text-glow-blue">
              Send us a Message
            </h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-lime-green to-neon-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-glow-green mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 btn-doodle text-white font-semibold px-6 py-3 rounded-lg"
                  data-cursor="action"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-doodle text-white font-semibold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-cursor="action"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* General Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-glow-green">
                Get in Touch
              </h2>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Club Contacts */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-glow-blue">
                Club Coordinators
              </h2>
              <div className="space-y-4">
                {clubs.map((club, index) => {
                  const Icon = club.icon;
                  return (
                    <div key={index} className="card-doodle p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${club.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">
                            {club.name}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Coordinator: {club.coordinator}
                          </p>
                          <a
                            href={`mailto:${club.email}`}
                            className="text-neon-pink hover:text-electric-blue transition-colors duration-300 text-sm"
                            data-cursor="action"
                          >
                            {club.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-glow-pink">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-6">
            {[
              { name: 'Instagram', color: 'from-neon-pink to-electric-blue' },
              { name: 'Facebook', color: 'from-electric-blue to-lime-green' },
              { name: 'Twitter', color: 'from-lime-green to-neon-yellow' },
              { name: 'YouTube', color: 'from-neon-yellow to-purple-glow' }
            ].map((social, index) => (
              <div
                key={index}
                className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300`}
                data-cursor="discovery" data-cursor-label="Follow"
              >
                <span className="text-white font-bold text-sm">
                  {social.name[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
