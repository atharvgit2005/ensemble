import { Link } from 'react-router-dom';

const Home = () => {
  const clubs = [
    {
      name: 'Dance',
      description: 'Express yourself through movement and rhythm',
      link: '/dance'
    },
    {
      name: 'Music',
      description: 'Create melodies that touch the soul',
      link: '/music'
    },
    {
      name: 'Theatre',
      description: 'Bring stories to life on stage',
      link: '/theatre'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Ensemble
          </h1>
          <p className="hero-subtitle">
            Where creativity meets passion, and art comes alive. Join our vibrant community of artists, performers, and creators.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn-primary" data-cursor="action">
              Explore Our Clubs
            </Link>
            <Link to="/contact" className="btn-secondary" data-cursor="action">
              Join the Ensemble
            </Link>
          </div>
        </div>
      </section>

      {/* Clubs Overview Section */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Our Creative Clubs
            </h2>
            <p className="section-subtitle">
              Whether you're passionate about dance, music, or theatre, there's a place for you in our vibrant community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <div key={club.name} className="text-center" data-cursor="ensemble">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  {club.name}
                </h3>
                <p className="text-secondary mb-6">
                  {club.description}
                </p>
                <Link
                  to={club.link}
                  className="btn-secondary"
                  data-cursor="action"
                >
                  Explore {club.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Upcoming Events
            </h2>
            <p className="section-subtitle">
              Don't miss out on our exciting festivals and performances throughout the year.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Raas 2024', date: 'Dec 2024', status: 'Upcoming' },
              { name: 'Lohri 2024', date: 'Jan 2025', status: 'Upcoming' },
              { name: 'Ganesh Chaturthi 2024', date: 'Sep 2024', status: 'Completed' },
              { name: 'Raas 2025', date: 'Dec 2025', status: 'Planning' }
            ].map((event) => (
              <div key={event.name} className="text-center p-6 bg-secondary rounded-lg" data-cursor="discovery" data-cursor-label="View Details">
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {event.name}
                </h3>
                <p className="text-secondary mb-2">{event.date}</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'Upcoming' 
                    ? 'bg-blue text-white' 
                    : event.status === 'Completed'
                    ? 'bg-secondary text-primary'
                    : 'bg-tertiary text-secondary'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact" className="btn-primary" data-cursor="action">
              Get Event Updates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

