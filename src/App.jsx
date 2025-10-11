
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CssBaseline, Container } from '@mui/material';
import Home from './pages/Home';
import QuoteForm from './pages/QuoteForm';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Privacy from './pages/Privacy';
import LegalNotice from './pages/LegalNotice';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';


function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route
          path="/quote"
          element={
            <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
              <QuoteForm />
            </Container>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Banner />
              <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/legal-notice" element={<LegalNotice />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Container>
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
