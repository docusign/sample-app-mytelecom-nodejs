import React from "react";
import textContent from "../assets/FormLabels.json";
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

      <p></p>
      {phonePurchase && (
        <>
          <label>Select a phone</label>
          <select {...register("phoneSelection")}>
            <option value="iPhone 13 128GB">iPhone 13 128GB ($799)</option>
            <option value="iPhone 13 Pro 128GB">
              iPhone 13 Pro 128GB ($999)
            </option>
            <option value="iPhone 13 Pro Max 128GB">
              iPhone 13 Pro Max 128GB ($1099)
            </option>
            <option value="Samsung Galaxy S22 Ultra 128GB">
              Samsung Galaxy S22 Ultra 128GB ($1199)
            </option>
            <option value="Google Pixel 6 Pro 128GB">
              Google Pixel 6 Pro 128GB ($899)
            </option>
          </select>

          <p></p>

          <label>
            Would you like to include device insurance at $5/month for 2 years?
          </label>
          <label>
            <input {...register("insurance")} type="radio" value="Yes" />
            Yes
          </label>
          <label>
            <input {...register("insurance")} type="radio" value="No" />
            No
          </label>

          <p></p>
          <label>How much would you like to put down for a down payment?</label>
          <input
            type="number"
            {...register("downPayment", {
              required: {
                value: true,
                message: textContent.requiredFieldError,
              },
              maxLength: { value: 10, message: textContent.inputTooLongError },
            })}
          />
        </>
      )}
      <p></p>

      <input type="submit" value={textContent.buttonName} />
    </form>
  );
}

export default Form;
