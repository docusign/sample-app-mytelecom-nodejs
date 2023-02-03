import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Success = (props) => {
  const { t } = useTranslation('Success');
  const location = useLocation();

  return (
    <section className="content-section">
      <div className="container text-center">
        {!location.search && <h2>{t('Option1.Title')}</h2>}
        {location.search === '?1' && <h2>{t('Option2.Title')}</h2>}
        {location.search === '?event=signing_complete' && <h2>{t('Option3.Title')}</h2>}
        <br />
        <br />
        {!location.search && <p>{t('Option1.Description')}</p>}
        {location.search === '?1' && <p>{t('Option2.Description')}</p>}
        {location.search === '?event=signing_complete' && <p>{t('Option3.Description')}</p>}
        <p>
          <Link className="success-link" to="/">
            {t('BackLink')}
          </Link>
        </p>
        <br />
        <p>
          <b>{t('SandboxText')}</b>
        </p>
        <p>
          <a href="hhttps://go.docusign.com/o/sandbox/" target="_blank" rel="noopener noreferrer">
            <button className="h-card-button" style={{ width: 'auto' }} type="submit">
              {t('SandboxButton')}
            </button>
          </a>
        </p>
        <p>
          <small>{t('Description')}</small>
        </p>
      </div>
    </section>
  );
};

export default Success;
