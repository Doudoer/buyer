import React, { useEffect } from 'react';
import { Box, Typography, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';

const preguntas = [
  { key: 'danos_frente', label: 'quote.corporal.danos_frente' },
  { key: 'danos_trasera', label: 'quote.corporal.danos_trasera' },
  { key: 'danos_lado_izq', label: 'quote.corporal.danos_lado_izq' },
  { key: 'danos_lado_der', label: 'quote.corporal.danos_lado_der' },
  { key: 'danos_motor', label: 'quote.corporal.danos_motor' },
  { key: 'inundacion', label: 'quote.corporal.inundacion' },
  { key: 'fuego', label: 'quote.corporal.fuego' },
  { key: 'bolsas_aire', label: 'quote.corporal.bolsas_aire' },
];

export default function PasoCorporal({ value = {}, onChange, onValid }) {
  const { t } = useTranslation();
  useEffect(() => {
    // Validar que todas las preguntas tengan respuesta (true/false)
    const valid = preguntas.every(q => typeof value[q.key] === 'boolean');
    onValid(valid);
  }, [value, onValid]);

  const handleRadio = (key) => (e) => {
    onChange({ ...value, [key]: e.target.value === 'true' });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('quote.corporalTitle', 'Condición corporal del vehículo')}
      </Typography>
      <FormGroup>
        {preguntas.map((q) => (
          <Box key={q.key} sx={{ mb: 2 }}>
            <Typography>{t(q.label)}</Typography>
            <RadioGroup
              row
              value={typeof value[q.key] === 'boolean' ? String(value[q.key]) : ''}
              onChange={handleRadio(q.key)}
            >
              <FormControlLabel value="true" control={<Radio color="primary" />} label={t('quote.yes', 'Sí')} />
              <FormControlLabel value="false" control={<Radio color="primary" />} label={t('quote.no', 'No')} />
            </RadioGroup>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
}
