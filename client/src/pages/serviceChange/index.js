import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { serviceChange } from "../../api";
import { SeeMore } from '../../components';
import ServiceChangeForm from "./ServiceChangeForm";

function ServiceChange() {
  const { t } = useTranslation('ChangeService');

  const navigate = useNavigate();
  const handleSubmit = async(form, limitChange) => {
    try {
      const signers = [];

      for (let i = 0; i < form.recipientNumber; i++) {
        signers.push({ name: `${form[`firstName${i}`]} ${form[`lastName${i}`]}`, email: form[`email${i}`], limit: form[`limit${i}`] });
      }

      const response = await serviceChange({signers, limitChange});
      console.log(`Received response: ${response.data}`);
      navigate("/submitted?1");
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <section className="content-section">
      <Container>
        <Row className="justify-content-center">
          <Col className="form-col">
            <div className="form-holder">
              <h2 className="form-title">{t('Title')}</h2>
              <ServiceChangeForm onSubmit={handleSubmit} />
            </div>
          </Col>
          <SeeMore title={t('SeeMore.Title')} text={t('SeeMore.Text')} />
        </Row>
      </Container>
    </section>
  );
}

export default ServiceChange;
