import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorMessageContainer } from './errorMessageContainer';

export const RadioInput = React.forwardRef(({ id, name, label, labelProps, errors, options, ...props }, ref) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Col>
        <div className="radio-s">
          {options.map((option, index) => {
            return <label key={index}><input type="radio" name={name} value={option.value} ref={ref} {...props} /><span>{option.text}</span></label>
          })}
        </div>
        
        <ErrorMessage errors={errors} name={id} as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
});
