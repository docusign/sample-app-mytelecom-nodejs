import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const FormButtons = () => {
  const { t } = useTranslation('Common');
  const navigate = useNavigate();
  return (
    <div className="float-end">
      <Button variant="link" onClick={() => navigate(-1)}>
        {t('BackButton')}
      </Button>
      <Button type="submit">{t('MainButton')}</Button>
    </div>
  );
};
