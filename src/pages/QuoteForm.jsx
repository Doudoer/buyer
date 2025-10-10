
import React, { useState } from 'react';
import { Typography, Stack, Alert } from '@mui/material';
import QuoteStepperFull from '../components/QuoteStepperFull';

export default function QuoteForm() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Aquí se prepara la integración con la API real
  const handleQuote = async (data) => {
    setError(null);
    setResult(null);
    try {
      // Ejemplo de integración futura:
      // const res = await fetch('ENDPOINT_API', { method: 'POST', body: JSON.stringify(data) });
      // const json = await res.json();
      // setResult(json);
      setResult({ ok: true, mensaje: '¡Simulación exitosa! (Aquí se mostraría la oferta real)' });
    } catch (e) {
      setError('No se pudo obtener la cotización. Intenta más tarde.');
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h2">Cotiza tu auto</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {result && <Alert severity="success">{result.mensaje}</Alert>}
  {!result && <QuoteStepperFull onSubmit={handleQuote} />}
    </Stack>
  );
}