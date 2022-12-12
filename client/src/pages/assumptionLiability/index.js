import React from 'react';
import { sendRequest } from '../../api/apiHelper';
import AssumptionLiabilityForm from './assumptionLiabilityForm';
import { Col, Container, Row } from 'react-bootstrap';
import { SeeMore } from '../../components';
import { useTranslation } from 'react-i18next';

const Liability = () => {
  const { t } = useTranslation('AssumptionOfLiability');

  const handleSubmit = async (event) => {
    // Make request body
    const body = {
      signerName: event.firstName + ' ' + event.lastName,
      signerEmail: event.signerEmail,
      recipientName: event.recipientFirstName + ' ' + event.recipientLastName,
      recipientPhone: event.phoneNumber,
      recipientCountryCode: event.countryCode,
    };

    // Send request to server
    try {
      const response = await sendRequest('/assumptionLiability', body);
      console.log('Received response:');
      console.log(response.data);

      // Received URL for embedded signing, redirect user
      if (response.status === 200) {
        window.location = response.data;
      }
    } catch (error) {
      console.log('handleSubmit error');
      console.log(error);
    }
  };

  return (
    <section className="content-section">
      <Container>
        <Row className="justify-content-center">
          <Col className="form-holder">
            <h4>{t('Title')}</h4>
            <AssumptionLiabilityForm onSubmit={handleSubmit} />
          </Col>
          <SeeMore title={t('SeeMore.Title')} text={t('SeeMore.Text')} />
        </Row>
      </Container>
    </section>
  );
};

export default Liability;
