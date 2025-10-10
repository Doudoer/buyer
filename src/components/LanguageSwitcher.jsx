import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
      <InputLabel id="language-select-label">{t('nav.language')}</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={i18n.language}
        label={t('nav.language')}
        onChange={handleChange}
      >
        <MenuItem value="es">{t('nav.spanish')}</MenuItem>
        <MenuItem value="en">{t('nav.english')}</MenuItem>
      </Select>
    </FormControl>
  );
}
