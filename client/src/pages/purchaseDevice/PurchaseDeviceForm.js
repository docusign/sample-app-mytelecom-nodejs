import React from "react";
import { useForm } from "react-hook-form";
import { Input, useValidation, FormButtons, NumberInput, SelectInput, RadioInput } from '../../components';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function PurchaseDeviceForm({ onSubmit }) {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation('PurchaseDevice');
  const { emailRegExp, formCheckFieldRequired, formCheckNameMaxLength } = useValidation();

  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h4>{t('AccountInfo')}</h4>
      <Form.Group className="mb-4">
        <Input
          id="firstName"
          label={t('FirstName')}
          autoComplete="firstName"
          {...register('firstName', {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
          errors={errors}
        />

        <Input
          id="lastName"
          label={t('LastName')}
          autoComplete="lastName"
          {...register('lastName', {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
          errors={errors}
        />
        
        <Input
          id="signerEmail"
          label={t('Email')}
          autoComplete="signerEmail"
          {...register('signerEmail', {
            required: formCheckFieldRequired,
            pattern: {
              value: emailRegExp,
              message: t('InvalidEmailFormatError'),
            },
          })}
          errors={errors}
        />
      </Form.Group>

      <h4>{t('PhoneInfo')}</h4>
      <Form.Group className="mb-4">
        <SelectInput
          id="signerPhoneSelection"
          label={t('PhoneSelection')}
          autoComplete="signerPhoneSelection"
          options={[
            t('IPhone14'),
            t('IPhone14Pro'),
            t('IPhone14ProMax'),
            t('SamsungGalaxy'),
            t('GooglePixel')
          ]}
          {...register('signerPhoneSelection', {
            required: formCheckFieldRequired,
          })}
          errors={errors}
        />

        <RadioInput
          id="signerInsuranceSelection"
          name="signerInsuranceSelection"
          label={t('InsuranceLabel')}
          autoComplete="signerInsuranceSelection"
          options={[
            { value: 'Yes', text: t('Yes') },
            { value: 'No', text: t('No') },
          ]}
          {...register('phoneSelection', {
            required: formCheckFieldRequired,
          })}
          errors={errors}
        />

        <NumberInput
          id="signerDownPayment"
          label={t('DownPayment')}
          autoComplete="signerDownPayment"
          {...register('signerDownPayment', {
            required: formCheckFieldRequired,
          })}
          errors={errors}
        />

        <NumberInput
          id="signerMinutesDelay"
          label={t('ScheduleSend')}
          autoComplete="signerMinutesDelay"
          {...register('signerMinutesDelay', {
            required: formCheckFieldRequired,
          })}
          errors={errors}
        />
      </Form.Group>

      <FormButtons />
    </Form>
    </>
  );
}

export default PurchaseDeviceForm;
