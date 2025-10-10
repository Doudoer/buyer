import React from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4" color="error">404 - Página no encontrada</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Volver al inicio
      </Button>
    </Stack>
  );
}