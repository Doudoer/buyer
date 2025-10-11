
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

  // Testimonios de ejemplo (ahora usando traducción)
  const testimonios = [
    {
      nombre: t('home.testimonials.1.name', 'Laura, CDMX'),
      texto: t('home.testimonials.1.text', 'Vendí mi auto en un día, todo fue muy fácil.')
    },
    {
      nombre: t('home.testimonials.2.name', 'José, Monterrey'),
      texto: t('home.testimonials.2.text', 'Me pagaron al instante y recogieron el auto en mi casa.')
    },
    {
      nombre: t('home.testimonials.3.name', 'Ana, Guadalajara'),
      texto: t('home.testimonials.3.text', 'El proceso fue rápido y sin complicaciones.')
    }
  ];

  return (
    <Stack spacing={6} alignItems="center" sx={{ width: '100%' }}>
      {/* PROCESO EN 3 PASOS COMPONENTE EXACTO */}
      <VentaProceso />

      {/* SECCIÓN POR QUÉ ELEGIRNOS */}
      <PorQueElegirnos />
    </Stack>
  );
}