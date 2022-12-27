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
      <h4>{t('LimitChange')}</h4>
      <Col>
        <div className="radio-s">
          <div>
            <label key="increased">
              <input onChange={handleLimitChangeSelect} checked={limitChange === 'increased'} type="radio" name="limitChange" value="increased" />
              <span>{t('Increase')}</span>
            </label>
          </div>
          <div>
            <label key="decreased">
              <input onChange={handleLimitChangeSelect} checked={limitChange === 'decreased'} type="radio" name="limitChange" value="decreased" />
              <span>{t('Decrease')}</span>
            </label>
          </div>
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
      <h4>{t('RecipientNumber')}</h4>
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

  return (
    <>
      <h4>{t('RecipientData')}</h4>
      {[...Array(recipientCount).keys()].map(i => (
        <Form.Group key={i}>
        <h4>{`${t('SignerHeader')} ${i + 1}`}</h4>

        <Input
          id={`firstName${i}`}
          name={`firstName${i}`}
          label={t('FirstName')}
          autoComplete="given-name"
          {...register(`firstName${i}`, {
            required: formCheckFieldRequired,
          })}
          errors={errors}
        />

        <Input
          id={`lastName${i}`}
          name={`lastName${i}`}
          label={t('LastName')}
          autoComplete="family-name"
          {...register(`lastName${i}`, {
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
            pattern: {
              value: emailRegExp,
              message: t('InvalidEmailFormatError'),
            },
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
      
      </Form.Group>
      ))}
    </>
  );
}
