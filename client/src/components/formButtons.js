import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const FormButtons = ({ onBack, onContinue }) => {
  const { t } = useTranslation('Common');
  const navigate = useNavigate();

  const handleBack = () => {
    if (!onBack) {
      return navigate(-1);
    }

    onBack();
  };

  return (
    <div className="d-flex justify-content-end">
      {onContinue && <Button onClick={onContinue}>{t('MainButton')}</Button>}
      {!onContinue && <Button type="submit">{t('MainButton')}</Button>}
    </div>
  );
};
