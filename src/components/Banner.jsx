import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Banner() {
  return (
    <Box sx={{ width: '100%', height: 200, background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        ¡Vende tu auto hoy mismo!
      </Typography>
    </Box>
  );
}