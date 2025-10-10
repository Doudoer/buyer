import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

  export default function Faq() {
    const { t } = useTranslation();
    return (
      <Stack spacing={3}>
        <Typography variant="h4" component="h2">{t('faq.title')}</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t('faq.q1')}
          </AccordionSummary>
          <AccordionDetails>
            {t('faq.a1')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t('faq.q2')}
          </AccordionSummary>
          <AccordionDetails>
            {t('faq.a2')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t('faq.q3')}
          </AccordionSummary>
          <AccordionDetails>
            {t('faq.a3')}
          </AccordionDetails>
        </Accordion>
      </Stack>
    );
  }