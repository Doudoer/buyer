import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Stack spacing={1} alignItems="center">
        <Typography variant="body2">&copy; {new Date().getFullYear()} CashForCars. Todos los derechos reservados.</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="/privacidad" color="inherit" underline="hover">Política de Privacidad</Link>
          <Link href="/aviso-legal" color="inherit" underline="hover">Aviso Legal</Link>
        </Stack>
      </Stack>
    </Box>
  );
}