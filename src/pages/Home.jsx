
import React, { useEffect } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { setTitle, setMetaDescription } from '../components/Seo';

export default function Home() {
  useEffect(() => {
    setTitle('CashForCars - Vende tu auto fácil y rápido');
    setMetaDescription('Obtén una cotización instantánea y vende tu auto hoy mismo. Sin complicaciones, sin regateos.');
  }, []);
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h3" component="h1" gutterBottom>
        ¡Vende tu auto fácil y rápido!
      </Typography>
      <Typography variant="body1" align="center">
        Obtén una cotización instantánea y vende tu auto hoy mismo. Sin complicaciones, sin regateos.
      </Typography>
      <Button variant="contained" color="primary" size="large" component={Link} to="/cotizar">
        Cotiza tu auto
      </Button>
    </Stack>
  );
}