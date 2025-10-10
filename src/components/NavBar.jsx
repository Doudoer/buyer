import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForceRerender } from '../utils/forceRerender';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const forceRerender = useForceRerender();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => forceRerender();
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, [i18n, forceRerender]);

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.quote'), to: '/cotizar' },
    { label: t('nav.testimonials'), to: '/testimonios' },
    { label: t('nav.blog'), to: '/blog' },
    { label: t('nav.contact'), to: '/contacto' },
    { label: t('nav.faq'), to: '/faq' },
  ];

  return (
  <AppBar position="static" color="primary" elevation={4} sx={{ minHeight: 120, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', background: 'linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)' }}>
      <Toolbar sx={{ minHeight: 120, height: 120, px: { xs: 2, md: 6 }, py: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/src/assets/logo.png" alt="Logo" style={{ height: 108, width: 'auto', marginRight: 0, transition: 'height 0.3s' }} />
        </Box>
        {/* Desktop navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navLinks.map((item) => (
            <Button key={item.to} color="inherit" component={Link} to={item.to} sx={{ fontWeight: 500, color: '#0d47a1' }}>
              {item.label}
            </Button>
          ))}
          <Box sx={{ ml: 2 }}>
            <LanguageSwitcher />
          </Box>
        </Box>
        {/* Mobile navigation */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 220, pt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              {navLinks.map((item) => (
                <ListItem button key={item.to} component={Link} to={item.to}>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <ListItem>
                <LanguageSwitcher />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}