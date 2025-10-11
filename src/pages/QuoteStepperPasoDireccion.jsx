import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Stack, CircularProgress, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

async function fetchZipData(zip) {
  // Usar proxy en desarrollo local y serverless en producción
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const url = isLocal
    ? '/api/zippopotam.us/us/' + zip
    : '/api/zipcode?zip=' + zip;
  const res = await fetch(url);
  if (!res.ok) throw new Error('No se encontró el código postal');
  return res.json();
}

export default function PasoDireccion({ value = {}, onChange, onValid }) {
  const { t } = useTranslation();
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
        {t('quote.addressTitle', 'Dirección donde se ubica el vehículo')}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={t('quote.zip', 'Código Postal')}
          value={zip}
          onChange={handleZipChange}
          onBlur={handleBlur('zip')}
          required
          placeholder={t('quote.zipPlaceholder', 'ZIP Code')}
          error={touched.zip && zip.length !== 5}
          helperText={touched.zip && zip.length !== 5 ? t('quote.zipHelper', 'Debe tener 5 dígitos') : ''}
        />
        {loading && <CircularProgress size={24} />}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label={t('quote.city', 'Ciudad')}
          value={city}
          InputProps={{ readOnly: true }}
          required
        />
        <TextField
          label={t('quote.state', 'Estado')}
          value={state}
          InputProps={{ readOnly: true }}
          required
        />
      </Stack>
    </Box>
  );
}
