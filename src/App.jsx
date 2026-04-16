import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/Services';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProjectEstimator from './pages/ProjectEstimator';
import WhatsAppButton from './components/ui/WhatsAppButton';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function AppInner() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/fz-portal' || pathname === '/fz-portal/';

  // Admin page gets its own isolated full-screen layout
  if (isAdmin) {
    return <Admin />;
  }

  // All other pages share the public layout
  return (
    <Layout>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/estimate" element={<ProjectEstimator />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </Layout>
  );
}

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.keyCode === 123) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default App;
