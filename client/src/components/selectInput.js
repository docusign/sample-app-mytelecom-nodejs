import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorMessageContainer } from './errorMessageContainer';

export const SelectInput = React.forwardRef(({ id, label, labelProps, errors, options, ...props }, ref) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Col>
        <Form.Select>
          {options.map((option, index) => {
            return <option key={index} value={index} ref={ref} {...props}>{option}</option>
          })}
        </Form.Select>
          
        <ErrorMessage errors={errors} name={id} as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
});
