import { useEffect } from "react";
import text from "../assets/Text.json";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  emailRegExp,
  formCheckFieldRequired,
  formCheckNameMaxLength,
} from "./CommonFormObjects";

function ServiceChangeForm({ onSubmit }) {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      signers: [
        {
          firstName: "",
          lastName: "",
          email: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "signers",
  });

  const ErrorMessageContainer = ({ children }) => (
    <span className="error">{children}</span>
  );

  // const watchResult = watch("signers");
  // console.log(watchResult);

  const RequiredSigner = ({
    index,
    // firstName,
    // lastName,
    // signerEmail,
    // field,
  }) => (
    console.log(`test: ${index}`),
    (
      <>
        <label>Signer {index}:</label>
        <p></p>
        <label>{text.formLabels.firstName}</label>
        <input
          type="text"
          name={`signers[${index}].firstName`}
          {...register(`signers.${index}.firstName`, {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
        />
        <ErrorMessage
          errors={errors}
          name="{firstName}"
          as={<ErrorMessageContainer />}
        />
        <p></p>
        <label>{text.formLabels.lastName}</label>
        <input
          name={`signers[${index}].lastName`}
          type="text"
          {...register(`signers.${index}.lastName`, {
            required: formCheckFieldRequired,
            maxLength: formCheckNameMaxLength,
          })}
        />
        <ErrorMessage
          errors={errors}
          name="{lastName}"
          as={<ErrorMessageContainer />}
        />
        <p></p>
        <label>{text.formLabels.email}</label>
        <input
          type="text"
          name={`signers[${index}],email`}
          {...register(`signers.${index}.email`, {
            required: formCheckFieldRequired,
            pattern: {
              value: emailRegExp,
              message: text.formLabels.invalidEmailFormatError,
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="{signerEmail}"
          as={<ErrorMessageContainer />}
        />
        <p></p>
        <button type="button" onAbort={() => remove(index)}>
          Remove
        </button>
      </>
    )
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{text.serviceChange.formTitle}</label>
      <p></p>
      <label>Number of signers</label>
      {fields.map(({ id }, index) => {
        return (
          <ul key={id}>
            <RequiredSigner>index = {index}</RequiredSigner>
            {/* <label>First Name: </label>
              <input
                name={`signers[${index}].firstName`}
                defaultValue={`${item.firstName}`}
                {...register(`signers.nested[${index}].firstName`)}
              />
              <p></p>

              <label>Last Name: </label>
              <input
                name={`signers[${index}].lastName`}
                defaultValue={`${item.lastName}`}
                {...register(`signers.nested[${index}].lastName`)}
              />
              <p></p>

              <label>Email: </label>
              <input
                name={`signers[${index}].email`}
                defaultValue={`${item.email}`}
                {...register(`signers.nested[${index}].email`)}
              />
              <p></p>
              <button type="button" onClick={() => remove(index)}>
                Delete Signer {index + 1}
              </button>
              <p></p> */}
          </ul>
        );
      })}
      <button
        type="button"
        onClick={() => {
          append({});
        }}
      >
        Add another signer
      </button>
      <p></p>
      <input type="submit" value={text.formLabels.buttonName} />
    </form>
  );
}

export default ServiceChangeForm;
