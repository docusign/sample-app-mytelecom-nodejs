import React from "react";
import text from "../../../assets/Text.json";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  emailRegExp,
  formCheckNameMaxLength,
  formCheckFieldRequired,
} from "../../../components/CommonFormObjects";

function AssumptionLiabilityForm({ onSubmit }) {
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
      <>
        <label>{text.formLabels.firstName}</label>
        <input
          type="text"
          {...register("firstName", {
            required: {
              value: true,
              message: text.formLabels.requiredFieldError,
            },
            maxLength: {
              value: 30,
              message: text.formLabels.inputTooLongError,
            },
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
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
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
            required: formCheckFieldRequired,
            pattern: {
              value: emailRegExp,
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
        <label>{text.formLabels.newPhoneOwnerInfo}</label>
        <p></p>
        <label>{text.formLabels.firstName}</label>
        <input
          type="text"
          {...register("recipientFirstName", {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
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
          {...register("recipientLastName", {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
        />
        <ErrorMessage
          errors={errors}
          name="lastName"
          as={<ErrorMessageContainer />}
        />
        <p></p>
        <label>{text.formLabels.countryCode}</label>
        <input
          type="text"
          placeholder="1"
          {...register("countryCode", {
            required: formCheckFieldRequired,
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
        <p></p>
        <label>{text.formLabels.phoneNumber}</label>
        <input
          type="text"
          {...register("phoneNumber", {
            required: formCheckFieldRequired,
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
      <p></p>

      <input type="submit" value={text.formLabels.buttonName} />
    </form>
  );
}

export default AssumptionLiabilityForm;
