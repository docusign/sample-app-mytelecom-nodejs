import React from 'react';
import AssumptionLiabilityForm from './assumptionLiabilityForm';
import { Col, Container, Row } from 'react-bootstrap';
import { SeeMore } from '../../components';
import { useTranslation } from 'react-i18next';
import { assumptionLiability } from '../../api';

const Liability = () => {
  const { t } = useTranslation('AssumptionOfLiability');

  const handleSubmit = async (form) => {
    const response = await assumptionLiability(form);
    // Received URL for embedded signing, redirect user
    if (response.status === 200) {
      window.location = response.data;
    }
  };

  return (
    <section className="content-section">
      <Container>
        <Row className="justify-content-center">
          <Col className="form-holder">
            <h2 className="form-title">{t('Title')}</h2>
            <AssumptionLiabilityForm onSubmit={handleSubmit} />
          </Col>
          <SeeMore title={t('SeeMore.Title')} text={t('SeeMore.Text')} />
        </Row>
      </Container>
    </section>
  );
};

export default Liability;
