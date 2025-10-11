import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Stack, CircularProgress, Alert } from '@mui/material';

async function fetchZipData(zip) {
  const res = await fetch(`http://api.zippopotam.us/us/${zip}`);
  if (!res.ok) throw new Error('No se encontró el código postal');
  return res.json();
}

export default function PasoDireccion({ value = {}, onChange, onValid }) {
  const [zip, setZip] = useState(value.zip || '');
  const [city, setCity] = useState(value.city || '');
  const [state, setState] = useState(value.state || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const valid = zip.length === 5 && city && state;
    onValid(!!valid);
  }, [zip, city, state, onValid]);

  const handleZipChange = async (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(val);
    setError('');
    setCity('');
    setState('');
    onChange({ ...value, zip: val, city: '', state: '' });
    if (val.length === 5) {
      setLoading(true);
      try {
        const data = await fetchZipData(val);
        const place = data.places[0];
        setCity(place["place name"]);
        setState(place["state abbreviation"]);
        onChange({ ...value, zip: val, city: place["place name"], state: place["state abbreviation"] });
      } catch (err) {
        setError('Código postal no encontrado');
      }
      setLoading(false);
    }
  };

  const handleBlur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dirección donde se ubica el vehículo
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Código Postal"
          value={zip}
          onChange={handleZipChange}
          onBlur={handleBlur('zip')}
          required
          placeholder="ZIP Code"
          error={touched.zip && zip.length !== 5}
          helperText={touched.zip && zip.length !== 5 ? 'Debe tener 5 dígitos' : ''}
        />
        {loading && <CircularProgress size={24} />}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Ciudad"
          value={city}
          InputProps={{ readOnly: true }}
          required
        />
        <TextField
          label="Estado"
          value={state}
          InputProps={{ readOnly: true }}
          required
        />
      </Stack>
    </Box>
  );
}
