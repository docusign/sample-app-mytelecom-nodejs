import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, ErrorMessageContainer, useValidation } from '../../components';
import { Button, Form } from 'react-bootstrap';
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
      <h6>{t('CurrentAccountOwner')}</h6>
      <Input
        id="firstName"
        label={t('FirstName')}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        }}
        register={register}
        errors={errors}
      />
      <Input
        id="lastName"
        label={t('LastName')}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        }}
        register={register}
        errors={errors}
      />
      <Input
        id="signerEmail"
        label={t('Email')}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          pattern: {
            value: emailRegExp,
            message: t('InvalidEmailFormatError'),
          },
        }}
        register={register}
        errors={errors}
      />
      <hr />
      <h6>{t('NewAccountOwner')}</h6>
      <Input
        id="recipientFirstName"
        label={t('FirstName')}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        }}
        register={register}
        errors={errors}
      />
      <Input
        id="recipientLastName"
        label={t('LastName')}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        }}
        register={register}
        errors={errors}
      />
      <Form.Group className="phone-number">
        <Form.Label>{t('PhoneNumber')}</Form.Label>
        <div>
          <Form.Control
            id="CountryCode"
            placeholder="+1"
            {...register('countryCode', {
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
            {...register('phoneNumber', {
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
        <ErrorMessage errors={errors} name={'countryCode'} as={<ErrorMessageContainer />} />
        {!errors.countryCode && <ErrorMessage errors={errors} name={'phoneNumber'} as={<ErrorMessageContainer />} />}
      </Form.Group>
      <Button type="submit" className="h-card-button">
        {t('ButtonName')}
      </Button>
    </Form>
  );
};

export default AssumptionLiabilityForm;
