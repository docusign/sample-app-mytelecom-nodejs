import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import arrow from '../../assets/img/arrow-square-right.svg';

const PreFooter = () => {
  const { t } = useTranslation('Home');
  return (
    <section className="text-center">
      <div className="cta-buttons">
        <a href={t('CreateDeveloperAccountHeaderLink')} rel="noopener noreferrer" target="_blank">
          <button className="first-button" type="button">
            {t('CreateDeveloperAccountHeader')}
          </button>
        </a>

        <a href={t('LearnMoreLink')} rel="noopener noreferrer" target="_blank">
          <button className="second-button" type="button">
            {t('LearnMore')}
          </button>
        </a>
      </div>
    </section>
  );
};
export default PreFooter;
