import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input, useValidation, FormButtons, SelectInput, RadioInput } from '../../../components';

export const LimitChangeForm = ({ setLimitChange, register, errors }) => {
  const { t } = useTranslation('ChangeService');

  const { formCheckFieldRequired } = useValidation();

  const handleLimitChangeSelect = (evt) => {
    setLimitChange(evt.target.value);
  }

  return (
    <Form.Group>
      <RadioInput
        id="limitChange"
        name="limitChange"
        label={t('LimitChange')}
        options={[
          { value: 'increase', text: t('Increase') },
          { value: 'decrease', text: t('Decrease') },
        ]}
        {...register('limitChange', {
          required: formCheckFieldRequired,
        })}
        onChange={handleLimitChangeSelect}
        errors={errors}
      />
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
