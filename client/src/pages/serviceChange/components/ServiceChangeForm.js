import React from "react";
import text from "../../../assets/Text.json";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  emailRegExp,
  formCheckFieldRequired,
  formCheckNameMaxLength,
} from "../../../components/CommonFormObjects";

function ServiceChangeForm({ onSubmit }) {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ErrorMessageContainer = ({ children }) => (
    <span className="error">{children}</span>
  );

  const Signer = ({ numSigner, firstName, lastName, signerEmail }) => (
    <>
      <label>Signer {numSigner}:</label>
      <p></p>
      <label>{text.formLabels.firstName}</label>
      <input
        type="text"
        {...register(firstName, {
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        })}
      />
      <ErrorMessage
        errors={errors}
        name={firstName}
        as={<ErrorMessageContainer />}
      />
      <p></p>
      <label>{text.formLabels.lastName}</label>
      <input
        type="text"
        {...register(lastName, {
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        })}
      />
      <ErrorMessage
        errors={errors}
        name={lastName}
        as={<ErrorMessageContainer />}
      />
      <p></p>
      <label>{text.formLabels.email}</label>
      <input
        type="text"
        {...register(signerEmail, {
          required: formCheckFieldRequired,
          pattern: {
            value: emailRegExp,
            message: text.formLabels.invalidEmailFormatError,
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name={signerEmail}
        as={<ErrorMessageContainer />}
      />
      <p></p>
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{text.serviceChange.formTitle}</label>
      <p></p>
      <Signer
        numSigner={1}
        firstName={"firstName1"}
        lastName={"lastName1"}
        signerEmail={"signerEmail1"}
      ></Signer>
      <Signer
        numSigner={2}
        firstName={"firstName2"}
        lastName={"lastName2"}
        signerEmail={"signerEmail2"}
      ></Signer>
      <Signer
        numSigner={3}
        firstName={"firstName3"}
        lastName={"lastName3"}
        signerEmail={"signerEmail3"}
      ></Signer>
      <Signer
        numSigner={4}
        firstName={"firstName4"}
        lastName={"lastName4"}
        signerEmail={"signerEmail4"}
      ></Signer>
      <Signer
        numSigner={5}
        firstName={"firstName5"}
        lastName={"lastName5"}
        signerEmail={"signerEmail5"}
      ></Signer>
      <input type="submit" value={text.formLabels.buttonName} />
    </form>
  );
}

export default ServiceChangeForm;
