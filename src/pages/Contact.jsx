import React, { useState } from 'react';
import { Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Simulación de envío de email (aquí iría la integración real con backend o servicio de email)
    await new Promise(res => setTimeout(res, 1000));
    setEnviado(true);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h2">{t('contact.title')}</Typography>
      {enviado && <Alert severity="success">{t('contact.sent', '¡Mensaje enviado! Te responderemos pronto.')}</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label={t('contact.name')} name="nombre" value={form.nombre} onChange={handleChange} required />
          <TextField label={t('contact.email')} name="email" value={form.email} onChange={handleChange} required type="email" />
          <TextField label={t('contact.message')} name="mensaje" value={form.mensaje} onChange={handleChange} required multiline rows={4} />
          <Button type="submit" variant="contained" color="primary">{t('contact.send')}</Button>
        </Stack>
      </form>
    </Stack>
  );
}