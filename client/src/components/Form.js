import React from "react";
import text from "../assets/Text.json";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Form({ includePhone, onSubmit, phonePurchase }) {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ErrorMessageContainer = ({ children }) => (
    <span className="error">{children}</span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{text.formLabels.firstName}</label>
      <input
        type="text"
        {...register("firstName", {
          required: {
            value: true,
            message: text.formLabels.requiredFieldError,
          },
          maxLength: { value: 30, message: text.formLabels.inputTooLongError },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="firstName"
        as={<ErrorMessageContainer />}
      />
      <p></p>
      <label>{text.formLabels.lastName}</label>
      <input
        type="text"
        {...register("lastName", {
          required: {
            value: true,
            message: text.formLabels.requiredFieldError,
          },
          maxLength: { value: 50, message: text.formLabels.inputTooLongError },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="lastName"
        as={<ErrorMessageContainer />}
      />
      <p></p>
      <label>{text.formLabels.email}</label>
      <input
        type="text"
        {...register("signerEmail", {
          required: {
            value: true,
            message: text.formLabels.requiredFieldError,
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: text.formLabels.invalidEmailFormatError,
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="signerEmail"
        as={<ErrorMessageContainer />}
      />
      <p></p>
      {includePhone && (
        <>
          <label>{text.formLabels.countryCode}</label>
          <input
            type="text"
            placeholder="1"
            {...register("countryCode", {
              required: {
                value: true,
                message: text.formLabels.requiredFieldError,
              },
              pattern: {
                value: /^([+]?\d+)$/,
                message: text.formLabels.invalidCountryCodeError,
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="countryCode"
            as={<ErrorMessageContainer />}
          />
          <label>{text.formLabels.phoneNumber}</label>
          <input
            type="tel"
            placeholder={text.formLabels.phonePlaceholder}
            {...register("phoneNumber", {
              required: {
                value: true,
                message: text.formLabels.requiredFieldError,
              },
              pattern: {
                value: /^(\d+-?)+\d+$/,
                message: text.formLabels.invalidPhoneNumberError,
              },
              maxLength: {
                value: 11,
                message: text.formLabels.invalidPhoneNumberError,
              },
              minLength: {
                value: 8,
                message: text.formLabels.invalidPhoneNumberError,
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="phoneNumber"
            as={<ErrorMessageContainer />}
          />
        </>
      )}
      <p></p>
      <p></p>
      {phonePurchase && (
        <>
          <label>{text.purchaseDevice.selectPhone}</label>
          <select {...register("phoneSelection")}>
            <option value="0">{text.purchaseDevice.iPhone14}</option>
            <option value="1">{text.purchaseDevice.iPhone14Pro}</option>
            <option value="2">{text.purchaseDevice.iPhone14ProMax}</option>
            <option value="3">{text.purchaseDevice.samsungGalaxy}</option>
            <option value="4">{text.purchaseDevice.googlePixel}</option>
          </select>

          <p></p>

          <label>{text.purchaseDevice.insuranceLabel}</label>
          <label>
            <input {...register("insurance")} type="radio" value="Yes" />
            {text.purchaseDevice.yes}
          </label>
          <label>
            <input {...register("insurance")} type="radio" value="No" />
            {text.purchaseDevice.no}
          </label>

          <p></p>
          <label>{text.purchaseDevice.downPayment}</label>
          <input
            type="number"
            {...register("downPayment", {
              required: {
                value: true,
                message: text.formLabels.requiredFieldError,
              },
              maxLength: {
                value: 4,
                message: text.formLabels.inputTooLongError,
              },
            })}
          />
          <p></p>
          <label>{text.purchaseDevice.scheduleSend}</label>
          <input
            type="number"
            {...register("resumeTime", {
              required: {
                value: true,
                message: text.formLabels.requiredFieldError,
              },
              maxLength: {
                value: 4,
                message: text.formLabels.inputTooLongError,
              },
            })}
          />
        </>
      )}
      <p></p>
      <p></p>
      <input type="submit" value={text.formLabels.buttonName} />
    </form>
  );
}

export default Form;
