import React from 'react';
import { Typography, Stack } from '@mui/material';

export default function AvisoLegal() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Aviso Legal</Typography>
      <Typography variant="body1">Este es un aviso legal de ejemplo. Aquí puedes incluir información legal relevante sobre el sitio y la empresa.</Typography>
    </Stack>
  );
}