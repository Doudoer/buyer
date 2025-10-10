import React from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4" color="error">{t('notFound.404')}</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        {t('notFound.backHome', 'Volver al inicio')}
      </Button>
    </Stack>
  );
}