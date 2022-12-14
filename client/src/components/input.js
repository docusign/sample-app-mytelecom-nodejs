import { Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorMessageContainer } from './errorMessageContainer';

export const Input = ({ id, label, labelProps, errors, register, validations }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label {...labelProps}>{label}</Form.Label>
      <Col>
        <Form.Control size="sm" {...register(id, validations)} />
        <ErrorMessage errors={errors} name={id} as={<ErrorMessageContainer />} />
      </Col>
    </Form.Group>
  );
};
