import React, { useEffect } from 'react';
import { Box, Typography, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';

const preguntas = [
  { key: 'enciende', label: 'quote.condicion.enciende' },
  { key: 'neumaticos_aire', label: 'quote.condicion.neumaticos_aire' },
  { key: 'todos_neumaticos', label: 'quote.condicion.todos_neumaticos' },
  { key: 'catalizadores', label: 'quote.condicion.catalizadores' },
  { key: 'titulo', label: 'quote.condicion.titulo' },
  { key: 'llave', label: 'quote.condicion.llave' },
];

export default function PasoCondicion({ value = {}, onChange, onValid }) {
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
        {t('quote.condicionTitle', 'Condiciones del vehículo')}
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
