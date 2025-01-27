import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/img/logo.png';
import source from '../assets/img/github-source.svg';

export const Header = () => {
  const { t } = useTranslation('Common');

  return (
    <header className="header" role="banner">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="justify-content-end">
          <a className="nav-link" href={t('GitHubLink')} rel="noopener noreferrer" target="_blank">
            <img src={source} alt={t('GitHubLinkText')} />
          </a>
        </div>
      </nav>
    </header>
  );
};
