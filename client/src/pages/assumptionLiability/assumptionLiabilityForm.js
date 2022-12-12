import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, ErrorMessageContainer, useValidation, FormButtons } from '../../components';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';

const AssumptionLiabilityForm = ({ onSubmit }) => {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation('AssumptionOfLiability');
  const { emailRegExp, formCheckFieldRequired, formCheckNameMaxLength } = useValidation();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h4>{t('CurrentAccountOwner')}</h4>
      <Form.Group className="mb-4">
        <Input
          id="signerName"
          label={t('Name')}
          autoComplete="name"
          {...register('signerName', {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
          errors={errors}
        />
        <Input
          id="signerEmail"
          label={t('Email')}
          autoComplete="email"
          errors={errors}
          {...register('signerEmail', {
            required: formCheckFieldRequired,
            pattern: {
              value: emailRegExp,
              message: t('InvalidEmailFormatError'),
            },
          })}
        />
      </Form.Group>
      <h4>{t('NewAccountOwner')}</h4>
      <Input
        id="recipientName"
        label={t('Name')}
        autoComplete="name"
        {...register('recipientName', {
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        })}
        errors={errors}
      />
      <Form.Group className="phone-number">
        <Form.Label>{t('PhoneNumber')}</Form.Label>
        <div>
          <Form.Control
            id="CountryCode"
            placeholder="+1"
            autoComplete="tel-country-code"
            {...register('recipientCountryCode', {
              required: formCheckFieldRequired,
              pattern: {
                value: /^([+]?\d+)$/,
                message: t('InvalidCountryCodeError'),
              },
            })}
          />
          <Form.Control
            id="PhoneNumber"
            placeholder={t('PhonePlaceholder')}
            autoComplete="tel"
            {...register('recipientPhone', {
              required: formCheckFieldRequired,
              pattern: {
                value: /^(\d+-?)+\d+$/,
                message: t('InvalidPhoneNumberError'),
              },
              maxLength: {
                value: 11,
                message: t('InvalidPhoneNumberError'),
              },
              minLength: {
                value: 8,
                message: t('InvalidPhoneNumberError'),
              },
            })}
          />
        </div>
        <ErrorMessage errors={errors} name={'recipientCountryCode'} as={<ErrorMessageContainer />} />
        {!errors.recipientCountryCode && (
          <ErrorMessage errors={errors} name={'recipientPhone'} as={<ErrorMessageContainer />} />
        )}
      </Form.Group>
      <FormButtons />
    </Form>
  );
};

export default AssumptionLiabilityForm;
