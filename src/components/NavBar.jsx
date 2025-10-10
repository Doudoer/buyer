import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForceRerender } from '../utils/forceRerender';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const forceRerender = useForceRerender();

  React.useEffect(() => {
    const handler = () => forceRerender();
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, [i18n, forceRerender]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rodriguez te lo compra!
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">{t('nav.home')}</Button>
          <Button color="inherit" component={Link} to="/cotizar">{t('nav.quote')}</Button>
          <Button color="inherit" component={Link} to="/testimonios">{t('nav.testimonials')}</Button>
          <Button color="inherit" component={Link} to="/blog">{t('nav.blog')}</Button>
          <Button color="inherit" component={Link} to="/contacto">{t('nav.contact')}</Button>
          <Button color="inherit" component={Link} to="/faq">{t('nav.faq')}</Button>
          <LanguageSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}