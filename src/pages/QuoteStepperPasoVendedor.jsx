import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

function validarTelefono(valor) {
  // Formato: (000) 123 4252
  return /^\(\d{3}\) \d{3} \d{4}$/.test(valor);
}

function validarEmail(valor) {
  // Validación básica de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

export default function PasoVendedor({ value = {}, onChange, onValid }) {
  const { t } = useTranslation();
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const valid =
      value.nombre?.trim() &&
      value.apellido?.trim() &&
      validarTelefono(value.telefono || '') &&
      validarEmail(value.email || '');
    onValid(!!valid);
  }, [value, onValid]);

  // Formatear teléfono automáticamente al escribir
  const handleTelefonoChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 10) input = input.slice(0, 10);
    let formatted = input;
    if (input.length > 0) {
      formatted = '(' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formatted += ' ' + input.substring(6, 10);
    }
    onChange({ ...value, telefono: formatted });
  };

  const handleChange = (key) => (e) => {
    onChange({ ...value, [key]: e.target.value });
  };

  const handleBlur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('quote.sellerTitle', 'Datos del vendedor')}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={t('quote.sellerName', 'Nombre')}
          value={value.nombre || ''}
          onChange={handleChange('nombre')}
          onBlur={handleBlur('nombre')}
          required
          error={touched.nombre && !value.nombre?.trim()}
          helperText={touched.nombre && !value.nombre?.trim() ? t('quote.requiredField', 'Campo requerido') : ''}
        />
        <TextField
          label={t('quote.sellerLastName', 'Apellido')}
          value={value.apellido || ''}
          onChange={handleChange('apellido')}
          onBlur={handleBlur('apellido')}
          required
          error={touched.apellido && !value.apellido?.trim()}
          helperText={touched.apellido && !value.apellido?.trim() ? t('quote.requiredField', 'Campo requerido') : ''}
        />
        <TextField
          label={t('quote.sellerPhone', 'Teléfono')}
          value={value.telefono || ''}
          onChange={handleTelefonoChange}
          onBlur={handleBlur('telefono')}
          required
          placeholder={t('quote.phonePlaceholder', '(000) 123 4252')}
          error={touched.telefono && !validarTelefono(value.telefono || '')}
          helperText={
            touched.telefono && !validarTelefono(value.telefono || '')
              ? t('quote.phoneFormat', 'Formato requerido: (000) 123 4252')
              : ''
          }
        />
        <TextField
          label={t('quote.sellerEmail', 'Correo electrónico')}
          value={value.email || ''}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          required
          type="email"
          error={touched.email && !validarEmail(value.email || '')}
          helperText={
            touched.email && !validarEmail(value.email || '')
              ? t('quote.emailFormat', 'Ingresa un correo electrónico válido')
              : ''
          }
        />
      </Stack>
    </Box>
  );
}
