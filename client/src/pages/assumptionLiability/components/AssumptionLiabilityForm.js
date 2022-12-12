import React from 'react';
import text from '../../../assets/Text.json';
import { useForm } from 'react-hook-form';
import { emailRegExp, formCheckNameMaxLength, formCheckFieldRequired } from '../../../components/CommonFormObjects';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Input from './Input';

const AssumptionLiabilityForm = ({ onSubmit }) => {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h6>{text.formLabels.currentAccountOwner}</h6>
      <Input
        id="firstName"
        label={text.formLabels.firstName}
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
        label={text.formLabels.lastName}
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
        label={text.formLabels.email}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          pattern: {
            value: emailRegExp,
            message: text.formLabels.invalidEmailFormatError,
          },
        }}
        register={register}
        errors={errors}
      />
      <hr />
      <h6>{text.formLabels.newAccountOwner}</h6>
      <Input
        id="recipientFirstName"
        label={text.formLabels.firstName}
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
        label={text.formLabels.lastName}
        labelProps={{ column: true, sm: 4 }}
        validations={{
          required: formCheckFieldRequired,
          maxLength: formCheckNameMaxLength,
        }}
        register={register}
        errors={errors}
      />
      <Row>
        <Col sm={4}>
          <Input
            id="countryCode"
            label={text.formLabels.countryCode}
            validations={{
              required: formCheckFieldRequired,
              pattern: {
                value: /^([+]?\d+)$/,
                message: text.formLabels.invalidCountryCodeError,
              },
            }}
            register={register}
            errors={errors}
          />
        </Col>
        <Col>
          <Input
            id="phoneNumber"
            label={text.formLabels.phoneNumber}
            validations={{
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
            }}
            register={register}
            errors={errors}
          />
        </Col>
      </Row>
      <Button type="submit" className="h-card-button">
        {text.formLabels.buttonName}
      </Button>
    </Form>
  );
};

export default AssumptionLiabilityForm;
