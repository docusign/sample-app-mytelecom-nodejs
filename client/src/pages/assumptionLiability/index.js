import React, { useEffect, useState } from 'react';
import AssumptionLiabilityForm from './assumptionLiabilityForm';
import { Col, Container, Row } from 'react-bootstrap';
import { SeeMore } from '../../components';
import { useTranslation } from 'react-i18next';
import { assumptionLiability } from '../../api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';

const Liability = () => {
  const { t } = useTranslation('AssumptionOfLiability');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      setLoading(true);
      const response = await assumptionLiability(form);
      setLoading(false);
      setResponse(response.data);
    } catch (error) {
      setLoading(false);
      console.log('handleSubmit error');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    window.DocuSign.loadDocuSign(response.integrationKey).then((docusign) => {
      const signing = docusign.signing({
        url: response.url,
        displayFormat: 'focused',
        style: {
          /** High-level variables that mirror our existing branding APIs. Reusing the branding name here for familiarity. */
          branding: {
            primaryButton: {
              /** Background color of primary button */
              backgroundColor: '#e94057',
              /** Text color of primary button */
              color: '#fff',
            },
          },
        },
      });
      signing.on('sessionEnd', () => {
        navigate('/submitted?event=signing_complete');
      });
      signing.mount('#agreement');
    });
  }, [response]);

  return (
    <section className="content-section">
      <Container>
        <Row className="justify-content-center">
          <Col className="form-col">
            <div className="form-holder">
              <h2 className="form-title">{t('Title')}</h2>
              {!response && <AssumptionLiabilityForm onSubmit={handleSubmit} />}
              {response && <div style={{ height: '600px' }} id="agreement" />}
              <Loader visible={loading} />
            </div>
          </Col>
          <SeeMore title={t('SeeMore.Title')} text={t('SeeMore.Text')} />
        </Row>
      </Container>
    </section>
  );
};

export default Liability;
