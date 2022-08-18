import React from "react";
import textContent from "../assets/FormLabels.json";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Form({ includePhone, onSubmit }) {
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
      <label>{textContent.firstName}</label>
      <input
        type="text"
        {...register("firstName", {
          required: {
            value: true,
            message: textContent.requiredFieldError,
          },
          maxLength: { value: 30, message: textContent.inputTooLongError },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="firstName"
        as={<ErrorMessageContainer />}
      />

      <p></p>

      <label>{textContent.lastName}</label>
      <input
        type="text"
        {...register("lastName", {
          required: {
            value: true,
            message: textContent.requiredFieldError,
          },
          maxLength: { value: 50, message: textContent.inputTooLongError },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="lastName"
        as={<ErrorMessageContainer />}
      />

      <p></p>

      <label>{textContent.email}</label>
      <input
        type="text"
        {...register("signerEmail", {
          required: {
            value: true,
            message: textContent.requiredFieldError,
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: textContent.invalidEmailFormatError,
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
          <label>{textContent.countryCode}</label>
          <input
            type="text"
            placeholder="1"
            {...register("countryCode", {
              required: {
                value: true,
                message: textContent.requiredFieldError,
              },
              pattern: {
                value: /^([+]?\d+)$/,
                message: textContent.invalidCountryCodeError,
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="countryCode"
            as={<ErrorMessageContainer />}
          />
          <label>{textContent.phoneNumber}</label>
          <input
            type="tel"
            placeholder={textContent.phonePlaceholder}
            {...register("phoneNumber", {
              required: {
                value: true,
                message: textContent.requiredFieldError,
              },
              pattern: {
                value: /^(\d+-?)+\d+$/,
                message: textContent.invalidPhoneNumberError,
              },
              maxLength: {
                value: 11,
                message: textContent.invalidPhoneNumberError,
              },
              minLength: {
                value: 8,
                message: textContent.invalidPhoneNumberError,
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

      <input type="submit" value={textContent.buttonName} />
    </form>
  );
}

export default Form;
