import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const backgroundImageURL = '/logos/licensed-image.jpg';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 77, 153, 0.7), rgba(0, 77, 153, 0.7)), url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: 4,
        m: 0,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 700,
          mb: 2,
        }}
      >
        {t('banner.title', 'Sell your car today!')}
      </Typography>
      <Typography
        variant="h5"
        component="p"
        sx={{
          mb: 4,
          maxWidth: '600px',
        }}
        dangerouslySetInnerHTML={{ __html: t('banner.subtitle', 'Get the best price for your car, <b>fast and easy!</b>') }}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: '#105A37',
          '&:hover': {
            backgroundColor: '#0d472b',
          },
          padding: '12px 30px',
          borderRadius: '50px',
          fontWeight: 'bold',
        }}
        href="/cotizar"
      >
        {t('banner.cta', 'COTIZA TU AUTO AHORA')}
      </Button>
    </Box>
  );
};

export default Banner;