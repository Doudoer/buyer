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
        <Select
          id="language-select"
          value={i18n.language}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
    </FormControl>
  );
}
