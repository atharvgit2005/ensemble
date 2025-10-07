import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Dance from './pages/Dance';
import Theatre from './pages/Theatre';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/music" element={<Music />} />
            <Route path="/dance" element={<Dance />} />
            <Route path="/theatre" element={<Theatre />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;