import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Stack spacing={1} alignItems="center">
        <Typography variant="body2">&copy; {new Date().getFullYear()} Rodriguez te lo compra!. {t('footer.rights')}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="/privacidad" color="inherit" underline="hover">{t('footer.privacy')}</Link>
          <Link href="/aviso-legal" color="inherit" underline="hover">{t('footer.legal')}</Link>
        </Stack>
      </Stack>
    </Box>
  );
}