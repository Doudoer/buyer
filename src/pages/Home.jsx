
import React, { useEffect } from 'react';
import { Typography, Button, Stack, Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import VentaProceso from '../components/VentaProceso';
import PorQueElegirnos from '../components/PorQueElegirnos';
import { Link } from 'react-router-dom';
import { setTitle, setMetaDescription } from '../components/Seo';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setTitle('Rodriguez te lo compra!');
    setMetaDescription(t('home.description'));
  }, [i18n.language, t]);

  // Testimonios de ejemplo
  const testimonios = [
    {
      nombre: 'Laura, CDMX',
      texto: 'Vendí mi auto en un día, todo fue muy fácil.'
    },
    {
      nombre: 'José, Monterrey',
      texto: 'Me pagaron al instante y recogieron el auto en mi casa.'
    },
    {
      nombre: 'Ana, Guadalajara',
      texto: 'El proceso fue rápido y sin complicaciones.'
    }
  ];

  return (
    <Stack spacing={6} alignItems="center" sx={{ width: '100%' }}>
      {/* HERO PRINCIPAL */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', py: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary.main" fontWeight={700}>
          {t('hero.title')}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {t('hero.subtitle')}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/cotizar">
            {t('hero.cta')}
          </Button>
          <Button variant="outlined" color="primary" size="large" component={Link} to="/faq">
            {t('hero.howItWorks')}
          </Button>
        </Stack>
      </Box>

  {/* PROCESO EN 3 PASOS COMPONENTE EXACTO */}
  <VentaProceso />

  {/* SECCIÓN POR QUÉ ELEGIRNOS */}
  <PorQueElegirnos />

      {/* ...sección de beneficios antigua eliminada... */}

      {/* ...sección de testimonios eliminada... */}
    </Stack>
  );
}