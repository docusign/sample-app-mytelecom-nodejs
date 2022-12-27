import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Input, useValidation } from '../../../components';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorMessageContainer } from '../../../components/errorMessageContainer';

export const LimitChangeForm = ({ limitChange, setLimitChange, register, errors }) => {
  const { t } = useTranslation('ChangeService');

  const handleLimitChangeSelect = (evt) => {
    setLimitChange(evt.target.value);
  }

  return (
    <Form.Group as={Row} className="mb-3" controlId="limitChange">
      <Form.Label>LimitChange</Form.Label>
      <Col>
        <div className="radio-s">
          <div><label key="increased"><input onChange={handleLimitChangeSelect} checked={limitChange === 'increased'} type="radio" name="limitChange" value="increased" /><span>Increase</span></label></div>
          <div><label key="decreased"><input onChange={handleLimitChangeSelect} checked={limitChange === 'decreased'} type="radio" name="limitChange" value="decreased" /><span>Decrease</span></label></div>
        </div>
        
        <ErrorMessage errors={errors} name="limitChange" as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
}

export const RecipientNumberForm = ({ recipientCount, setRecipientCount, register, errors }) => {
  const { t } = useTranslation('ChangeService');

  const { formCheckFieldRequired } = useValidation();

  const handleRecipientNumberSelect = (evt) => {
    setRecipientCount(evt.target.value);
  }

  return (
    <Form.Group>
      <Input
        id="recipientNumber"
        name="recipientNumber"
        type="number"
        defaultValue={recipientCount}
        min="3"
        label={t('RecipientNumber')}
        {...register('recipientNumber', {
          required: formCheckFieldRequired,
        })}
        onChange={handleRecipientNumberSelect}
        errors={errors}
      />
    </Form.Group>
  );
}

export const RecipientDataForm = ({ recipientCount, register, errors }) => {
  const { t } = useTranslation('ChangeService');

  const { emailRegExp, formCheckFieldRequired } = useValidation();

  const signersData = [];

  for(let i = 0; i < recipientCount; ++i) {
    signersData.push(<Form.Group key={i}>
      <h5>Signer {i + 1}</h5>
      
      <Input
        id={`name${i}`}
        name={`name${i}`}
        label={t('Name')}
        {...register(`name${i}`, {
          required: formCheckFieldRequired,
        })}
        errors={errors}
      />

      <Input
        id={`email${i}`}
        name={`email${i}`}
        label={t('Email')}
        {...register(`email${i}`, {
          required: formCheckFieldRequired,
        })}
        errors={errors}
      />
      
      <Input
        id={`limit${i}`}
        name={`limit${i}`}
        label={t('Limit')}
        type="number"
        min="1"
        {...register(`limit${i}`, {
          required: formCheckFieldRequired,
        })}
        errors={errors}
      />
      
    </Form.Group>)
  }

  return (signersData);
}
