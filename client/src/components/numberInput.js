import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorMessageContainer } from './errorMessageContainer';

export const NumberInput = React.forwardRef(({ id, label, labelProps, errors, ...props }, ref) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Col>
        <input type="number" className="form-control" ref={ref} {...props}/>
        <ErrorMessage errors={errors} name={id} as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
});
