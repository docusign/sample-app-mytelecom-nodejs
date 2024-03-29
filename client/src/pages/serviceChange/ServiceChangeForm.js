import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FormButtons } from '../../components';
import { LimitChangeForm, RecipientDataForm, RecipientNumberForm } from './components/Forms';

const ServiceChangeForm = ({ onSubmit }) => {
  // Grab register and handleSubmit from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [limitChange, setLimitChange] = useState('increased');
  const [recipientCount, setRecipientCount] = useState(3);
  const [currentFormNumber, setCurrentFormNumber] = useState(0);

  const Forms = [
    <LimitChangeForm limitChange={limitChange} setLimitChange={setLimitChange} register={register} errors={errors} />,
    <RecipientNumberForm
      recipientCount={recipientCount}
      setRecipientCount={setRecipientCount}
      register={register}
      errors={errors}
    />,
    <RecipientDataForm recipientCount={recipientCount} register={register} errors={errors} />,
  ];

  const isFirstForm = currentFormNumber === 0;
  const isLastForm = currentFormNumber === Forms.length - 1;

  const handleContinue = () => {
    setCurrentFormNumber(currentFormNumber + 1);
  };

  const handleBack = () => {
    setCurrentFormNumber(currentFormNumber - 1);
  };

  return (
    <Form onSubmit={handleSubmit((form) => onSubmit(form, limitChange))}>
      {Forms[currentFormNumber]}

      <FormButtons onBack={!isFirstForm && handleBack} onContinue={!isLastForm && handleContinue} />
    </Form>
  );
};

export default ServiceChangeForm;
