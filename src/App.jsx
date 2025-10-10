
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
import Privacidad from './pages/Privacidad';
import AvisoLegal from './pages/AvisoLegal';
import Testimonios from './pages/Testimonios';
import Blog from './pages/Blog';


function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Banner />
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cotizar" element={<QuoteForm />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
