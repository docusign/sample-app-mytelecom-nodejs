import React from 'react';
import text from '../../../assets/Text.json';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useValidation } from '../../../components';

function PurchaseDeviceForm({ onSubmit }) {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { emailRegExp, formCheckFieldRequired, formCheckNameMaxLength } = useValidation();

  const ErrorMessageContainer = ({ children }) => <span className="error">{children}</span>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{text.formLabels.firstName}</label>
      <input
        type="text"
        {...register('firstName', {
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        })}
      />
      <ErrorMessage errors={errors} name="firstName" as={<ErrorMessageContainer />} />
      <p></p>
      <label>{text.formLabels.lastName}</label>
      <input
        type="text"
        {...register('lastName', {
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        })}
      />
      <ErrorMessage errors={errors} name="lastName" as={<ErrorMessageContainer />} />
      <p></p>
      <label>{text.formLabels.email}</label>
      <input
        type="text"
        {...register('signerEmail', {
          required: formCheckFieldRequired,
          pattern: {
            value: emailRegExp,
            message: text.formLabels.invalidEmailFormatError,
          },
        })}
      />
      <ErrorMessage errors={errors} name="signerEmail" as={<ErrorMessageContainer />} />
      <p></p>
      <>
        <label>{text.purchaseDevice.selectPhone}</label>
        <select {...register('phoneSelection')}>
          <option value="0">{text.purchaseDevice.iPhone14}</option>
          <option value="1">{text.purchaseDevice.iPhone14Pro}</option>
          <option value="2">{text.purchaseDevice.iPhone14ProMax}</option>
          <option value="3">{text.purchaseDevice.samsungGalaxy}</option>
          <option value="4">{text.purchaseDevice.googlePixel}</option>
        </select>

        <p></p>

        <label>{text.purchaseDevice.insuranceLabel}</label>
        <label>
          <input {...register('insurance')} type="radio" value="Yes" />
          {text.purchaseDevice.yes}
        </label>
        <label>
          <input {...register('insurance')} type="radio" value="No" />
          {text.purchaseDevice.no}
        </label>

        <p></p>
        <label>{text.purchaseDevice.downPayment}</label>
        <input
          type="number"
          {...register('downPayment', {
            required: formCheckFieldRequired,
            maxLength: { ...formCheckNameMaxLength, value: 4 },
          })}
        />
        <ErrorMessage errors={errors} name="downPayment" as={<ErrorMessageContainer />} />
        <p></p>

        <label>{text.purchaseDevice.scheduleSend}</label>
        <input
          type="number"
          {...register('minutesDelay', {
            required: formCheckFieldRequired,
            maxLength: { ...formCheckNameMaxLength, value: 5 },
          })}
        />
        <ErrorMessage errors={errors} name="minutesDelay" as={<ErrorMessageContainer />} />
      </>
      <p></p>

      <input type="submit" value={text.formLabels.buttonName} />
    </form>
  );
}

export default PurchaseDeviceForm;
